import { useEffect, useState } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import testAbi from "assets/data/test.json";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";

import http from "services/httpService";

const ViewTOR = ({ torRequestId, onDoneWrite }) => {
    const [student, setStudent] = useState({});
    const [syEnrollmentItems, setSYEnrollmentItems] = useState([]);

    const [isWriteLoading, setIsWriteLoading] = useState(false);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getGrades = async () => {
            try {
                const { data } = await http.get(
                    `/api/enrollmentItemsRPOV/${torRequestId}`
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

                    setStudent(student);
                    setSYEnrollmentItems(syEnrollmentItems);
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

    const handleWrite = async () => {
        try {
            setIsWriteLoading(true);

            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    import.meta.env.VITE_SMART_CONTRACT_1,
                    testAbi,
                    signer
                );

                const syEnrollmentItemsString =
                    JSON.stringify(syEnrollmentItems);
                const encrypted = CryptoJS.AES.encrypt(
                    syEnrollmentItemsString,
                    import.meta.env.VITE_SECRET_KEY_1
                );
                const encryptedString = encrypted.toString();

                //const userId = user.id;
                //const dataId = generateString(10, "00");
                let tx = await contract.setGradeToStudent(
                    torRequestId,
                    encryptedString
                );

                const receipt = await tx.wait();
                if (receipt.status === 1) {
                    // const blockHashItems = torRequest.block_hash
                    //     ? JSON.parse(torRequest.block_hash)
                    //     : [];
                    // blockHashItems.push({ id: torRequestId, blockHash: tx.hash });

                    await http.put(`/api/torRequestBlockHash/${torRequestId}`, {
                        block_hash: tx.hash
                    });

                    onDoneWrite();
                }
            } else {
                alert(
                    "Non-Ethereum browser detected. You should consider installing MetaMask."
                );
            }
        } catch (error) {
            console.log(error);
            alert(
                "An error occured. Please see the console for more information."
            );
        } finally {
            setIsWriteLoading(false);
        }
    };

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
                    <div>No records found.</div>
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
                        <hr />
                        <button
                            className={`button is-success  ${
                                isWriteLoading ? "is-loading" : ""
                            }`}
                            onClick={handleWrite}
                        >
                            Write to blockchain
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default ViewTOR;
