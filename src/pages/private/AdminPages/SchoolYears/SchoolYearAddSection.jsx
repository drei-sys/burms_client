import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

import { useUserStore } from "store/userStore";

const SchoolYearAddSection = () => {
    const [formData, setFormData] = useState({
        courseId: 0,
        sectionId: 0,
        slots: 0,
        subjectIds: []
    });
    const [formError, setFormError] = useState({
        courseId: "",
        sectionId: "",
        slots: "",
        subjectIds: ""
    });

    const [schoolYear, setSchoolYear] = useState(null);
    const [courses, setCourses] = useState([]);
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const { type: userType } = useUserStore(state => state);

    useEffect(() => {
        const getSchoolYear = async () => {
            try {
                const { data } = await http.get(
                    `/api/schoolYearSectionFormData/${params.id}`
                );
                const { schoolYear, courses, sections, subjects } = data;
                if (schoolYear) {
                    setSchoolYear(schoolYear);
                    setCourses(courses);
                    setSections(sections);
                    setSubjects(subjects);

                    setFormData({
                        ...formData,
                        courseId: courses[0]?.id || "",
                        sectionId: sections[0]?.id || ""
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

        const { courseId, sectionId, slots, subjectIds } = formData;

        let hasError = false;
        const formError = {
            courseId: "",
            sectionId: "",
            slots: "",
            subjectIds: ""
        };

        if (courseId === "") {
            formError.courseId = "Course is required";
            hasError = true;
        }
        if (sectionId === "") {
            formError.sectionId = "Section is required";
            hasError = true;
        }
        if (slots === "" || slots <= 0) {
            formError.slots = "Slots is required and must be greater that zero";
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
                    courseId: "",
                    sectionId: "",
                    slots: "",
                    subjectIds: ""
                });

                setIsLoading(true);
                await http.post("/api/schoolYearSection", {
                    syId: schoolYear.id,
                    ...formData,
                    subjectIds: JSON.stringify(formData.subjectIds),
                    status: "Active"
                });

                navigate(
                    `/${
                        userType === 8
                            ? "deptChairSchoolYearSections"
                            : "schoolYearSections"
                    }/${schoolYear.id}`
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
                    onClick={() => {
                        navigate(
                            `/${
                                userType === 8
                                    ? "deptChairSchoolYearSections"
                                    : "schoolYearSections"
                            }/${schoolYear.id}`
                        );
                    }}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                School Year Add Section
            </h1>
            <div className="columns">
                <div className="column is-4">
                    <div className="box">
                        <label className="label">School year details</label>
                        <table className="table " style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <span className="">Year:</span>
                                    </td>
                                    <td>{schoolYear.year}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="">Semester:</span>
                                    </td>
                                    <td>{schoolYear.semester}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="">Status:</span>
                                    </td>
                                    <td>{schoolYear.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="column is-8">
                    <div className="box">
                        {schoolYear.status === "locked" ? (
                            <div className="has-text-centered p-4">
                                This school year has been locked.
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <div className="field">
                                    <label className="label">Course</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                name="courseId"
                                                value={formData.courseId}
                                                onChange={handleInputChange}
                                            >
                                                {courses.map(({ id, name }) => (
                                                    <option key={id} value={id}>
                                                        {name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    {formError.courseId && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.courseId}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="field">
                                    <label className="label">Section</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                name="sectionId"
                                                value={formData.sectionId}
                                                onChange={handleInputChange}
                                            >
                                                {sections.map(
                                                    ({ id, name }) => (
                                                        <option
                                                            key={id}
                                                            value={id}
                                                        >
                                                            {name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        {formError.sectionId && (
                                            <div>
                                                <span className="has-text-danger">
                                                    {formError.sectionId}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Slots</label>
                                    <div className="control">
                                        <input
                                            name="slots"
                                            className="input"
                                            type="number"
                                            value={formData.slots}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {formError.slots && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.slots}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="field">
                                    <label className="label">Subjects</label>
                                    <div className="control">
                                        {subjects.map(({ id, code, name }) => (
                                            <div key={id}>
                                                <label className="checkbox">
                                                    <input
                                                        type="checkbox"
                                                        name={id}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                id
                                                            )
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

                                <button
                                    className={`button is-success  ${
                                        isLoading ? "is-loading" : ""
                                    }`}
                                    type="submit"
                                >
                                    Add section
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SchoolYearAddSection;
