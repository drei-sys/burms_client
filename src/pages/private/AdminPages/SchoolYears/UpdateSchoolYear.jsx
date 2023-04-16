import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const UpdateSchoolYear = () => {
    const [schoolYear, setSchoolYear] = useState(null);

    const [formData, setFormData] = useState({
        year: "",
        semester: 0
    });
    const [formError, setFormError] = useState({
        year: "",
        semester: ""
    });

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getSchoolYear = async () => {
            try {
                const { data } = await http.get(`/api/schoolYear/${params.id}`);

                if (data?.year) {
                    setSchoolYear(data);
                    setFormData({ year: data.year, semester: data.semester });
                } else {
                    setIsNotExist(true);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getSchoolYear();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (isNotExist) {
        return (
            <div className="has-text-centered mt-6">School year not found.</div>
        );
    }

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
                await http.put(`/api/schoolYear/${schoolYear.id}`, {
                    year,
                    semester
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
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/schoolYears")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Update School Year
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
                                            <option value="1st">1st</option>
                                            <option value="2nd">2nd</option>
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
                                Update school year
                            </button>
                        </form>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default UpdateSchoolYear;
