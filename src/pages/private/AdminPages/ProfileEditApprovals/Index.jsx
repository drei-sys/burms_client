import { useEffect, useState } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";
import UserName from "components/common/UserName";

import http from "services/httpService";

const ProfileEditApprovals = () => {
    const [refetchUsersRef, setRefetchUsersRef] = useState(0);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmApprove, setIsOpenConfirmApprove] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/profileEditApprovals");
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

    const showConfirmApprove = selectedId => {
        setSelectedUser(users.find(({ id }) => id === selectedId));
        setIsOpenConfirmApprove(true);
    };

    const handleApprove = async () => {
        try {
            setIsLoading(true);
            await http.put(`/api/userStatus/${selectedUser.id}`, {
                status: "Editable"
            });
            setRefetchUsersRef(Math.random());
        } catch (error) {
            alert(
                "An error occured while verifying the user. Please try again."
            );
        } finally {
            setIsOpenConfirmApprove(false);
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Profile Edit Approvals</h1>
            <div className="box">
                {users.length === 0 ? (
                    <div className="has-text-centered">
                        No for approval profile edit found.
                    </div>
                ) : (
                    <>
                        <table className="table is-fullwidth is-hoverable">
                            <thead>
                                <tr>
                                    <th>User name</th>
                                    <th style={{ width: 60 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(
                                    ({
                                        id,
                                        lastname,
                                        firstname,
                                        middlename,
                                        extname,
                                        user_type
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
                                                    <button
                                                        className="button is-success mr-1"
                                                        title="Approve"
                                                        onClick={() =>
                                                            showConfirmApprove(
                                                                id
                                                            )
                                                        }
                                                    >
                                                        <span className="icon">
                                                            <i className="fa-solid fa-check"></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                        <div className="p-4 has-text-right">
                            {users.length} total items
                        </div>
                    </>
                )}
            </div>

            <ConfirmModal
                title="Approve Edit Profile"
                description={`Are you sure do you want to approve the profile edit of ${selectedUser?.lastname}?`}
                isOpen={isOpenConfirmApprove}
                isLoading={isLoading}
                onOk={() => {
                    handleApprove();
                }}
                onClose={() => {
                    setIsOpenConfirmApprove(false);
                }}
            />
        </>
    );
};

export default ProfileEditApprovals;
