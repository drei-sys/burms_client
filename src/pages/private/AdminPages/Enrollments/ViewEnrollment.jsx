import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import http from "services/httpService";

const ViewEnrollment = () => {
    const [enrollment, setEnrollment] = useState({ status: "" });
    const [enrollmentItems, setEnrollmentItems] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const [isOpenConfirmApprove, setIsOpenConfirmApprove] = useState(false);
    const [isApproveLoading, setIsApproveLoading] = useState(false);

    const [isOpenConfirmReject, setIsOpenConfirmReject] = useState(false);
    const [isRejectLoading, setIsRejectLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await http.get(
                    `/api/enrollmentItems/${params.id}`
                );
                const { enrollment, enrollmentItems } = data;
                if (data.length === 0) {
                    setIsNotExist(true);
                } else {
                    setEnrollment(enrollment);
                    setEnrollmentItems(enrollmentItems);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getUser();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (isNotExist) {
        return (
            <div className="has-text-centered mt-6">Enrollment not found.</div>
        );
    }

    const handleApprove = async () => {
        try {
            setIsApproveLoading(true);
            await http.put(`/api/approveEnrollment/${params.id}`);
            navigate("/adminViewEnrollments");
        } catch (error) {
            console.log(error);
            alert(
                "An error occured while approving the enrollment. Please try again."
            );
        } finally {
            setIsOpenConfirmApprove(false);
            setIsApproveLoading(false);
        }
    };

    const handleReject = async () => {
        try {
            setIsRejectLoading(true);
            await http.put(`/api/rejectEnrollment/${params.id}`);
            navigate("/adminViewEnrollments");
        } catch (error) {
            console.log(error);
            alert(
                "An error occured while approving the enrollment. Please try again."
            );
        } finally {
            setIsOpenConfirmReject(false);
            setIsRejectLoading(false);
        }
    };

    const semesters = {
        1: "1st",
        2: "2nd"
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/adminViewEnrollments")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                View Enrollment
            </h1>
            <div className="box">
                <table className="table " style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>School Year</th>
                            <th>Semester</th>
                            <th>Course</th>
                            <th>Section</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollmentItems.map(enrollmentItem => {
                            const {
                                subject_id,
                                year,
                                semester,
                                course_name,
                                section_name,
                                subject_code,
                                subject_name
                            } = enrollmentItem;

                            return (
                                <tr key={subject_id}>
                                    <td>{year}</td>
                                    <td>{semesters[semester]}</td>
                                    <td>{course_name}</td>
                                    <td>{section_name}</td>
                                    <td>
                                        {subject_code}: {subject_name}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {enrollment.status === "for_approval" && (
                    <>
                        <hr />
                        <div>
                            <button
                                className="button is-success mr-1"
                                onClick={() => setIsOpenConfirmApprove(true)}
                            >
                                Approve
                            </button>
                            <button
                                className="button is-danger"
                                onClick={() => setIsOpenConfirmReject(true)}
                            >
                                Reject
                            </button>
                        </div>
                    </>
                )}
            </div>

            <ConfirmModal
                title="Confirm Approve"
                description={`Are you sure do you want to approve this enrollment?`}
                isOpen={isOpenConfirmApprove}
                isLoading={isApproveLoading}
                onOk={() => {
                    handleApprove();
                }}
                onClose={() => {
                    setIsOpenConfirmApprove(false);
                }}
            />

            <ConfirmModal
                title="Confirm Reject"
                description={`Are you sure do you want to reject this enrollment?`}
                isOpen={isOpenConfirmReject}
                isLoading={isRejectLoading}
                onOk={() => {
                    handleReject();
                }}
                onClose={() => {
                    setIsOpenConfirmReject(false);
                }}
            />
        </>
    );
};

export default ViewEnrollment;
