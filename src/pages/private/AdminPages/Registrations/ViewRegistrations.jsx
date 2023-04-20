import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const ViewRegistration = () => {
    const [user, setUser] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const [isVerifyLoading, setIsVerifyLoading] = useState(false);
    const [isRejectLoading, setIsRejectLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await http.get(`/api/user/${params.id}`);
                if (data?.lastname) {
                    setUser(data);
                } else {
                    setIsNotExist(true);
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
        return <div className="has-text-centered mt-6">User not found.</div>;
    }

    const handleVerify = async () => {
        try {
            setIsVerifyLoading(true);
            await http.put(`/api/verifyUser/${params.id}`);
            navigate("/registrations");
        } catch (error) {
            setError(error);
        } finally {
            setIsVerifyLoading(false);
        }
    };

    const handleReject = async () => {
        try {
            setIsRejectLoading(true);
            await http.put(`/api/rejectUser/${params.id}`);
            navigate("/registrations");
        } catch (error) {
            setError(error);
        } finally {
            setIsRejectLoading(false);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/registrations")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                View Registration
            </h1>
            <div className="box">
                <div className="has-text-right">
                    {user.user_status === "Verified" ? (
                        <span className="has-text-success">
                            <span className="icon">
                                <i className="fa-solid fa-check"></i>
                            </span>{" "}
                            Verified
                        </span>
                    ) : user.user_status === "Rejected" ? (
                        <span className="has-text-danger">
                            <span className="icon">
                                <i className="fa-solid fa-xmark-to-slot"></i>
                            </span>{" "}
                            Rejected
                        </span>
                    ) : (
                        <>
                            <button
                                className={`button is-success mr-1  ${
                                    isVerifyLoading ? "is-loading" : ""
                                }`}
                                onClick={handleVerify}
                            >
                                Verify
                            </button>
                            <button
                                className={`button is-danger mr-1  ${
                                    isRejectLoading ? "is-loading" : ""
                                }`}
                                onClick={handleReject}
                            >
                                Reject
                            </button>
                        </>
                    )}
                </div>
                <hr />
                <div>Name: {user.lastname}</div>
            </div>
        </>
    );
};

export default ViewRegistration;
