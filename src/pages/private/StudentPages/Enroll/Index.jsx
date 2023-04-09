import { useState, useEffect } from "react";
import { useUserStore } from "store/userStore";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const Enroll = () => {
    const [schoolYear, setSchoolYear] = useState(null);
    const [schoolYearId, setSchoolYearId] = useState(0);
    const [schoolYearSections, setSchoolYearSections] = useState(null);

    const [subjectsSelection, setSubjectsSelection] = useState([]);
    const [sectionsSelection, setSectionsSelection] = useState([]);

    const [selectedSubjectId, setSelectedSubjectId] = useState(0);
    const [selectedSectionId, setSelectedSectionId] = useState(0);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [isSchoolYearSectionLoading, setIsSchoolYearSectionLoading] =
        useState(true);
    const [error, setError] = useState(null);

    const { is_verified: userIsVerified } = useUserStore(state => state);

    useEffect(() => {
        const getPublishedSchoolYear = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/schoolYearPublished");
                setSchoolYear(data);
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

    const handleSYChange = id => {
        setSchoolYearId(Number(id));
    };

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

    const handleSubjectsSelectionChange = subjectId => {
        const sectionsSelection = [];

        schoolYearSections
            .filter(({ subjects: subjectsString }) => {
                const subjectIdsParsed = JSON.parse(subjectsString);
                if (subjectIdsParsed.includes(subjectId)) {
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

        setSelectedSubjectId(subjectId);
        setSectionsSelection(sectionsSelection);
    };

    const handleSectionsSelectionChange = sectionId => {
        setSelectedSectionId(sectionId);
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
                                name="courseId"
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
                                        {subjectsSelection.map(
                                            ({ id, code, name }) => {
                                                return (
                                                    <div key={id}>
                                                        <label className="radio">
                                                            <input
                                                                type="radio"
                                                                name="subject"
                                                                onChange={() =>
                                                                    handleSubjectsSelectionChange(
                                                                        id
                                                                    )
                                                                }
                                                            />{" "}
                                                            {code}: {name}
                                                        </label>
                                                    </div>
                                                );
                                            }
                                        )}
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
                                                                onChange={() =>
                                                                    handleSectionsSelectionChange(
                                                                        id
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
                                    <button className="button is-success">
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2022-2023</td>
                                        <td>2nd</td>
                                        <td>BSIT</td>
                                        <td>1IT-1</td>
                                        <td>CS101: Computer Programming 1</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <button className="button is-success">
                                Enroll
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Enroll;
