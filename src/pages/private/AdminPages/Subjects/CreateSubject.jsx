import { useState } from "react";
import { useNavigate } from "react-router-dom";

import http from "services/httpService";

const CreateSubject = () => {
    const [formData, setFormData] = useState({
        code: "",
        name: ""
    });
    const [formError, setFormError] = useState({
        code: "",
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

        const { code, name } = formData;

        let hasError = false;
        const formError = {
            code: "",
            name: ""
        };

        if (code.trim() === "") {
            formError.code = "Subject code is required";
            hasError = true;
        }
        if (name.trim() === "") {
            formError.name = "Subject name is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({
                    code: "",
                    name: ""
                });

                setIsLoading(true);
                await http.post("/api/subject", {
                    code,
                    name,
                    status: "active"
                });

                navigate("/subjects");
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
            <h1 className="is-size-4 mb-5">
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/subjects")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Create Subject
            </h1>
            <div className="columns">
                <div className="column">
                    <div className="box">
                        <form onSubmit={handleFormSubmit}>
                            <div className="field">
                                <label className="label">Subject code</label>
                                <div className="control">
                                    <input
                                        name="code"
                                        className="input"
                                        type="text"
                                        placeholder="Enter subject code"
                                        value={formData.code}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {formError.code && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.code}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="field">
                                <label className="label">Subject name</label>
                                <div className="control">
                                    <input
                                        name="name"
                                        className="input"
                                        type="text"
                                        placeholder="Enter subject name"
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
                                Create subject
                            </button>
                        </form>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default CreateSubject;
