import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const UpdateProfile = () => {
    const [profile, setProfile] = useState(null);

    const [formData, setFormData] = useState({
        name: ""
    });
    const [formError, setFormError] = useState({
        name: ""
    });

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotEditable, setIsNotEditable] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const { status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const { data } = await http.get(`/api/userDetails`);
                if (data.status !== "Editable") {
                    setIsNotEditable(true);
                } else {
                    setProfile(data);
                    setFormData({ name: data.name });
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getProfile();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (isNotEditable) {
        return (
            <div className="notification is-warning my-4">
                Your profile is prohibited from editing.
            </div>
        );
    }

    if (userStatus === "For Verification") {
        return (
            <div className="notification is-warning my-4">
                Your account is pending for admin verification.
            </div>
        );
    }

    const handleInputChange = e => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: "" });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        const { name } = formData;

        let hasError = false;
        const formError = {
            name: ""
        };

        if (name.trim() === "") {
            formError.name = "Name is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({ name: "" });

                setIsLoading(true);
                await http.put(`/api/userDetails/${profile.id}`, {
                    name
                });

                navigate("/profile");
            } catch (error) {
                setFormError({
                    ...formError,
                    ...(error?.response?.data?.errors || {
                        name: "Something went wrong!"
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
                    onClick={() => navigate("/profile")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Update Profile
            </h1>
            <div className="columns">
                <div className="column">
                    <div className="box">
                        <form onSubmit={handleFormSubmit}>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input
                                        name="name"
                                        className="input"
                                        type="text"
                                        placeholder="Enter name"
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

                            <button
                                className={`button is-success  ${
                                    isLoading ? "is-loading" : ""
                                }`}
                                type="submit"
                            >
                                Update profile
                            </button>
                        </form>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default UpdateProfile;
