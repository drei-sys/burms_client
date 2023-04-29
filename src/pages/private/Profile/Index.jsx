import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ChangePassword from "./components/ChangePassword";

import StudentDetails from "components/common/StudentDetails";
import NonTeachingDetails from "components/common/NonTeachingDetails";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const Profile = () => {
    const [refetchUserDetailsRef, setRefetchUserDetailsRef] = useState(0);
    const [user, setUser] = useState(null);
    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const {
        id: userId,
        status: userStatus,
        type: userType
    } = useUserStore(state => state);

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get(`/api/user/${userId}`);
                setUser(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getUserDetails();
    }, [refetchUserDetailsRef]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const handleRequestEdit = async () => {
        try {
            setIsLoading(true);
            await http.put(`/api/userStatus/${user.id}`, {
                status: "For Approval"
            });
            setRefetchUserDetailsRef(Math.random());
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Profile</h1>
            {userStatus === "For Verification" ? (
                <div className="box mb-4">
                    <div className="notification is-warning my-4">
                        Your account is pending for admin verification.
                    </div>
                </div>
            ) : userType === "Admin" ? (
                <div className="box mb-4">
                    <div className="notification is-info my-4">
                        You are an Admin
                    </div>
                </div>
            ) : (
                <div className="box mb-4">
                    <div className="has-text-right">
                        {user.status === "Uneditable" && (
                            <button
                                className={`button is-success ${
                                    isLoading ? "is-loading" : ""
                                }`}
                                onClick={handleRequestEdit}
                            >
                                Request for profile edit
                            </button>
                        )}
                        {user.status === "For Approval" && (
                            <span className="has-text-success">
                                <span className="icon">
                                    <i className="fa-solid fa-check"></i>
                                </span>{" "}
                                Update requested
                            </span>
                        )}
                        {user.status === "Editable" && (
                            <Link to="/updateProfile">
                                <button className="button is-success">
                                    Update profile
                                </button>
                            </Link>
                        )}
                    </div>
                    <hr />
                    <div>
                        {userType === "Student" ? (
                            <StudentDetails data={user} />
                        ) : (
                            <NonTeachingDetails data={user} />
                        )}
                    </div>
                </div>
            )}

            <div className="columns">
                <div className="column">
                    <div className="box mb-4">
                        <div className="mb-4">Change password</div>
                        <div className="box">
                            <ChangePassword />
                        </div>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default Profile;
