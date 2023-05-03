import { useEffect, useState } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import http from "services/httpService";

const ViewTOR = () => {
    const [torRequest, setTORRequest] = useState({});
    const [student, setStudent] = useState({});
    const [syEnrollmentItems, setSYEnrollmentItems] = useState([]);
    const [enrollmentItems, setEnrollmentItems] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getGrades = async () => {
            try {
                const { data } = await http.get(
                    `/api/enrollmentItemsRPOV/${params.id}`
                );

                const { torRequest, enrollments, enrollmentItems } = data;

                if (torRequest) {
                    const { data: student } = await http.get(
                        `/api/student/${torRequest.student_id}`
                    );

                    const { data: grades } = await http.get(
                        `/api/gradesRPOV/${torRequest.student_id}`
                    );

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

                    let syEnrollmentItems = [];
                    newEnrollmentItems.forEach(newEnrollmentItem => {
                        const { sy_id, sy_year, sy_semester } =
                            newEnrollmentItem;

                        const syEnrollmentItem = syEnrollmentItems.find(
                            ({ syId }) => syId === sy_id
                        );

                        if (syEnrollmentItem) {
                            syEnrollmentItems = syEnrollmentItems.map(
                                syEnrollmentItem => {
                                    if (syEnrollmentItem.syId === sy_id) {
                                        syEnrollmentItem.enrollmentItems.push(
                                            newEnrollmentItem
                                        );
                                        return syEnrollmentItem;
                                    }
                                    return syEnrollmentItem;
                                }
                            );
                        } else {
                            syEnrollmentItems.push({
                                syId: sy_id,
                                syYear: sy_year,
                                sySemester: sy_semester,
                                enrollmentItems: [newEnrollmentItem]
                            });
                        }
                    });

                    setTORRequest(torRequest);
                    setStudent(student);
                    setSYEnrollmentItems(syEnrollmentItems);
                    setEnrollmentItems(newEnrollmentItems);
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

        getGrades();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
            <div className="box mb-4">
                <div className="columns">
                    <div className="column is-4">
                        <div>
                            <span className="label">Student name:</span>
                        </div>
                        <div>
                            <UserName user={student} />
                        </div>
                    </div>

                    <div className="column is-4">
                        <div>
                            <span className="label">Course:</span>
                        </div>
                        <div>{student.course_name}</div>
                    </div>
                    <div className="column is-4">
                        <div>
                            <span className="label">Year level:</span>
                        </div>
                        <div>{student.year_level}</div>
                    </div>
                </div>
            </div>

            <div className="box">
                {syEnrollmentItems.length === 0 ? (
                    <>
                        <div>No records found.</div>

                        {torRequest.status === "Pending" && (
                            <>
                                <hr />
                                <button
                                    className={`button is-danger ${
                                        isRejectLoading ? "is-loading" : ""
                                    }`}
                                    onClick={() => setRejectReasonVisible(true)}
                                >
                                    Reject
                                </button>

                                {isRejectReasonVisible && (
                                    <div className="mt-4">
                                        <label className="label">
                                            Reject reason:
                                        </label>
                                        <input
                                            type="text"
                                            className="input mb-2"
                                            placeholder="Enter reject reason"
                                            value={rejectReason}
                                            onChange={e =>
                                                setRejectReason(e.target.value)
                                            }
                                        />
                                        <button
                                            className={`button is-info ${
                                                isRejectLoading
                                                    ? "is-loading"
                                                    : ""
                                            }`}
                                            onClick={handleReject}
                                        >
                                            OK
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <div>
                            {syEnrollmentItems.map(
                                ({
                                    syId,
                                    syYear,
                                    sySemester,
                                    enrollmentItems
                                }) => {
                                    return (
                                        <div key={syId}>
                                            <label className="label">
                                                {syYear}: {sySemester} Semester
                                            </label>
                                            <table className="table is-fullwidth is-hoverable">
                                                <thead>
                                                    <tr>
                                                        <th
                                                            style={{
                                                                width: 500
                                                            }}
                                                        >
                                                            Subject name
                                                        </th>
                                                        <th>Grade</th>
                                                        <th>Rating</th>
                                                        <th>Remarks</th>
                                                        <th
                                                            style={{
                                                                width: 120
                                                            }}
                                                        ></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {enrollmentItems.map(
                                                        enrollmentItem => {
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

                                                            prelim_grade =
                                                                prelim_grade ||
                                                                0;
                                                            midterm_grade =
                                                                midterm_grade ||
                                                                0;
                                                            final_grade =
                                                                final_grade ||
                                                                0;
                                                            rating =
                                                                rating || 0;
                                                            remarks =
                                                                remarks || "-";
                                                            g = g || 0;

                                                            return (
                                                                <tr
                                                                    key={
                                                                        subject_id
                                                                    }
                                                                >
                                                                    <td>
                                                                        <div>
                                                                            <span className="has-text-weight-medium">
                                                                                {
                                                                                    subject_code
                                                                                }

                                                                                :{" "}
                                                                                {
                                                                                    subject_name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </td>

                                                                    <td>{g}</td>
                                                                    <td>
                                                                        {rating}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            remarks
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {/* <button
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
                                                                    </button> */}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                            <hr />
                                        </div>
                                    );
                                }
                            )}
                        </div>

                        {torRequest.status === "Pending" && (
                            <>
                                <div>
                                    <button
                                        className="button is-success mr-1"
                                        onClick={() =>
                                            setIsOpenConfirmGenerate(true)
                                        }
                                    >
                                        Generate
                                    </button>
                                    <button
                                        className={`button is-danger ${
                                            isRejectLoading ? "is-loading" : ""
                                        }`}
                                        onClick={() =>
                                            setRejectReasonVisible(true)
                                        }
                                    >
                                        Reject
                                    </button>
                                </div>

                                {isRejectReasonVisible && (
                                    <div className="mt-4">
                                        <label className="label">
                                            Reject reason:
                                        </label>
                                        <input
                                            type="text"
                                            className="input mb-2"
                                            placeholder="Enter reject reason"
                                            value={rejectReason}
                                            onChange={e =>
                                                setRejectReason(e.target.value)
                                            }
                                        />
                                        <button
                                            className={`button is-info ${
                                                isRejectLoading
                                                    ? "is-loading"
                                                    : ""
                                            }`}
                                            onClick={handleReject}
                                        >
                                            OK
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {torRequest.status === "Approved" && (
                            <>
                                <button
                                    className="button is-success mr-1"
                                    onClick={() => handlePrint()}
                                >
                                    Print
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default ViewTOR;
