import { useNavigate } from "react-router-dom";
import { useState } from "react";

import http from "services/httpService";

const CreateAnnouncement = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    const [formError, setFormError] = useState({
        name: "",
        description: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = e => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
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
                setFormError({
                    name: "",
                    description: ""
                });

                setIsLoading(true);

                await http.post("/api/announcement", {
                    ...formData,
                    status: "Active"
                });

                navigate("/announcements");
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <>
                <h1 className="is-size-4 mb-4">
                    <button
                        className="button is-ghost"
                        onClick={() => navigate("/announcements")}
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>{" "}
                    Create Announcement
                </h1>

                <div className="columns">
                    <div className="column is-6">
                        <div className="box">
                            <form onSubmit={handleSubmit}>
                                <div className="field">
                                    <label className="label">
                                        Announcement
                                    </label>
                                    <div className="control">
                                        <input
                                            name="name"
                                            className="input"
                                            type="text"
                                            placeholder="Enter annoucement"
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
                                    Create announcement
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="column is-6"></div>
                </div>
            </>
        </>
    );
};

export default CreateAnnouncement;
