import { useState } from "react";
import { Link } from "react-router-dom";
import http from "services/httpService";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({ email: "" });
    const [formError, setFormError] = useState({ email: "" });
    const [isSendEmailSuccess, setIsSendEmailSuccess] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const csrf = () => http.get("/sanctum/csrf-cookie");

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: "" });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        const { email } = formData;

        let hasError = false;
        const formError = { email: "" };

        if (email.trim() === "") {
            formError.email = "Email is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setIsLoading(true);
                await csrf();
                await http.post("/forgot-password", { email });
                setIsSendEmailSuccess(true);
            } catch (error) {
                setFormError({
                    ...formError,
                    email:
                        error?.response?.data?.message ||
                        error?.message ||
                        "Something went wrong"
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div style={{ marginTop: 100 }}>
            <div style={{ maxWidth: 400 }} className="container is-max-desktop">
                {isSendEmailSuccess ? (
                    <div className="box">
                        <div className="is-size-4 has-text-centered">
                            Password reset link sent!
                        </div>
                        <p className="my-3">
                            Visit your email and click the reset link to reset
                            your password.
                        </p>
                    </div>
                ) : (
                    <div className="box">
                        <div className="is-size-4 has-text-centered">
                            Forgot Password
                        </div>
                        <p className="my-3">
                            Don't worry. Resetting your password is easy, just
                            enter your user account's email address and we will
                            send you a password reset link.
                        </p>
                        <form onSubmit={handleFormSubmit}>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {formError.email && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.email}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <button
                                className={`button is-success is-fullwidth ${
                                    isLoading && "is-loading"
                                }`}
                                type="submit"
                            >
                                Send password reset email
                            </button>
                        </form>
                        <div className="has-text-centered mt-3">
                            <Link to="/login">Back to login</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
