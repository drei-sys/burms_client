import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const UpdateSubject = () => {
    const [subject, setSubject] = useState(null);

    const [formData, setFormData] = useState({
        code: "",
        name: ""
    });
    const [formError, setFormError] = useState({
        code: "",
        name: ""
    });

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getSubject = async () => {
            try {
                const { data } = await http.get(`/api/subject/${params.id}`);
                if (data?.name) {
                    setSubject(data);
                    setFormData({ code: data.code, name: data.name });
                } else {
                    setIsNotExist(true);
                }
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getSubject();
    }, []);

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
                await http.get("/sanctum/csrf-cookie");

                await http.put(`/api/subject/${subject.id}`, { code, name });

                navigate("/subjects");
            } catch (error) {
                console.log(error);

                setFormError({
                    ...formError,
                    code:
                        error?.response?.data?.message || "Something went wrong"
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
            <h1 className="is-size-4 mb-5">
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/subjects")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Update Subject
            </h1>
            <div className="columns">
                <div className="column">
                    <div className="box">
                        {isNotExist ? (
                            <div>Subject not found.</div>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <div className="field">
                                    <label className="label">
                                        Subject code
                                    </label>
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
                                    <label className="label">
                                        Subject name
                                    </label>
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
                                        isLoading && "is-loading"
                                    }`}
                                    type="submit"
                                >
                                    Update subject
                                </button>
                            </form>
                        )}
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default UpdateSubject;
