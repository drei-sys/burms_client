import { useState } from "react";
import { useNavigate } from "react-router-dom";

import http from "services/httpService";

const CreateTORRequest = () => {
    const [formData, setFormData] = useState({
        reason: ""
    });
    const [formError, setFormError] = useState({
        reason: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

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
                setFormError({
                    reason: ""
                });

                setIsLoading(true);
                await http.post("/api/torRequest", {
                    reason,
                    status: "Pending"
                });

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
                Request TOR
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
                                Request TOR
                            </button>
                        </form>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default CreateTORRequest;
