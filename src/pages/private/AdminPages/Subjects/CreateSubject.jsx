import { useState } from "react";
import { useNavigate } from "react-router-dom";

import http from "services/httpService";

const CreateSubject = () => {
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        unit: 0,
        type: "Minor"
    });
    const [formError, setFormError] = useState({
        code: "",
        name: "",
        unit: "",
        type: ""
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

        const { code, name, unit, type } = formData;

        let hasError = false;
        const formError = {
            code: "",
            name: "",
            unit: "",
            type: ""
        };

        if (code.trim() === "") {
            formError.code = "Subject code is required";
            hasError = true;
        }
        if (name.trim() === "") {
            formError.name = "Subject name is required";
            hasError = true;
        }
        if (unit === "" || unit <= 0) {
            formError.unit = "Unit is required and must be greater that zero";
            hasError = true;
        }
        if (type === "") {
            formError.type = "Subject type is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({
                    code: "",
                    name: "",
                    unit: "",
                    type: ""
                });

                setIsLoading(true);
                await http.post("/api/subject", {
                    code,
                    name,
                    unit,
                    type,
                    status: "Active"
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
            <h1 className="is-size-4 mb-4">
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

                            <div className="field">
                                <label className="label">Unit</label>
                                <div className="control">
                                    <input
                                        name="unit"
                                        className="input"
                                        type="number"
                                        value={formData.unit}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {formError.unit && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.unit}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="field">
                                <label className="label">Type</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Minor">Minor</option>
                                            <option value="Major">Major</option>
                                        </select>
                                    </div>
                                </div>
                                {formError.type && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.type}
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
