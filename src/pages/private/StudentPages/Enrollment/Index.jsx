import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import { useUserStore } from "store/userStore";
import http from "services/httpService";

const Enrollments = () => {
    const [enrollments, setEnrollments] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id: userId, is_verified: userIsVerified } = useUserStore(
        state => state
    );

    useEffect(() => {
        const getEnrollments = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get(`/api/enrollments/${userId}`);
                setEnrollments(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getEnrollments();
    }, []);

    if (!userIsVerified) {
        return (
            <>
                <h1 className="is-size-4 mb-5">Enrollments</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const semesters = {
        1: "1st",
        2: "2nd"
    };

    const statuses = {
        for_approval: "Pending",
        approved: "Enrolled",
        rejected: "Rejected"
    };

    return (
        <>
            <h1 className="is-size-4 mb-5">Enrollments</h1>
            <div className="box">
                {enrollments.length === 0 ? (
                    <div className="has-text-centered">
                        No enrollment found.
                    </div>
                ) : (
                    <table className="table is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                <th>School Year</th>
                                <th>Semester</th>
                                <th>Status</th>
                                <th>Remarks</th>
                                <th style={{ width: 60 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrollments.map(
                                ({ id, year, semester, status }) => {
                                    return (
                                        <tr key={id}>
                                            <td>
                                                <div>
                                                    <span className="has-text-weight-medium">
                                                        {year}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>{semesters[semester]}</td>
                                            <td>{statuses[status]}</td>
                                            <td>-</td>
                                            <td>
                                                <Link
                                                    to={`/studentViewEnrollment/${id}`}
                                                >
                                                    <button
                                                        className="button "
                                                        title="View"
                                                        // onClick={() =>
                                                        //     showConfirmApprove(id)
                                                        // }
                                                    >
                                                        <span className="icon">
                                                            <i className="fa-solid fa-eye"></i>
                                                        </span>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Enrollments;
