import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const UpdateSection = () => {
    const [section, setSection] = useState(null);

    const [formData, setFormData] = useState({
        name: ""
    });
    const [formError, setFormError] = useState({
        name: ""
    });

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const { type: userType, status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getSection = async () => {
            try {
                const { data } = await http.get(`/api/section/${params.id}`);

                if (data?.name) {
                    setSection(data);
                    setFormData({ name: data.name });
                } else {
                    setIsNotExist(true);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getSection();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Update Section</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (isNotExist) {
        return <div className="has-text-centered mt-6">Section not found.</div>;
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
            formError.name = "Section name is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({ name: "" });

                setIsLoading(true);
                await http.put(`/api/section/${section.id}`, { name });

                navigate(
                    userType === "DeptChair"
                        ? "/deptChairSections"
                        : "/sections"
                );
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
                    onClick={() =>
                        navigate(
                            userType === "DeptChair"
                                ? "/deptChairSections"
                                : "/sections"
                        )
                    }
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Update Section
            </h1>
            <div className="columns">
                <div className="column">
                    <div className="box">
                        <form onSubmit={handleFormSubmit}>
                            <div className="field">
                                <label className="label">Section name</label>
                                <div className="control">
                                    <input
                                        name="name"
                                        className="input"
                                        type="text"
                                        placeholder="Enter section name"
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
                                Update section
                            </button>
                        </form>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default UpdateSection;
