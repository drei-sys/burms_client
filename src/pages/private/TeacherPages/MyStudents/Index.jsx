import { useState, useEffect } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import http from "services/httpService";

import { useUserStore } from "store/userStore";

const MyStudents = () => {
    const [schoolYears, setSchoolYears] = useState([]);
    const [schoolYearId, setSchoolYearId] = useState(0);

    const [subjectsSelection, setSubjectsSelection] = useState([]);
    const [sectionsSelection, setSectionsSelection] = useState([]);

    const [selectedSubjectId, setSelectedSubjectId] = useState(0);
    const [selectedSectionId, setSelectedSectionId] = useState(0);

    const [enrollmentItems, setEnrollmentItems] = useState([]);
    const [filteredEnrollmentItems, setFilteredEnrollmentItems] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isStudentsLoading, setIsStudentsLoading] = useState(false);

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
            const getStudents = async () => {
                try {
                    setIsStudentsLoading(true);
                    const { data } = await http.get(
                        `/api/enrollmentItemsTPOV/${schoolYearId}/${userId}`
                    );

                    const {
                        teacherSubjectItems,
                        enrollments,
                        enrollmentItems
                    } = data;

                    const newEnrollmentItems = enrollmentItems.map(
                        enrollmentItem => {
                            const enrollment = enrollments.find(
                                ({ id }) => id === enrollmentItem.enrollment_id
                            );
                            const {
                                sy_id,
                                sy_semester,
                                sy_year,
                                student_id,
                                student_lastname,
                                student_firstname,
                                student_middlename,
                                student_extname,
                                student_course_id,
                                student_course_name,
                                student_user_type
                            } = enrollment;
                            return {
                                ...enrollmentItem,
                                sy_id,
                                sy_semester,
                                sy_year,
                                student_id,
                                student_lastname,
                                student_firstname,
                                student_middlename,
                                student_extname,
                                student_course_id,
                                student_course_name,
                                student_user_type
                            };
                        }
                    );

                    setSubjectsSelection(teacherSubjectItems);
                    setEnrollmentItems(newEnrollmentItems);
                    setFilteredEnrollmentItems(newEnrollmentItems);
                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setIsStudentsLoading(false);
                }
            };

            getStudents();
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
                <h1 className="is-size-4 mb-4">My Students</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (userStatus === "Rejected") {
        return (
            <>
                <h1 className="is-size-4 mb-4">My Students</h1>
                <div className="notification is-danger my-4">
                    Your account has been rejected.
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredEnrollmentItems.map(
                                                ({
                                                    student_id,
                                                    student_lastname,
                                                    student_firstname,
                                                    student_middlename,
                                                    student_extname,
                                                    student_course_name
                                                }) => {
                                                    return (
                                                        <tr key={student_id}>
                                                            <td>
                                                                <div>
                                                                    <span className="has-text-weight-medium">
                                                                        <UserName
                                                                            user={{
                                                                                lastname:
                                                                                    student_lastname,
                                                                                firstname:
                                                                                    student_firstname,
                                                                                middlename:
                                                                                    student_middlename,
                                                                                extname:
                                                                                    student_extname
                                                                            }}
                                                                        />
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <span className="is-size-6">
                                                                        {
                                                                            student_course_name
                                                                        }
                                                                    </span>
                                                                </div>
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
        </>
    );
};

export default MyStudents;
