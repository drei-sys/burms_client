import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const UpdateTORRequest = () => {
    const [torRequest, setTORRequest] = useState(null);

    const [formData, setFormData] = useState({
        reason: ""
    });
    const [formError, setFormError] = useState({
        reason: ""
    });

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getTORRequest = async () => {
            try {
                const { data } = await http.get(`/api/torRequest/${params.id}`);

                if (data?.reason) {
                    setTORRequest(data);
                    setFormData({ reason: data.reason });
                } else {
                    setIsNotExist(true);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getTORRequest();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (isNotExist) {
        return (
            <div className="has-text-centered mt-6">TOR request not found.</div>
        );
    }

    const handleInputChange = e => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: "" });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        const { reason } = formData;

        let hasError = false;
        const formError = {
            reason: ""
        };

        if (reason.trim() === "") {
            formError.reason = "Reason is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({ reason: "" });

                setIsLoading(true);
                await http.put(`/api/torRequest/${torRequest.id}`, { reason });

                navigate("/torRequests");
            } catch (error) {
                setFormError({
                    ...formError,
                    ...(error?.response?.data?.errors || {
                        reason: "Something went wrong!"
                    })
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/torRequests")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Update TOR Request
            </h1>
            <div className="columns">
                <div className="column">
                    <div className="box">
                        <form onSubmit={handleFormSubmit}>
                            <div className="field">
                                <label className="label">Reason</label>
                                <div className="control">
                                    <input
                                        name="reason"
                                        className="input"
                                        type="text"
                                        placeholder="Enter reason"
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {formError.reason && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.reason}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button
                                className={`button is-success  ${
                                    isLoading ? "is-loading" : ""
                                }`}
                                type="submit"
                            >
                                Update TOR Request
                            </button>
                        </form>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default UpdateTORRequest;
