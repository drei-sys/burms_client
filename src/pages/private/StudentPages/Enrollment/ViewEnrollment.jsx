import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const ViewEnrollment = () => {
    const [enrollment, setEnrollment] = useState(null);
    const [enrollmentItems, setEnrollmentItems] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const { status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getEnrollment = async () => {
            try {
                const { data } = await http.get(`/api/enrollment/${params.id}`);
                const { student, enrollment, enrollmentItems } = data;
                if (student) {
                    setEnrollment(enrollment);
                    setEnrollmentItems(enrollmentItems);
                } else {
                    setIsNotExist(true);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getEnrollment();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">View Enrollment</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (isNotExist) {
        return (
            <div className="has-text-centered mt-6">Enrollment not found.</div>
        );
    }

    const totalUnits = enrollmentItems.reduce(
        (acc, item) => (acc += item.subject_unit),
        0
    );

    return (
        <>
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/studentViewEnrollments")}
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
                            <th>Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollmentItems.map(enrollmentItem => {
                            const {
                                subject_id,
                                course_name,
                                section_name,
                                subject_code,
                                subject_name,
                                subject_unit
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
                                    <td>{subject_unit}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="p-4 has-text-right">
                    <span className="mr-4">{totalUnits} total units</span> -{" "}
                    <span className="ml-4">
                        {enrollmentItems.length} total items
                    </span>
                </div>
            </div>
        </>
    );
};

export default ViewEnrollment;
