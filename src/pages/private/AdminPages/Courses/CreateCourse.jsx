import { useState } from "react";
import { useNavigate } from "react-router-dom";

import http from "services/httpService";

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        name: ""
    });
    const [formError, setFormError] = useState({
        name: ""
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

        const { name } = formData;

        let hasError = false;
        const formError = {
            name: ""
        };

        if (name.trim() === "") {
            formError.name = "Course name is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({
                    name: ""
                });

                setIsLoading(true);
                await http.post("/api/course", {
                    name,
                    status: "Active"
                });

                navigate("/courses");
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
                    onClick={() => navigate("/courses")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Create Course
            </h1>
            <div className="columns">
                <div className="column">
                    <div className="box">
                        <form onSubmit={handleFormSubmit}>
                            <div className="field">
                                <label className="label">Course name</label>
                                <div className="control">
                                    <input
                                        name="name"
                                        className="input"
                                        type="text"
                                        placeholder="Enter course name"
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
                                Create course
                            </button>
                        </form>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default CreateCourse;
