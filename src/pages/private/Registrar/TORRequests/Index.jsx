import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const TORRequests = () => {
    const [activeTab, setActiveTab] = useState(1);

    const [torRequests, setTORRequests] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const { status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getTORRequests = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/torRequests");
                setTORRequests(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getTORRequests();
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
                <h1 className="is-size-4 mb-4">TOR Requests</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    const Table = ({ torRequests }) => {
        if (torRequests.length === 0) {
            return (
                <div className="has-text-centered">No TOR request found.</div>
            );
        }

        return (
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>Date requested</th>
                        <th>Student name</th>
                        <th>Reason / Purpose</th>
                        <th>Remarks</th>
                        <th style={{ width: 60 }}></th>
                    </tr>
                </thead>
                <tbody>
                    {torRequests.map(
                        ({
                            id,
                            student_lastname: lastname,
                            student_firstname: firstname,
                            student_middlename: middlename,
                            student_extname: extname,
                            reason,
                            remarks,
                            created_at
                        }) => {
                            let d = new Date(created_at);
                            const datestring = `${
                                d.getMonth() + 1
                            }-${d.getDate()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

                            return (
                                <tr key={id}>
                                    <td>{datestring}</td>
                                    <td>
                                        <div>
                                            <span className="has-text-weight-medium">
                                                <UserName
                                                    user={{
                                                        lastname,
                                                        firstname,
                                                        middlename,
                                                        extname
                                                    }}
                                                />
                                            </span>
                                        </div>
                                    </td>
                                    <td>{reason}</td>
                                    <td>{remarks}</td>
                                    <td>
                                        <Link to={`/tor/${id}`}>
                                            <button
                                                className="button mr-1"
                                                title="View grades"
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
        );
    };

    const pendingTORRequests = torRequests.filter(
        ({ status }) => status === "Pending"
    );
    const approvedTORRequests = torRequests.filter(
        ({ status }) => status === "Approved"
    );
    const rejectedTORRequests = torRequests.filter(
        ({ status }) => status === "Rejected"
    );

    let TabContent = () => null;
    if (activeTab === 1) {
        TabContent = () => <Table torRequests={pendingTORRequests} />;
    } else if (activeTab === 2) {
        TabContent = () => <Table torRequests={approvedTORRequests} />;
    } else if (activeTab === 3) {
        TabContent = () => <Table torRequests={rejectedTORRequests} />;
    }

    return (
        <>
            <h1 className="is-size-4 mb-4">TOR Requests</h1>

            <div className="box">
                <div className="tabs">
                    <ul>
                        <li
                            className={activeTab === 1 ? "is-active" : ""}
                            onClick={() => setActiveTab(1)}
                        >
                            <a>Requests ({pendingTORRequests.length})</a>
                        </li>
                        <li
                            className={activeTab === 2 ? "is-active" : ""}
                            onClick={() => setActiveTab(2)}
                        >
                            <a>Generated ({approvedTORRequests.length})</a>
                        </li>
                        <li
                            className={activeTab === 3 ? "is-active" : ""}
                            onClick={() => setActiveTab(3)}
                        >
                            <a>Rejected ({rejectedTORRequests.length})</a>
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

export default TORRequests;
