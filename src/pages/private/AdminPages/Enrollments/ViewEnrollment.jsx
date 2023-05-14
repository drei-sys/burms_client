import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";
import UserName from "components/common/UserName";

import http from "services/httpService";

const ViewEnrollment = () => {
    const [enrollment, setEnrollment] = useState({ status: "" });
    const [enrollmentItems, setEnrollmentItems] = useState([]);
    const [student, setStudent] = useState(null);

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
                const { data } = await http.get(`/api/enrollment/${params.id}`);
                const { student, enrollment, enrollmentItems } = data;
                if (!student) {
                    setIsNotExist(true);
                } else {
                    setEnrollment(enrollment);
                    setEnrollmentItems(enrollmentItems);
                    setStudent(student);
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
            await http.put(`/api/enrollmentStatus/${params.id}`, {
                status: "Enrolled"
            });
            navigate("/viewEnrollments");
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
            await http.put(`/api/enrollmentStatus/${params.id}`, {
                status: "Rejected"
            });
            navigate("/viewEnrollments");
        } catch (error) {
            console.log(error);
            alert(
                "An error occured while rejecting the enrollment. Please try again."
            );
        } finally {
            setIsOpenConfirmReject(false);
            setIsRejectLoading(false);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/viewEnrollments")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                View Enrollment
            </h1>
            <div className="box mb-4">
                <div className="columns">
                    <div className="column is-4">
                        <div>
                            <span className="label">Student name:</span>
                        </div>
                        <div>
                            <UserName user={student} />
                        </div>
                    </div>

                    <div className="column is-4">
                        <div>
                            <span className="label">Course:</span>
                        </div>
                        <div>{student.course_name}</div>
                    </div>
                    <div className="column is-4">
                        <div>
                            <span className="label">Year level:</span>
                        </div>
                        <div>{student.year_level}</div>
                    </div>
                </div>
            </div>
            <div className="box">
                <div className="table-container">
                    <table
                        className="table is-fullwidth"
                        style={{
                            whiteSpace: "nowrap"
                        }}
                    >
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
                                    course_name,
                                    section_name,
                                    subject_code,
                                    subject_name
                                } = enrollmentItem;

                                return (
                                    <tr key={subject_id}>
                                        <td>{enrollment.sy_year}</td>
                                        <td>{enrollment.sy_semester}</td>
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
                </div>
                {enrollment.status === "For Approval" && (
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
