import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";
import UserName from "components/common/UserName";

import http from "services/httpService";

const Registrations = () => {
    const [activeTab, setActiveTab] = useState(1);

    const [refetchUsersRef, setRefetchUsersRef] = useState(0);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmVerify, setIsOpenConfirmVerify] = useState(false);
    const [isVerifyLoading, setIsVerifyLoading] = useState(false);

    const [isOpenConfirmReject, setIsOpenConfirmReject] = useState(false);
    const [isRejectLoading, setIsRejectLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/registeredUsers");
                setRegisteredUsers(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getUsers();
    }, [refetchUsersRef]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const showConfirmVerify = selectedId => {
        setSelectedUser(registeredUsers.find(({ id }) => id === selectedId));
        setIsOpenConfirmVerify(true);
    };

    const showConfirmReject = selectedId => {
        setSelectedUser(registeredUsers.find(({ id }) => id === selectedId));
        setIsOpenConfirmReject(true);
    };

    const handleVerify = async () => {
        try {
            setIsVerifyLoading(true);
            await http.put(`/api/registeredUser/${selectedUser.id}`, {
                status: "Verified"
            });
            setRefetchUsersRef(Math.random());
        } catch (error) {
            alert(
                "An error occured while verifying the user. Please try again."
            );
        } finally {
            setIsOpenConfirmVerify(false);
            setIsVerifyLoading(false);
        }
    };

    const handleReject = async () => {
        try {
            setIsRejectLoading(true);
            await http.put(`/api/registeredUser/${selectedUser.id}`, {
                status: "Rejected"
            });
            setRefetchUsersRef(Math.random());
        } catch (error) {
            alert(
                "An error occured while verifying the user. Please try again."
            );
        } finally {
            setIsOpenConfirmReject(false);
            setIsRejectLoading(false);
        }
    };

    const forVerificationUsers = registeredUsers.filter(
        ({ status }) => status === "For Verification"
    );
    const verifiedUsers = registeredUsers.filter(
        ({ status }) => status === "Verified"
    );
    const rejectedUsers = registeredUsers.filter(
        ({ status }) => status === "Rejected"
    );

    const Table = ({ registeredUsers }) => {
        if (registeredUsers.length === 0) {
            return (
                <div className="has-text-centered">
                    No registered user found.
                </div>
            );
        }

        return (
            <>
                <div className="table-container">
                    <table
                        className="table is-fullwidth is-hoverable"
                        style={{ whiteSpace: "nowrap" }}
                    >
                        <thead>
                            <tr>
                                <th>User name</th>
                                <th style={{ width: 180 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {registeredUsers.map(
                                ({
                                    id,
                                    lastname,
                                    firstname,
                                    middlename,
                                    extname,
                                    user_type,
                                    status
                                }) => {
                                    return (
                                        <tr key={id}>
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
                                                <div>
                                                    <span className="is-size-6">
                                                        {user_type}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/registration/${id}`}
                                                >
                                                    <button
                                                        className="button mr-1"
                                                        title="View profile"
                                                    >
                                                        <span className="icon">
                                                            <i className="fa-solid fa-eye"></i>
                                                        </span>
                                                    </button>
                                                </Link>
                                                {status ===
                                                "For Verification" ? (
                                                    <button
                                                        className="button is-success mr-1"
                                                        title="Verify"
                                                        onClick={() =>
                                                            showConfirmVerify(
                                                                id
                                                            )
                                                        }
                                                    >
                                                        <span className="icon">
                                                            <i className="fa-solid fa-check"></i>
                                                        </span>
                                                    </button>
                                                ) : null}
                                                {status ===
                                                "For Verification" ? (
                                                    <button
                                                        className="button is-danger mr-1"
                                                        title="Reject"
                                                        onClick={() =>
                                                            showConfirmReject(
                                                                id
                                                            )
                                                        }
                                                    >
                                                        <span className="icon">
                                                            <i className="fa-solid fa-trash"></i>
                                                        </span>
                                                    </button>
                                                ) : null}
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 has-text-right">
                    {registeredUsers.length} total items
                </div>
            </>
        );
    };

    let TabContent = () => null;
    if (activeTab === 1) {
        TabContent = () => <Table registeredUsers={forVerificationUsers} />;
    } else if (activeTab === 2) {
        TabContent = () => <Table registeredUsers={verifiedUsers} />;
    } else if (activeTab === 3) {
        TabContent = () => <Table registeredUsers={rejectedUsers} />;
    }

    return (
        <>
            <h1 className="is-size-4 mb-4">Registrations</h1>
            <div className="box">
                <div className="tabs">
                    <ul>
                        <li
                            className={activeTab === 1 ? "is-active" : ""}
                            onClick={() => setActiveTab(1)}
                        >
                            <a>
                                For Verification ({forVerificationUsers.length})
                            </a>
                        </li>
                        <li
                            className={activeTab === 2 ? "is-active" : ""}
                            onClick={() => setActiveTab(2)}
                        >
                            <a>Verified ({verifiedUsers.length})</a>
                        </li>
                        <li
                            className={activeTab === 3 ? "is-active" : ""}
                            onClick={() => setActiveTab(3)}
                        >
                            <a>Rejected ({rejectedUsers.length})</a>
                        </li>
                    </ul>
                </div>

                <div className="px-4">
                    <TabContent />
                </div>
            </div>

            <ConfirmModal
                title="Verify User"
                description={`Are you sure do you want to verify the account of ${selectedUser?.lastname}?`}
                isOpen={isOpenConfirmVerify}
                isLoading={isVerifyLoading}
                onOk={() => {
                    handleVerify();
                }}
                onClose={() => {
                    setIsOpenConfirmVerify(false);
                }}
            />

            <ConfirmModal
                title="Reject User"
                description={`Are you sure do you want to reject the account of ${selectedUser?.lastname}?`}
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

export default Registrations;
