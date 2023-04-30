import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import Drawer from "components/common/Drawer";
import GradeDetails from "components/common/GradeDetails/Index";

import http from "services/httpService";

import { useUserStore } from "store/userStore";

const ViewStudentGrades = () => {
    const [student, setStudent] = useState(null);
    const [schoolYears, setSchoolYears] = useState([]);
    const [schoolYearId, setSchoolYearId] = useState(0);

    const [enrollmentItems, setEnrollmentItems] = useState([]);
    const [selectedEnrollmentItem, setSelectedEnrollmentItem] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);
    const [isGradesLoading, setIsGradesLoading] = useState(false);

    const [isOpenGradeDetails, setIsOpenGradeDetails] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const { status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getSchoolYears = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get(`/api/student/${params.id}`);
                const { data: schoolYears } = await http.get(
                    "/api/schoolYears"
                );
                if (data?.lastname) {
                    setStudent(data);
                    setSchoolYears(schoolYears);
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

        getSchoolYears();
    }, []);

    useEffect(() => {
        if (schoolYearId !== 0) {
            const getGrades = async () => {
                try {
                    setIsGradesLoading(true);

                    const { data: data1 } = await http.get(
                        `/api/enrollmentItemsSPOV/${schoolYearId}/${params.id}`
                    );
                    const { data: grades } = await http.get(
                        `/api/gradesSPOV/${schoolYearId}/${params.id}`
                    );

                    const { enrollment, enrollmentItems } = data1;

                    const newEnrollmentItems = enrollmentItems.map(
                        enrollmentItem => {
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

                            const newEnrollmentItem = {
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

                            const {
                                sy_id: syId,
                                student_id: studentId,
                                subject_id: subjectId
                            } = newEnrollmentItem;

                            const grade = grades.find(
                                ({ sy_id, student_id, subject_id }) =>
                                    sy_id === syId &&
                                    student_id === studentId &&
                                    subject_id === subjectId
                            );

                            return {
                                ...newEnrollmentItem,
                                grade
                            };
                        }
                    );

                    setEnrollmentItems(newEnrollmentItems);
                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setIsGradesLoading(false);
                }
            };

            getGrades();
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
                <h1 className="is-size-4 mb-4">Student Grade</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (userStatus === "Rejected") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Student Grade</h1>
                <div className="notification is-danger my-4">
                    Your account has been rejected.
                </div>
            </>
        );
    }

    if (isNotExist) {
        return <div className="has-text-centered mt-6">Student not found.</div>;
    }

    const handleSYChange = syId => {
        setSchoolYearId(syId);
    };

    const showGradeDetails = enrollmentItem => {
        setSelectedEnrollmentItem(enrollmentItem);
        setIsOpenGradeDetails(true);
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/students")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Student Grade
            </h1>

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
            ) : isGradesLoading ? (
                <div className="has-text-centered p-4">Loading...</div>
            ) : (
                <div className="box">
                    {enrollmentItems.length === 0 ? (
                        <>No records found.</>
                    ) : (
                        <table className="table is-fullwidth is-hoverable">
                            <thead>
                                <tr>
                                    <th>Subject name</th>
                                    <th>Grade</th>
                                    <th>Rating</th>
                                    <th>Remarks</th>
                                    <th style={{ width: 120 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollmentItems.map(enrollmentItem => {
                                    const {
                                        subject_id,
                                        subject_code,
                                        subject_name,
                                        grade
                                    } = enrollmentItem;

                                    let {
                                        prelim_grade,
                                        midterm_grade,
                                        final_grade,
                                        grade: g,
                                        rating,
                                        remarks
                                    } = grade || {};

                                    prelim_grade = prelim_grade || 0;
                                    midterm_grade = midterm_grade || 0;
                                    final_grade = final_grade || 0;
                                    rating = rating || 0;
                                    remarks = remarks || "-";
                                    g = g || 0;

                                    return (
                                        <tr key={subject_id}>
                                            <td>
                                                <div>
                                                    <span className="has-text-weight-medium">
                                                        {subject_code}:{" "}
                                                        {subject_name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td>{g}</td>
                                            <td>{rating}</td>
                                            <td>{remarks}</td>
                                            <td>
                                                <button
                                                    className="button"
                                                    title="View Grade"
                                                    onClick={() =>
                                                        showGradeDetails(
                                                            enrollmentItem
                                                        )
                                                    }
                                                >
                                                    <span className="icon">
                                                        <i className="fa-solid fa-eye"></i>
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {isOpenGradeDetails && (
                <Drawer
                    title="Input Grades"
                    isOpen={isOpenGradeDetails}
                    onOk={() => setIsOpenGradeDetails(false)}
                    onClose={() => setIsOpenGradeDetails(false)}
                    content={
                        <GradeDetails
                            teacherId={null}
                            enrollmentItem={selectedEnrollmentItem}
                            readOnly={true}
                            onRefetch={() => console.log("refetch")}
                        />
                    }
                />
            )}
        </>
    );
};

export default ViewStudentGrades;
