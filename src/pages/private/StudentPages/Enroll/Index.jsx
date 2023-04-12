import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/userStore";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import http from "services/httpService";

const Enroll = () => {
    const [schoolYear, setSchoolYear] = useState(null);
    const [schoolYearId, setSchoolYearId] = useState(0);
    const [schoolYearSections, setSchoolYearSections] = useState(null);

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
    const { is_verified: userIsVerified } = useUserStore(state => state);

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
                    const { data } = await http.get(
                        `/api/schoolYearSection/${schoolYearId}`
                    );

                    const {
                        courses: coursesList,
                        sections: sectionList,
                        subjects: subjectList
                    } = data;
                    let { schoolYearSections } = data;

                    schoolYearSections = schoolYearSections.map(
                        schoolYearSection => {
                            const { course_id, section_id } = schoolYearSection;
                            const course = coursesList.find(
                                ({ id }) => id === course_id
                            );
                            const section = sectionList.find(
                                ({ id }) => id === section_id
                            );
                            return {
                                ...schoolYearSection,
                                course,
                                section
                            };
                        }
                    );

                    const subjectsSelection = [];
                    let subjectIds = [];
                    schoolYearSections.forEach(schoolYearSection => {
                        const { subjects: subjectsString } = schoolYearSection;

                        const subjectIdsParsed = JSON.parse(subjectsString);
                        subjectIdsParsed.forEach(subjectId => {
                            subjectIds.push(subjectId);
                        });
                    });

                    subjectIds = [...new Set(subjectIds)];

                    subjectIds.forEach(subjectId => {
                        const subject = subjectList.find(
                            ({ id }) => id === subjectId
                        );
                        subjectsSelection.push(subject);
                    });

                    setSubjectsSelection(subjectsSelection);
                    setSchoolYearSections(schoolYearSections);
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

    if (!userIsVerified) {
        return (
            <>
                <h1 className="is-size-4 mb-5">Enroll</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (!schoolYear) {
        return (
            <>
                <h1 className="is-size-4 mb-5">Enroll</h1>
                <div className="box">
                    No ongoing enrollment as of the moment.
                </div>
            </>
        );
    }

    const semesters = {
        1: "1st",
        2: "2nd"
    };

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
        const sectionsSelection = [];

        schoolYearSections
            .filter(({ subjects: subjectsString }) => {
                const subjectIdsParsed = JSON.parse(subjectsString);
                if (subjectIdsParsed.includes(subject.id)) {
                    return true;
                }

                return false;
            })
            .forEach(({ course, section, ...props }) => {
                sectionsSelection.push({
                    ...props,
                    course,
                    section
                });
            });

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
                sy_semester: semesters[schoolYear.semester],
                course_id: selectedCourse.id,
                course_name: selectedCourse.name,
                section_id: selectedSection.id,
                section_name: selectedSection.name,
                subject_id: selectedSubject.id,
                subject_code: selectedSubject.code,
                subject_name: selectedSubject.name
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
                status: "for_approval",
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

    return (
        <>
            <h1 className="is-size-4 mb-5">Enroll</h1>

            <div className="box mb-4">
                <div className="field">
                    <label className="label">Select SY</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select
                                name="syId"
                                value={schoolYearId}
                                onChange={e => handleSYChange(e.target.value)}
                            >
                                <option value={0}></option>
                                <option value={schoolYear.id}>
                                    {schoolYear.year}:{" "}
                                    {semesters[schoolYear.semester]} Semester
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {schoolYearId === 0 ? (
                <div></div>
            ) : isSchoolYearSectionLoading ? (
                <div className="has-text-centered p-5">Loading...</div>
            ) : (
                <>
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
                                                    course,
                                                    section,
                                                    current_slot_count,
                                                    max_slot_count
                                                } = sectionsSelection;
                                                const { id, name } = section;

                                                return (
                                                    <div key={id}>
                                                        <label className="radio">
                                                            <input
                                                                type="radio"
                                                                name="section"
                                                                checked={
                                                                    id ===
                                                                    selectedSection?.id
                                                                }
                                                                onChange={() =>
                                                                    handleSectionsSelectionChange(
                                                                        course,
                                                                        section
                                                                    )
                                                                }
                                                            />{" "}
                                                            {course.name} |{" "}
                                                            {name} |{" "}
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
                                            subject_name
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
