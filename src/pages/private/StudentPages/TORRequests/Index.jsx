import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const TORRequests = () => {
    const [refetchTORRequestsRef, setRefetchTORRequestsRef] = useState(0);
    const [TORRequests, setTORRequests] = useState([]);
    const [selectedTORRequest, setSelectedTORRequest] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const { id: userId, status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getTORRequests = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get(`/api/torRequests/${userId}`);
                setTORRequests(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getTORRequests();
    }, [refetchTORRequestsRef]);

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

    if (userStatus === "Rejected") {
        return (
            <>
                <h1 className="is-size-4 mb-4">TOR Requests</h1>
                <div className="notification is-danger my-4">
                    Your account has been rejected.
                </div>
            </>
        );
    }

    const showConfirmDelete = selectedId => {
        setSelectedTORRequest(TORRequests.find(({ id }) => id === selectedId));
        setIsOpenConfirmDelete(true);
    };

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            await http.delete(`/api/torRequest/${selectedTORRequest.id}`);
            setRefetchTORRequestsRef(Math.random());
        } catch (error) {
            alert("An error occured while deleting. Please try again.");
        } finally {
            setIsOpenConfirmDelete(false);
            setIsDeleteLoading(false);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">TOR Requests</h1>

            <div className="box">
                <div className="is-flex is-justify-content-space-between">
                    <div></div>
                    <div>
                        <Link to="/createTORRequest">
                            <button className="button is-success">
                                Request TOR
                            </button>
                        </Link>
                    </div>
                </div>
                <hr />
                <div>
                    {TORRequests.length == 0 ? (
                        <div className="has-text-centered p-4">
                            No TOR request found.
                        </div>
                    ) : (
                        <>
                            <div className="table-container">
                                <table
                                    className="table is-fullwidth is-hoverable"
                                    style={{ whiteSpace: "nowrap" }}
                                >
                                    <thead>
                                        <tr>
                                            <th>Reason / Purpose</th>
                                            <th>Date requested</th>
                                            <th>Remarks</th>
                                            <th>Status</th>
                                            <th style={{ width: 120 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TORRequests.map(
                                            ({
                                                id,
                                                reason,
                                                remarks,
                                                status,
                                                created_at
                                            }) => {
                                                let d = new Date(created_at);
                                                const datestring = `${
                                                    d.getMonth() + 1
                                                }-${d.getDate()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

                                                return (
                                                    <tr key={id}>
                                                        <td>{reason}</td>
                                                        <td>{datestring}</td>
                                                        <td>{remarks}</td>
                                                        <td>{status}</td>
                                                        <td>
                                                            {status ===
                                                                "Pending" && (
                                                                <>
                                                                    <Link
                                                                        to={`/updateTORRequest/${id}`}
                                                                    >
                                                                        <button
                                                                            className="button mr-1"
                                                                            title="Update"
                                                                        >
                                                                            <span className="icon">
                                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                                            </span>
                                                                        </button>
                                                                    </Link>
                                                                    <button
                                                                        className="button is-danger"
                                                                        title="Delete"
                                                                        onClick={() =>
                                                                            showConfirmDelete(
                                                                                id
                                                                            )
                                                                        }
                                                                    >
                                                                        <span className="icon">
                                                                            <i className="fa-solid fa-trash"></i>
                                                                        </span>
                                                                    </button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 has-text-right">
                                {TORRequests.length} total items
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ConfirmModal
                title="Delete TOR Request"
                description={`Are you sure do you want to delete TOR Request?`}
                isOpen={isOpenConfirmDelete}
                isLoading={isDeleteLoading}
                onOk={() => {
                    handleDelete();
                }}
                onClose={() => {
                    setIsOpenConfirmDelete(false);
                }}
            />
        </>
    );
};

export default TORRequests;
