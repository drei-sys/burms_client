import { useState, useEffect } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";
import Drawer from "components/common/Drawer";
import GradeDetails from "components/common/GradeDetails/Index";

import http from "services/httpService";

import { useUserStore } from "store/userStore";

const InputGrade = () => {
    const [refetchTeacherStudents, setRefetchTeacherStudents] = useState(0);

    const [schoolYears, setSchoolYears] = useState([]);
    const [schoolYearId, setSchoolYearId] = useState(0);

    const [subjectsSelection, setSubjectsSelection] = useState([]);
    const [coursesSelection, setCoursesSelection] = useState([]);
    const [sectionsSelection, setSectionsSelection] = useState([]);

    const [selectedSubjectId, setSelectedSubjectId] = useState(0);
    const [selectedCourseId, setSelectedCourseId] = useState(0);
    const [selectedSectionId, setSelectedSectionId] = useState(0);

    const [enrollmentItems, setEnrollmentItems] = useState([]);
    const [filteredEnrollmentItems, setFilteredEnrollmentItems] = useState([]);

    const [selectedEnrollmentItem, setSelectedEnrollmentItem] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isStudentsLoading, setIsStudentsLoading] = useState(false);

    const [isOpenGradeDetails, setIsOpenGradeDetails] = useState(false);

    const { id: userId, status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getSchoolYears = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/schoolYears");
                setSchoolYears(data);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getSchoolYears();
    }, []);

    useEffect(() => {
        if (schoolYearId !== 0) {
            const getTeacherStudents = async () => {
                try {
                    setIsStudentsLoading(true);
                    const { data } = await http.get(
                        `/api/teacherStudents/${schoolYearId}/${userId}`
                    );

                    const {
                        teacherSubjectItems,
                        enrollmentItems,
                        courses,
                        grades
                    } = data;

                    const newFilteredenrollmentItems = enrollmentItems.map(
                        enrollmentItem => {
                            const {
                                student_id: studentId,
                                subject_id: subjectId,
                                student_course_id
                            } = enrollmentItem;

                            const grade = grades.find(
                                ({ student_id, subject_id }) =>
                                    student_id === studentId &&
                                    subject_id === subjectId
                            );

                            const student_course_name = courses.find(
                                ({ id }) => id === student_course_id
                            ).name;

                            return {
                                ...enrollmentItem,
                                student_course_name,
                                grade
                            };
                        }
                    );

                    const filteredEnrollmentItems = newFilteredenrollmentItems
                        .filter(
                            ({ subject_id }) =>
                                subject_id === selectedSubjectId ||
                                selectedSubjectId === 0
                        )
                        .filter(
                            ({ section_id }) =>
                                section_id === selectedSectionId ||
                                selectedSectionId === 0
                        );

                    setSubjectsSelection(teacherSubjectItems);
                    setEnrollmentItems(newFilteredenrollmentItems);
                    setFilteredEnrollmentItems(filteredEnrollmentItems);
                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setIsStudentsLoading(false);
                }
            };

            getTeacherStudents();
        }
    }, [schoolYearId, refetchTeacherStudents]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Input Grade</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    const handleSYChange = syId => {
        setSchoolYearId(syId);
        setSelectedSubjectId(0);
        setSelectedSectionId(0);
    };

    const handleSubjectChange = subjectId => {
        const filteredEnrollmentItems = enrollmentItems.filter(
            ({ subject_id }) => subject_id === subjectId
        );

        const sectionsSelection = [];

        enrollmentItems
            .filter(({ subject_id }) => subject_id === subjectId)
            .forEach(enrollmentItem => {
                const { section_id, section_name } = enrollmentItem;

                const section = sectionsSelection.find(
                    ({ section_id: sectionId }) => sectionId === section_id
                );

                if (!section) {
                    sectionsSelection.push({
                        section_id,
                        section_name
                    });
                }
            });

        setSelectedSubjectId(subjectId);
        setSelectedSectionId(0);
        setSectionsSelection(sectionsSelection);
        setFilteredEnrollmentItems(filteredEnrollmentItems);
    };

    const handleSectionChange = sectionId => {
        const filteredEnrollmentItems = enrollmentItems
            .filter(({ subject_id }) => subject_id === selectedSubjectId)
            .filter(
                ({ section_id }) => section_id === sectionId || sectionId === 0
            );
        setSelectedSectionId(sectionId);
        setFilteredEnrollmentItems(filteredEnrollmentItems);
    };

    const handleGradingDetailsRefetch = () => {
        setIsOpenGradeDetails(false);
        setRefetchTeacherStudents(Math.random());
    };

    const showGradeDetails = enrollmentItem => {
        setSelectedEnrollmentItem(enrollmentItem);
        setIsOpenGradeDetails(true);
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">My Students</h1>

            <div className="box mb-4">
                <label className="label">Select school year</label>
                <div className="select is-fullwidth">
                    <select
                        value={schoolYearId}
                        onChange={e => handleSYChange(Number(e.target.value))}
                    >
                        <option value={0}></option>
                        {schoolYears.map(({ id, year, semester }) => (
                            <option key={id} value={id}>
                                {year}: {semester} Semester
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {schoolYearId === 0 ? (
                <div></div>
            ) : isStudentsLoading ? (
                <div className="has-text-centered p-4">Loading...</div>
            ) : subjectsSelection.length === 0 ? (
                <div className="box">
                    No subject(s) assigned for you as of now.
                </div>
            ) : (
                <>
                    <div className="box mb-4">
                        <label className="label">Select subject</label>
                        <div className="select is-fullwidth">
                            <select
                                value={selectedSubjectId}
                                onChange={e =>
                                    handleSubjectChange(Number(e.target.value))
                                }
                            >
                                <option value={0}></option>
                                {subjectsSelection.map(
                                    ({ subject_id, code, name }) => (
                                        <option
                                            key={subject_id}
                                            value={subject_id}
                                        >
                                            {code}: {name}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                    </div>

                    {selectedSubjectId !== 0 && (
                        <>
                            <div className="box mb-4">
                                <div className="is-size-5 mb-2">Filters</div>

                                <label className="label">Select section</label>

                                <div className="select is-fullwidth">
                                    <select
                                        value={selectedSectionId}
                                        onChange={e =>
                                            handleSectionChange(
                                                Number(e.target.value)
                                            )
                                        }
                                    >
                                        <option value={0}></option>
                                        {sectionsSelection.map(
                                            ({ section_id, section_name }) => (
                                                <option
                                                    key={section_id}
                                                    value={section_id}
                                                >
                                                    {section_name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="box">
                                {filteredEnrollmentItems.length === 0 ? (
                                    <div className="box">
                                        No students found.
                                    </div>
                                ) : (
                                    <table className="table is-fullwidth is-hoverable">
                                        <thead>
                                            <tr>
                                                <th>Student name</th>
                                                <th>Prelim Grade</th>
                                                <th>Midterm Grade</th>
                                                <th>Final Grade</th>
                                                <th>Grade</th>
                                                <th style={{ width: 120 }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredEnrollmentItems.map(
                                                enrollmentItem => {
                                                    const {
                                                        student_id,
                                                        user_type,
                                                        grade
                                                    } = enrollmentItem;

                                                    let {
                                                        prelim_grade,
                                                        midterm_grade,
                                                        final_grade,
                                                        grade: g
                                                    } = grade || {};

                                                    prelim_grade =
                                                        prelim_grade || 0;
                                                    midterm_grade =
                                                        midterm_grade || 0;
                                                    final_grade =
                                                        final_grade || 0;
                                                    g = g || 0;

                                                    return (
                                                        <tr key={student_id}>
                                                            <td>
                                                                <div>
                                                                    <span className="has-text-weight-medium">
                                                                        <UserName
                                                                            user={
                                                                                enrollmentItem
                                                                            }
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <span className="is-size-6">
                                                                        {
                                                                            user_type
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {prelim_grade}
                                                            </td>
                                                            <td>
                                                                {midterm_grade}
                                                            </td>
                                                            <td>
                                                                {final_grade}
                                                            </td>
                                                            <td>{g}</td>
                                                            <td>
                                                                <button
                                                                    className="button is-success"
                                                                    title="Input Grade"
                                                                    onClick={() =>
                                                                        showGradeDetails(
                                                                            enrollmentItem
                                                                        )
                                                                    }
                                                                >
                                                                    <span className="icon">
                                                                        <i className="fa-solid fa-calculator"></i>
                                                                    </span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </>
                    )}
                </>
            )}

            {isOpenGradeDetails && (
                <Drawer
                    title="Input Grades"
                    isOpen={isOpenGradeDetails}
                    onOk={() => setIsOpenGradeDetails(false)}
                    onClose={() => setIsOpenGradeDetails(false)}
                    content={
                        <GradeDetails
                            teacherId={userId}
                            enrollmentItem={selectedEnrollmentItem}
                            readOnly={false}
                            onRefetch={handleGradingDetailsRefetch}
                        />
                    }
                />
            )}
        </>
    );
};

export default InputGrade;
