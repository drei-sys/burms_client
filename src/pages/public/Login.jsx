import { useState } from "react";
import { Link } from "react-router-dom";
import http from "services/httpService";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [formError, setFormError] = useState({
        email: "",
        password: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: "" });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        const { email, password } = formData;

        let hasError = false;
        const formError = { email: "", password: "" };

        if (email.trim() === "") {
            formError.email = "Email is required";
            hasError = true;
        }
        if (password.trim() === "") {
            formError.password = "Password is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({ email: "", password: "" });

                setIsLoading(true);
                await http.get("/sanctum/csrf-cookie");
                await http.post("/login", formData);

                setFormData({ email: "", password: "" });

                //navigate("/dashboard");
                window.location.reload();
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
        <div
            style={{ maxWidth: 400, marginTop: 100 }}
            className="container is-max-desktop"
        >
            <div className="box">
                <div className="is-size-4 has-text-centered">Login</div>
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
                    <div className="has-text-right mt-3 mb-3">
                        <Link to="/forgotPassword">Forgot password?</Link>
                    </div>

                    <button
                        className={`button is-success is-fullwidth ${
                            isLoading ? "is-loading" : ""
                        }`}
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>

                <div className="has-text-centered mt-3">
                    Not a member?{" "}
                    <span className="is-underlined">
                        <Link to="/register">Register</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
