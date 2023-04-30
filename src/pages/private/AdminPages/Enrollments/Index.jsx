import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";
import UserName from "components/common/UserName";

import http from "services/httpService";

const Enrollments = () => {
    const [activeTab, setActiveTab] = useState(1);

    const [enrollments, setEnrollments] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    // const [isOpenConfirmVerify, setIsOpenConfirmVerify] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getEnrollments = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/enrollments");
                setEnrollments(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getEnrollments();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const forApproveEnrollments = enrollments.filter(
        ({ status }) => status === "For Approval"
    );
    const approvedEnrollments = enrollments.filter(
        ({ status }) => status === "Enrolled"
    );
    const rejectedEnrollments = enrollments.filter(
        ({ status }) => status === "Rejected"
    );

    const Table = ({ enrollments }) => {
        if (enrollments.length === 0) {
            return (
                <div className="has-text-centered">No enrollments found.</div>
            );
        }

        return (
            <>
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>School Year</th>
                            <th>Semester</th>
                            <th>Student Name</th>
                            <th style={{ width: 120 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map(({ id, year, semester, ...rest }) => {
                            return (
                                <tr key={id}>
                                    <td>
                                        <div>
                                            <span className="has-text-weight-medium">
                                                {year}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{semester}</td>
                                    <td>
                                        <UserName user={rest} />
                                    </td>
                                    <td>
                                        <Link to={`/viewEnrollment/${id}`}>
                                            <button
                                                className="button mr-1"
                                                title="View enrollment"
                                            >
                                                <span className="icon">
                                                    <i className="fa-solid fa-eye"></i>
                                                </span>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="p-4 has-text-right">
                    {enrollments.length} total items
                </div>
            </>
        );
    };

    let TabContent = () => null;
    if (activeTab === 1) {
        TabContent = () => <Table enrollments={forApproveEnrollments} />;
    } else if (activeTab === 2) {
        TabContent = () => <Table enrollments={approvedEnrollments} />;
    } else if (activeTab === 3) {
        TabContent = () => <Table enrollments={rejectedEnrollments} />;
    }

    return (
        <>
            <h1 className="is-size-4 mb-4">Enrollments</h1>
            <div className="box">
                <div className="tabs">
                    <ul>
                        <li
                            className={activeTab === 1 ? "is-active" : ""}
                            onClick={() => setActiveTab(1)}
                        >
                            <a>For Approval ({forApproveEnrollments.length})</a>
                        </li>
                        <li
                            className={activeTab === 2 ? "is-active" : ""}
                            onClick={() => setActiveTab(2)}
                        >
                            <a>Approved ({approvedEnrollments.length})</a>
                        </li>
                        <li
                            className={activeTab === 3 ? "is-active" : ""}
                            onClick={() => setActiveTab(3)}
                        >
                            <a>Rejected ({rejectedEnrollments.length})</a>
                        </li>
                    </ul>
                </div>

                <div className="px-4">
                    <TabContent />
                </div>
            </div>
        </>
    );
};

export default Enrollments;
