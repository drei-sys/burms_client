import { useState } from "react";
import { useNavigate } from "react-router-dom";

import http from "services/httpService";

const CreateSchoolYear = () => {
    const [formData, setFormData] = useState({
        year: "",
        semester: 1
    });
    const [formError, setFormError] = useState({
        year: "",
        semester: ""
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

        const { year, semester } = formData;

        let hasError = false;
        const formError = {
            year: "",
            semester: ""
        };

        if (year.trim() === "") {
            formError.year = "Year is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({
                    year: "",
                    semester: ""
                });

                setIsLoading(true);
                await http.post("/api/schoolYear", {
                    year,
                    semester,
                    status: "active"
                });

                navigate("/schoolYears");
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
                    onClick={() => navigate("/schoolYears")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Create School Year
            </h1>
            <div className="columns">
                <div className="column">
                    <div className="box">
                        <form onSubmit={handleFormSubmit}>
                            <div className="field">
                                <label className="label">Year</label>
                                <div className="control">
                                    <input
                                        name="year"
                                        className="input"
                                        type="text"
                                        placeholder="2022-2023"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {formError.year && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.year}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="field">
                                <label className="label">Semester</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            name="semester"
                                            value={formData.semester}
                                            onChange={handleInputChange}
                                        >
                                            <option value={1}>1st</option>
                                            <option value={2}>2nd</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                className={`button is-success  ${
                                    isLoading ? "is-loading" : ""
                                }`}
                                type="submit"
                            >
                                Create school year
                            </button>
                        </form>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default CreateSchoolYear;
