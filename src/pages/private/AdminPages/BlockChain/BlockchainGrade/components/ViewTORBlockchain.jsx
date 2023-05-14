import { useEffect, useState } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import testAbi from "assets/data/test.json";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";

import http from "services/httpService";

const ViewTORBlockchain = ({ torRequestId, hashId }) => {
    const [student, setStudent] = useState({});
    const [syEnrollmentItems, setSYEnrollmentItems] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getGradesBlockchain = async () => {
            const { data: torRequest } = await http.get(
                `/api/torRequest/${torRequestId}`
            );

            const { data: student } = await http.get(
                `/api/student/${torRequest.student_id}`
            );

            try {
                const { ethereum } = window;
                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(
                        ethereum
                    );
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(
                        import.meta.env.VITE_SMART_CONTRACT_1,
                        testAbi,
                        signer
                    );

                    const fetchedData = await contract.getGradeToStudent(
                        hashId
                    );

                    if (fetchedData) {
                        const decrypted = CryptoJS.AES.decrypt(
                            fetchedData,
                            import.meta.env.VITE_SECRET_KEY_1
                        );
                        let data = CryptoJS.enc.Utf8.stringify(decrypted);
                        data = JSON.parse(data);

                        setStudent(student);
                        setSYEnrollmentItems(data);
                    }
                } else {
                    alert(
                        "Non-Ethereum browser detected. You should consider installing MetaMask."
                    );
                }
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getGradesBlockchain();
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
                                            <div className="table-container">
                                                <table
                                                    className="table is-fullwidth is-hoverable"
                                                    style={{
                                                        whiteSpace: "nowrap"
                                                    }}
                                                >
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
                                                                } =
                                                                    enrollmentItem;

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
                                                                    remarks ||
                                                                    "-";
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

                                                                        <td>
                                                                            {g}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                rating
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
                                            </div>
                                            <hr />
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        <hr />
                    </>
                )}
            </div>
        </>
    );
};

export default ViewTORBlockchain;
