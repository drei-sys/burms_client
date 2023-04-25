import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";
import ConfirmModal from "components/common/ConfirmModal";

import http from "services/httpService";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ViewGrades = () => {
    const [torRequest, setTORRequest] = useState({});
    const [student, setStudent] = useState({});
    const [syEnrollmentItems, setSYEnrollmentItems] = useState([]);
    const [enrollmentItems, setEnrollmentItems] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const [isOpenConfirmGenerate, setIsOpenConfirmGenerate] = useState(false);
    const [isGenerateLoading, setIsGenerateLoading] = useState(false);

    const [isRejectLoading, setIsRejectLoading] = useState(false);

    const [isRejectReasonVisible, setRejectReasonVisible] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    useEffect(() => {
        const getGrades = async () => {
            try {
                const { data } = await http.get(
                    `/api/registrarStudentGrades/${params.id}/${params.studentId}`
                );

                const {
                    torRequest,
                    student,
                    enrollmentItems,
                    courses,
                    grades
                } = data;

                if (student && torRequest) {
                    const newEnrollmentItems = enrollmentItems.map(
                        enrollmentItem => {
                            const {
                                sy_id: syId,
                                student_id: studentId,
                                subject_id: subjectId,
                                student_course_id
                            } = enrollmentItem;

                            const grade = grades.find(
                                ({ sy_id, student_id, subject_id }) =>
                                    sy_id === syId &&
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
                                        return {
                                            ...syEnrollmentItem,
                                            enrollmentItems: [
                                                ...syEnrollmentItem.enrollmentItems,
                                                newEnrollmentItem
                                            ]
                                        };
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

    if (isNotExist) {
        return <div className="has-text-centered mt-6">Not found.</div>;
    }

    const handleGenerate = async () => {
        try {
            setIsGenerateLoading(true);

            await http.post(`/api/torItem`, {
                torRequestId: params.id,
                enrollmentItems
            });

            navigate("/registrarTORRequests");
        } catch (error) {
            console.log(error);
            alert(
                "An error occured while approving the enrollment. Please try again."
            );
        } finally {
            setIsOpenConfirmGenerate(false);
            setIsGenerateLoading(false);
        }
    };

    const handleReject = async () => {
        try {
            setIsRejectLoading(true);

            await http.put(`/api/rejectTORRequest/${params.id}`, {
                rejectReason: rejectReason || "-"
            });

            navigate("/registrarTORRequests");
        } catch (error) {
            console.log(error);
            alert(
                "An error occured while approving the enrollment. Please try again."
            );
        } finally {
            setIsRejectLoading(false);
        }
    };

    const handlePrint = () => {
        const content = [];
        //console.log(syEnrollmentItems);

        // const contentBody = [
        //     [
        //         {
        //             text: "Republic of the Philippines",
        //             alignment: "center",
        //             bold: true
        //         }
        //     ]
        // ];
        const contentBody = [];

        content.push([
            {
                text: "Republic of the Philippines",
                alignment: "center"
            },
            {
                text: "Pamantasan ng Cabuyao",
                alignment: "center",
                bold: true,
                fontSize: 15
            },
            {
                text: "Katapatan Homes, Banay-banay, City of Cabuyao, Laguna 4025",
                alignment: "center"
            },
            {
                text: "Tel. # (049) 502-5884",
                alignment: "center"
            },
            {
                text: "www.pnc.edu.ph",
                alignment: "center"
            },
            "\n",
            "\n",
            {
                text: "OFFICE OF THE UNIVERSITY REGISTRAR",
                alignment: "center",
                bold: true,
                fontSize: 11
            },
            {
                text: "OFFICIAL TRANSCRIPT OF RECORDS",
                alignment: "center",
                bold: true,
                fontSize: 11
            },
            "\n",
            "\n"
        ]);

        const {
            lastname,
            firstname,
            middlename,
            extname,
            address,
            course_name
        } = student;

        content.push({
            table: {
                widths: [289, 198],
                body: [
                    [
                        {
                            text: `Name: ${lastname}, ${firstname} ${middlename} ${extname}`,
                            bold: true
                        },
                        { text: `Program: ${course_name}`, bold: true }
                    ],
                    [{ text: `Address: ${address}`, bold: true }, { text: "" }]
                ]
            }
        });

        content.push("\n");

        content.push({
            text: `ATTACHED CERTIFIED PHOTOCOPY OF THE ORIGINAL TRANSCRIPT OF RECORDS FROM PREVIOUS SCHOOL: NO`,
            bold: false,
            fontSize: 9
        });

        contentBody.push([
            { text: "Subject Code", bold: true },
            { text: "Descriptive Title", bold: true },
            { text: "Rating", bold: true },
            { text: "Credits", bold: true },
            { text: "Completion Grade", bold: true }
        ]);

        syEnrollmentItems.forEach(syEnrollmentItem => {
            const { syYear, sySemester, enrollmentItems } = syEnrollmentItem;

            contentBody.push([
                "",
                { text: `${sySemester} semester: ${syYear}`, bold: true },
                "",
                "",
                ""
            ]);
            enrollmentItems.forEach(enrollmentItem => {
                const { subject_code, subject_name, grade: g } = enrollmentItem;
                let { equivalent, remarks, grade } = g || {};

                equivalent = equivalent || 0;
                remarks = remarks || "-";
                grade = grade || 0;

                contentBody.push([
                    { text: `${subject_code}`, bold: true },
                    { text: `${subject_name}` },
                    { text: equivalent, bold: true },
                    { text: remarks, bold: true },
                    { text: "", bold: true }
                ]);
            });

            // content.push({
            //     text: "This paragraph will have a bigger font",
            //     alignment: "center",
            //     fontSize: 15
            // });
        });

        content.push({
            table: {
                widths: [60, 220, 50, 50, 80],
                body: contentBody
            }
        });

        content.push("\n");
        content.push("\n");
        content.push({
            text: "GRADING SYSTEM",
            alignment: "center"
        });
        content.push("\n");

        content.push({
            table: {
                widths: [75, 75, 75, 75, 75, 75],
                body: [
                    [
                        "1.00 = 96-100%",
                        "1.25 = 92-95%",
                        "1.50 = 88-91%",
                        "1.75 = 84-87%",
                        "2.00 = 80-83%",
                        "2.25 = 75-75%"
                    ],
                    [
                        "2.25 = 70-74%",
                        "2.75 = 65-69%",
                        "3.00 = 60-64%",
                        "5.00 = 0-59%",
                        "e",
                        "f"
                    ]
                ]
            }
        });

        pdfMake
            .createPdf({
                content,
                defaultStyle: {
                    fontSize: 10
                }
                //pageMargins: [40, 29, 40, 29]
            })
            .open();
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">
                {" "}
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/registrarTORRequests")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Student Grade
            </h1>

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
                    <>No records found.</>
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
                                                        <th>Subject name</th>
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
                                                                equivalent,
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
                                                            equivalent =
                                                                equivalent || 0;
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
                                                                        {
                                                                            equivalent
                                                                        }
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

            <ConfirmModal
                title="Confirm Generate"
                description={`Are you sure do you want to generate this TOR?`}
                isOpen={isOpenConfirmGenerate}
                isLoading={isGenerateLoading}
                onOk={() => {
                    handleGenerate();
                }}
                onClose={() => {
                    setIsOpenConfirmGenerate(false);
                }}
            />
        </>
    );
};

export default ViewGrades;