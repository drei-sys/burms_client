import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import http from "services/httpService";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const [formError, setFormError] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    const [isResetPasswordSuccess, setIsResetPasswordSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();

    const csrf = () => http.get("/sanctum/csrf-cookie");

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: "" });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        const { newPassword, confirmPassword } = formData;

        let hasError = false;
        const formError = { newPassword: "", confirmPassword: "" };

        if (newPassword.trim() === "") {
            formError.newPassword = "New password is required";
            hasError = true;
        }
        if (confirmPassword.trim() === "") {
            formError.confirmPassword = "Confirm password is required";
            hasError = true;
        }
        if (newPassword !== confirmPassword) {
            formError.confirmPassword = "Password not match";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setIsLoading(true);
                await csrf();
                await http.post("/reset-password", {
                    token: searchParams.get("token"),
                    email: searchParams.get("email"),
                    password: newPassword,
                    password_confirmation: confirmPassword
                });
                setIsResetPasswordSuccess(true);
            } catch (error) {
                console.log(error);
                setFormError({
                    ...formError,
                    newPassword:
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
                {isResetPasswordSuccess ? (
                    <div className="box">
                        <div className="is-size-4 has-text-centered">
                            Password has been reset!
                        </div>
                        <p className="my-3 has-text-centered">
                            Your password has been changed.
                        </p>
                        <div className="has-text-centered mt-3">
                            <Link to="/login">Go to login</Link>
                        </div>
                    </div>
                ) : (
                    <div className="box">
                        <div className="is-size-4 has-text-centered">
                            Reset Password
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="field">
                                <label className="label">New password</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        name="newPassword"
                                        type="password"
                                        placeholder="Enter your new password"
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {formError.newPassword && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.newPassword}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="field">
                                <label className="label">
                                    Confirm password
                                </label>
                                <div className="control">
                                    <input
                                        className="input"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {formError.confirmPassword && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.confirmPassword}
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
                                Reset password
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
