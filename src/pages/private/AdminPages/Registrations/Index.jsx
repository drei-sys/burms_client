import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import http from "services/httpService";

const Registrations = () => {
    const [activeTab, setActiveTab] = useState(1);

    const [refetchUsersRef, setRefetchUsersRef] = useState(0);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmVerify, setIsOpenConfirmVerify] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/users");
                setUsers(data);
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
        setSelectedUser(users.find(({ id }) => id === selectedId));
        setIsOpenConfirmVerify(true);
    };

    const handleVerify = async () => {
        try {
            setIsLoading(true);
            await http.put(`/api/verifyUser/${selectedUser.id}`);
            setRefetchUsersRef(Math.random());
        } catch (error) {
            alert(
                "An error occured while verifying the user. Please try again."
            );
        } finally {
            setIsOpenConfirmVerify(false);
            setIsLoading(false);
        }
    };

    const forApproveUser = users.filter(({ is_verified }) => is_verified === 0);
    const approvedUser = users.filter(({ is_verified }) => is_verified === 1);

    const userTypes = {
        1: "Admin",
        3: "Student",
        4: "Teacher",
        5: "Non Teaching",
        6: "Registrar",
        7: "Dean",
        8: "Department Chair"
    };

    const Table = ({ users }) => {
        if (users.length === 0) {
            return <div className="has-text-centered">No users found.</div>;
        }

        return (
            <table className="table is-fullwidth is-hoverable">
                <thead>
                    <tr>
                        <th>User name</th>
                        <th style={{ width: 120 }}></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(({ id, name, user_type, is_verified }) => {
                        return (
                            <tr key={id}>
                                <td>
                                    <div>
                                        <span className="has-text-weight-medium">
                                            {name}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="is-size-6">
                                            {userTypes[user_type]}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <Link to={`/registration/${id}`}>
                                        <button
                                            className="button mr-1"
                                            title="View profile"
                                        >
                                            <span className="icon">
                                                <i className="fa-solid fa-eye"></i>
                                            </span>
                                        </button>
                                    </Link>
                                    {!is_verified ? (
                                        <button
                                            className="button is-success mr-1"
                                            title="Verify"
                                            onClick={() =>
                                                showConfirmVerify(id)
                                            }
                                        >
                                            <span className="icon">
                                                <i className="fa-solid fa-check"></i>
                                            </span>
                                        </button>
                                    ) : null}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    let TabContent = () => null;
    if (activeTab === 1) {
        TabContent = () => <Table users={forApproveUser} />;
    } else if (activeTab === 2) {
        TabContent = () => <Table users={approvedUser} />;
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
                            <a>For Verification ({forApproveUser.length})</a>
                        </li>
                        <li
                            className={activeTab === 2 ? "is-active" : ""}
                            onClick={() => setActiveTab(2)}
                        >
                            <a>Verified ({approvedUser.length})</a>
                        </li>
                    </ul>
                </div>

                <div className="px-4">
                    <TabContent />
                </div>
            </div>

            <ConfirmModal
                title="Confirm User"
                description={`Are you sure do you want to verify the account of ${selectedUser?.name}?`}
                isOpen={isOpenConfirmVerify}
                isLoading={isLoading}
                onOk={() => {
                    handleVerify();
                }}
                onClose={() => {
                    setIsOpenConfirmVerify(false);
                }}
            />
        </>
    );
};

export default Registrations;
