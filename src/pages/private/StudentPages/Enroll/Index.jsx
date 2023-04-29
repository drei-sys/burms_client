import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/userStore";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import http from "services/httpService";

import { sortObjectArray } from "helpers/helpers";

const Enroll = () => {
    const [schoolYear, setSchoolYear] = useState(null);
    const [schoolYearId, setSchoolYearId] = useState(0);
    const [schoolYearSections, setSchoolYearSections] = useState(null);

    const [student, setStudent] = useState(null);

    const [subjectsSelection, setSubjectsSelection] = useState([]);
    const [sectionsSelection, setSectionsSelection] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);

    const [enrollmentItems, setEnrollmentItems] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [isSchoolYearSectionLoading, setIsSchoolYearSectionLoading] =
        useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmEnroll, setIsOpenConfirmEnroll] = useState(false);
    const [isEnrollLoading, setIsEnrollLoading] = useState(false);

    const navigate = useNavigate();
    const { id: userId, status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getPublishedSchoolYear = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/schoolYearPublished");
                if (data?.year) {
                    setSchoolYear(data);
                }
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getPublishedSchoolYear();
    }, []);

    useEffect(() => {
        if (schoolYearId !== 0) {
            const getSchoolYearSection = async () => {
                try {
                    setIsSchoolYearSectionLoading(true);
                    const { data: student } = await http.get(
                        `/api/student/${userId}`
                    );
                    const { data } = await http.get(
                        `/api/schoolYearSection/${schoolYearId}`
                    );

                    const { schoolYearSections } = data;

                    const subjectsSelection = [];
                    const filteredSubjects = [];
                    let subjectIds = [];
                    schoolYearSections.forEach(schoolYearSection => {
                        const {
                            course_id,
                            subject_id,
                            subject_code,
                            subject_name,
                            subject_type,
                            subject_unit
                        } = schoolYearSection;

                        //remove major subjects from other courses.. retain minor subjects
                        if (
                            course_id === student.course_id ||
                            subject_type === "Minor"
                        ) {
                            subjectIds.push(subject_id);
                            filteredSubjects.push({
                                id: subject_id,
                                code: subject_code,
                                name: subject_name,
                                type: subject_type,
                                unit: subject_unit
                            });
                        }
                    });

                    subjectIds = [...new Set(subjectIds)];

                    subjectIds.forEach(subjectId => {
                        const subject = filteredSubjects.find(
                            ({ id }) => id === subjectId
                        );
                        subjectsSelection.push(subject);
                    });

                    setStudent(student);
                    setSchoolYearSections(schoolYearSections);
                    setSubjectsSelection(
                        sortObjectArray(subjectsSelection, "code")
                    );
                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setIsSchoolYearSectionLoading(false);
                }
            };
            getSchoolYearSection();
        }
    }, [schoolYearId]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Enroll</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (!schoolYear) {
        return (
            <>
                <h1 className="is-size-4 mb-4">Enroll</h1>
                <div className="box">
                    No ongoing enrollment as of the moment.
                </div>
            </>
        );
    }

    const handleSYChange = id => {
        setSchoolYearSections(null);

        setSubjectsSelection([]);
        setSectionsSelection([]);

        setSelectedCourse(null);
        setSelectedSubject(null);
        setSelectedSection(null);

        setEnrollmentItems([]);
        setSchoolYearId(Number(id));
    };

    const handleSubjectsSelectionChange = subject => {
        const sectionsSelection = schoolYearSections.filter(
            ({ subject_id }) => subject_id === subject.id
        );

        setSelectedSubject(subject);
        setSectionsSelection(sectionsSelection);
        setSelectedSection(null);
    };

    const handleSectionsSelectionChange = (course, section) => {
        setSelectedCourse(course);
        setSelectedSection(section);
    };

    const handleAddToEnrollment = () => {
        const subjectExist = enrollmentItems.find(
            ({ subject_id }) => subject_id === selectedSubject.id
        );

        if (subjectExist) {
            alert("Your selected subject was already on the enrollment list.");
        } else {
            setSelectedCourse(null);
            setSelectedSection(null);
            setSelectedSubject(null);

            const enrollmentItem = {
                sy_id: schoolYear.id,
                sy_year: schoolYear.year,
                sy_semester: schoolYear.semester,
                course_id: selectedCourse.id,
                course_name: selectedCourse.name,
                section_id: selectedSection.id,
                section_name: selectedSection.name,
                subject_id: selectedSubject.id,
                subject_code: selectedSubject.code,
                subject_name: selectedSubject.name,
                subject_unit: selectedSubject.unit
            };

            setEnrollmentItems([...enrollmentItems, enrollmentItem]);
        }
    };

    const handleDelete = subjectId => {
        setEnrollmentItems(
            enrollmentItems.filter(({ subject_id }) => subject_id !== subjectId)
        );
    };

    const showConfirmEnroll = () => {
        if (enrollmentItems.length === 0) {
            alert("No subjects to be enroll");
        } else {
            setIsOpenConfirmEnroll(true);
        }
    };

    const handleEnroll = async () => {
        try {
            setIsEnrollLoading(true);
            await http.post("/api/enrollment", {
                sy_id: schoolYear.id,
                status: "For Approval",
                items: enrollmentItems
            });

            navigate("/studentViewEnrollments");
        } catch (error) {
            alert(
                error?.response?.data?.message ||
                    error?.message ||
                    "Something went wrong"
            );
            console.log(error);
        } finally {
            setIsOpenConfirmEnroll(false);
            setIsEnrollLoading(false);
        }
    };

    const totalUnits = enrollmentItems.reduce(
        (acc, item) => (acc += item.subject_unit),
        0
    );

    return (
        <>
            <h1 className="is-size-4 mb-4">Enroll</h1>

            <div className="box mb-4">
                <div className="field">
                    <label className="label">Select school year</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select
                                name="syId"
                                value={schoolYearId}
                                onChange={e => handleSYChange(e.target.value)}
                            >
                                <option value={0}></option>
                                <option value={schoolYear.id}>
                                    {schoolYear.year}: {schoolYear.semester}{" "}
                                    Semester
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {schoolYearId === 0 ? (
                <div></div>
            ) : isSchoolYearSectionLoading ? (
                <div className="has-text-centered p-4">Loading...</div>
            ) : (
                <>
                    <div className="box mb-4">
                        <label className="label">Course</label>
                        <div>{student.course_name}</div>
                    </div>
                    <div className="columns">
                        <div className="column is-6">
                            <div className="box">
                                <div className="field">
                                    <label className="label">
                                        Select Subject
                                    </label>
                                    <div className="control">
                                        {subjectsSelection.map(subject => {
                                            const { id, code, name } = subject;
                                            return (
                                                <div key={id}>
                                                    <label className="radio">
                                                        <input
                                                            type="radio"
                                                            name="subject"
                                                            checked={
                                                                id ===
                                                                selectedSubject?.id
                                                            }
                                                            onChange={() =>
                                                                handleSubjectsSelectionChange(
                                                                    subject
                                                                )
                                                            }
                                                        />{" "}
                                                        {code}: {name}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-6">
                            <div className="box">
                                <div className="field">
                                    <label className="label">
                                        Select Section
                                    </label>
                                    <div className="control">
                                        {sectionsSelection.map(
                                            sectionsSelection => {
                                                const {
                                                    // course,
                                                    // section,
                                                    course_id,
                                                    course_name,
                                                    section_id,
                                                    section_name,
                                                    current_slot_count,
                                                    max_slot_count
                                                } = sectionsSelection;

                                                const course = {
                                                    id: course_id,
                                                    name: course_name
                                                };

                                                const section = {
                                                    id: section_id,
                                                    name: section_name
                                                };

                                                return (
                                                    <div key={section_id}>
                                                        <label className="radio">
                                                            <input
                                                                type="radio"
                                                                name="section"
                                                                checked={
                                                                    section_id ===
                                                                    selectedSection?.id
                                                                }
                                                                onChange={() =>
                                                                    handleSectionsSelectionChange(
                                                                        course,
                                                                        section
                                                                    )
                                                                }
                                                                disabled={
                                                                    !selectedSubject
                                                                }
                                                            />{" "}
                                                            {course_name} |{" "}
                                                            <strong>
                                                                {section_name}
                                                            </strong>{" "}
                                                            |{" "}
                                                            {current_slot_count}
                                                            /{max_slot_count}
                                                        </label>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="button is-success"
                                        disabled={!selectedSection}
                                        onClick={handleAddToEnrollment}
                                    >
                                        Add to enrollment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box mb-4">
                        <div className="field">
                            <label className="label">Enrollment details</label>
                        </div>
                        <div>
                            <table className="table " style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th>School Year</th>
                                        <th>Semester</th>
                                        <th>Course</th>
                                        <th>Section</th>
                                        <th>Subject</th>
                                        <th>Unit</th>
                                        <th style={{ width: 60 }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {enrollmentItems.map(enrollmentItem => {
                                        const {
                                            subject_id,
                                            sy_year,
                                            sy_semester,
                                            course_name,
                                            section_name,
                                            subject_code,
                                            subject_name,
                                            subject_unit
                                        } = enrollmentItem;

                                        return (
                                            <tr key={subject_id}>
                                                <td>{sy_year}</td>
                                                <td>{sy_semester}</td>
                                                <td>{course_name}</td>
                                                <td>{section_name}</td>
                                                <td>
                                                    {subject_code}:{" "}
                                                    {subject_name}
                                                </td>
                                                <td>{subject_unit}</td>
                                                <td>
                                                    <button
                                                        className="button is-danger"
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                subject_id
                                                            )
                                                        }
                                                    >
                                                        <span className="icon">
                                                            <i className="fa-solid fa-trash"></i>
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="p-4 has-text-right">
                                <span className="mr-4">
                                    {totalUnits} total units
                                </span>{" "}
                                -{" "}
                                <span className="ml-4">
                                    {enrollmentItems.length} total items
                                </span>
                            </div>
                            <hr />
                            <button
                                className="button is-success"
                                onClick={showConfirmEnroll}
                            >
                                Enroll
                            </button>
                        </div>
                    </div>
                </>
            )}

            <ConfirmModal
                title="Enroll"
                description={`Are you sure do you want to enroll the following subjects on your list?`}
                isOpen={isOpenConfirmEnroll}
                isLoading={isEnrollLoading}
                onOk={() => {
                    handleEnroll();
                }}
                onClose={() => {
                    setIsOpenConfirmEnroll(false);
                }}
            />
        </>
    );
};

export default Enroll;
