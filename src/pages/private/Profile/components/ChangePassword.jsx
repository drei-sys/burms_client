import { useState } from "react";
import http from "services/httpService";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [formError, setFormError] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: "" });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        const { oldPassword, newPassword, confirmPassword } = formData;

        let hasError = false;
        const formError = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        };

        if (oldPassword.trim() === "") {
            formError.oldPassword = "Old password is required";
            hasError = true;
        }
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
                setFormError({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });

                await http.post("/change-password", {
                    oldPassword,
                    newPassword
                });
                setFormData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });

                alert("Password successfully changed!");
            } catch (error) {
                setFormError({
                    ...formError,
                    ...(error?.response?.data?.errors || {
                        email: "Something went wrong!"
                    })
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="field">
                <label className="label">Old password</label>
                <div className="control">
                    <input
                        className="input"
                        name="oldPassword"
                        type="password"
                        placeholder="Enter your old password"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                    />
                </div>
                {formError.oldPassword && (
                    <div>
                        <span className="has-text-danger">
                            {formError.oldPassword}
                        </span>
                    </div>
                )}
            </div>

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
                <label className="label">Confirm password</label>
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
                    isLoading ? "is-loading" : ""
                }`}
                type="submit"
            >
                Change password
            </button>
        </form>
    );
};

export default ChangePassword;
