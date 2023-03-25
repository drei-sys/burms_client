import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "services/httpService";

const Register = () => {
    const [formData, setFormData] = useState({
        userType: 3,
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [formError, setFormError] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const csrf = () => http.get("/sanctum/csrf-cookie");

    const handleInputChange = e => {
        let { name, value } = e.target;
        if (name === "userType") {
            value = Number(value);
        }
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: "" });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        const { userType, name, email, password, confirmPassword } = formData;

        let hasError = false;
        const formError = {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        };

        if (name.trim() === "") {
            formError.name = "Name is required";
            hasError = true;
        }
        if (email.trim() === "") {
            formError.email = "Email is required";
            hasError = true;
        }
        if (password.trim() === "") {
            formError.password = "Password is required";
            hasError = true;
        }
        if (confirmPassword.trim() === "") {
            formError.confirmPassword = "Confirm password is required";
            hasError = true;
        }
        if (password !== confirmPassword) {
            formError.confirmPassword = "Password not match";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });

                setIsLoading(true);
                await csrf();
                await http.post("/register", {
                    name,
                    email,
                    password,
                    password_confirmation: confirmPassword,
                    user_type: userType
                });

                setFormData({
                    userType: 3,
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });

                window.location = "/login";
            } catch (error) {
                setFormError({
                    ...formError,
                    email:
                        error?.response?.data?.message || "Something went wrong"
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div style={{ marginTop: 100, marginBottom: 100 }}>
            <div style={{ maxWidth: 400 }} className="container is-max-desktop">
                <div className="box">
                    <div className="is-size-4 has-text-centered">Register</div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="field">
                            <label className="label">Register as</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        name="userType"
                                        value={formData.userType}
                                        onChange={handleInputChange}
                                    >
                                        <option value={3}>Student</option>
                                        <option value={4}>Teacher</option>
                                        <option value={5}>Non Teaching</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    name="name"
                                    className="input"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {formError.name && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.name}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    name="email"
                                    className="input"
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

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                    className="input"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {formError.password && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.password}
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
                                isLoading && "is-loading"
                            }`}
                            type="submit"
                        >
                            Register
                        </button>
                    </form>

                    <div className="has-text-centered mt-3">
                        Already a member ?{" "}
                        <span className="is-underlined">
                            <Link to="/login">Login</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
