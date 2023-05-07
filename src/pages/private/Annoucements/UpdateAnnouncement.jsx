import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const UpdateAnnouncement = () => {
    const [announcement, setAnnouncement] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    const [formError, setFormError] = useState({
        name: "",
        description: ""
    });

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getAnnouncement = async () => {
            try {
                const { data } = await http.get(
                    `/api/announcement/${params.id}`
                );

                if (data?.name) {
                    setAnnouncement(data);
                    setFormData({
                        name: data.name,
                        description: data.description
                    });
                } else {
                    setIsNotExist(true);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getAnnouncement();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (isNotExist) {
        return (
            <div className="has-text-centered mt-6">
                Announcement not found.
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

        const { name, description } = formData;

        let hasError = false;
        const formError = {
            name: "",
            description: ""
        };

        if (name.trim() === "") {
            formError.name = "Announcement is required";
            hasError = true;
        }
        if (description.trim() === "") {
            formError.description = "Description is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({ name: "", description: "" });

                setIsLoading(true);
                await http.put(`/api/announcement/${announcement.id}`, {
                    name,
                    description
                });

                navigate("/announcements");
            } catch (error) {
                setFormError({
                    ...formError,
                    ...(error?.response?.data?.errors || {
                        description: "Something went wrong!"
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
                    onClick={() => navigate("/announcements")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Update Announcement
            </h1>
            <div className="columns">
                <div className="column">
                    <div className="box">
                        <form onSubmit={handleFormSubmit}>
                            <div className="field">
                                <label className="label">Announcement</label>
                                <div className="control">
                                    <input
                                        name="name"
                                        className="input"
                                        type="text"
                                        placeholder="Enter announcement"
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
                                <label className="label">
                                    Announcement description
                                </label>
                                <div className="control">
                                    <input
                                        name="description"
                                        className="input"
                                        type="text"
                                        placeholder="Enter description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {formError.description && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.description}
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
                                Update announcement
                            </button>
                        </form>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default UpdateAnnouncement;
