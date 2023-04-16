import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const UpdateTeacherSubjects = () => {
    const [formData, setFormData] = useState({
        syId: 0,
        teacherId: 0,
        subjectIds: []
    });

    const [formError, setFormError] = useState({
        syId: "",
        teacherId: "",
        subjectIds: ""
    });

    const [schoolYears, setSchoolYears] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [teacherSubject, setTeacherSubject] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getSchoolYears = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/teacherSubjectFormData");
                const { schoolYears, teachers, subjects } = data;

                const { data: data2 } = await http.get(
                    `/api/teacherSubject/${params.id}`
                );

                const { teacherSubject, teacherSubjectItems } = data2;

                if (teacherSubject) {
                    setSchoolYears(schoolYears);
                    setTeachers(teachers);
                    setSubjects(subjects);

                    setFormData({
                        syId: teacherSubject.sy_id,
                        teacherId: teacherSubject.teacher_id,
                        subjectIds: teacherSubjectItems.map(({ id }) => id)
                    });

                    setTeacherSubject(teacherSubject);
                } else {
                    setIsNotExist(true);
                }

                //setSchoolYears(data);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getSchoolYears();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (isNotExist) {
        return <div className="has-text-centered mt-6">Teacher not found.</div>;
    }

    const handleInputChange = e => {
        let { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: "" });
    };

    const handleCheckboxChange = subjectId => {
        let newCheckedSubjectIds = [];
        if (formData.subjectIds.includes(subjectId)) {
            newCheckedSubjectIds = formData.subjectIds.filter(
                id => id !== subjectId
            );
        } else {
            newCheckedSubjectIds = [...formData.subjectIds, subjectId];
        }

        setFormData({ ...formData, subjectIds: newCheckedSubjectIds });
        setFormError({ ...formError, subjectIds: "" });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        const { syId, teacherId, subjectIds } = formData;

        let hasError = false;
        const formError = {
            syId: "",
            teacherId: "",
            subjectIds: ""
        };

        if (Number(syId) === 0) {
            formError.syId = "School year is required";
            hasError = true;
        }
        if (Number(teacherId) === 0) {
            formError.teacherId = "Teacher is required";
            hasError = true;
        }
        if (subjectIds.length === 0) {
            formError.subjectIds = "Subjects is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({
                    syId: "",
                    teacherId: "",
                    subjectIds: ""
                });

                setIsLoading(true);
                await http.put(`/api/teacherSubject/${params.id}`, {
                    ...formData,
                    totalSubjects: formData.subjectIds.length,
                    status: "Active"
                });

                navigate("/teacherSubjects");
            } catch (error) {
                setFormError({
                    ...formError,
                    ...(error?.response?.data?.errors || {
                        subjectIds: "Something went wrong!"
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
                    onClick={() => {
                        navigate(`/teacherSubjects`);
                    }}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Update Assign Teacher
            </h1>
            <div className="box mb-4">
                <form onSubmit={handleFormSubmit}>
                    <div className="field">
                        <label className="label">Select school year</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    name="syId"
                                    value={formData.syId}
                                    onChange={handleInputChange}
                                    disabled
                                >
                                    <option value={0}></option>
                                    {schoolYears.map(
                                        ({ id, year, semester }) => (
                                            <option key={id} value={id}>
                                                {year}: {semester} Semester
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                        </div>
                        {formError.syId && (
                            <div>
                                <span className="has-text-danger">
                                    {formError.syId}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="field">
                        <label className="label">Select teacher</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    name="teacherId"
                                    value={formData.teacherId}
                                    onChange={handleInputChange}
                                    disabled
                                >
                                    <option value={0}></option>
                                    {teachers.map(({ id, name }) => (
                                        <option key={id} value={id}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {formError.teacherId && (
                            <div>
                                <span className="has-text-danger">
                                    {formError.teacherId}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="field">
                        <label className="label">Select subjects</label>
                        <div className="control">
                            {subjects.map(({ id, code, name }) => (
                                <div key={id}>
                                    <label className="checkbox">
                                        <input
                                            type="checkbox"
                                            name={id}
                                            checked={formData.subjectIds.includes(
                                                id
                                            )}
                                            onChange={() =>
                                                handleCheckboxChange(id)
                                            }
                                        />{" "}
                                        {`${code}: ${name}`}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {formError.subjectIds && (
                            <div>
                                <span className="has-text-danger">
                                    {formError.subjectIds}
                                </span>
                            </div>
                        )}
                    </div>
                    <hr />
                    {teacherSubject?.status === "Active" && (
                        <button
                            className={`button is-success  ${
                                isLoading ? "is-loading" : ""
                            }`}
                            type="submit"
                        >
                            Update teacher subjects
                        </button>
                    )}
                </form>
            </div>
        </>
    );
};

export default UpdateTeacherSubjects;
