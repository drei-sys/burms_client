import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import testAbi from "assets/data/test2.json";
import { ethers } from "ethers";

import { useUserStore } from "store/userStore";

import { generateString } from "helpers/helpers";

import http from "services/httpService";

const UploadDigitalizedFile = () => {
    const [students, setStudents] = useState([]);

    const [formData, setFormData] = useState({
        studentId: 0,
        description: "",
        file: null
    });
    const [formError, setFormError] = useState({
        studentId: "",
        file: ""
    });

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getStudents = async () => {
            try {
                setIsContentLoading(true);

                const { data: students } = await http.get("/api/students");

                setStudents(students);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getStudents();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Upload Digitalized File</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (userStatus === "Rejected") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Upload Digitalized File</h1>
                <div className="notification is-danger my-4">
                    Your account has been rejected.
                </div>
            </>
        );
    }

    const handleInputChange = e => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: "" });
    };

    const handleInputFileChange = e => {
        setFormData({
            ...formData,
            file: e.target.files[0]
        });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        const { studentId, description, file } = formData;

        let hasError = false;
        const formError = {
            studentId: "",
            file: ""
        };

        if (studentId === 0) {
            formError.studentId = "Student is required";
            hasError = true;
        }

        if (!file) {
            formError.file = "File is required";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
        } else {
            try {
                setFormError({
                    studentId: "",
                    file: ""
                });
                setIsLoading(true);

                //upload to nft.storage
                const formData = new FormData();
                formData.append("file", file);
                const response = await fetch(
                    import.meta.env.VITE_NFT_STORAGE_UPLOAD_URL,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `bearer ${
                                import.meta.env.VITE_NFT_STORAGE_KEY
                            }`
                        },
                        body: formData
                    }
                );
                const { value } = await response.json();
                const CID = value.cid;

                //write to polygon
                const { ethereum } = window;
                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(
                        ethereum
                    );
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(
                        import.meta.env.VITE_SMART_CONTRACT_2,
                        testAbi,
                        signer
                    );

                    const dataId = generateString(10, "00");
                    let tx = await contract.setDocsToBlock(dataId, CID);

                    const receipt = await tx.wait();
                    if (receipt.status === 1) {
                        await http.post(`/api/blockchainUploadFile/`, {
                            student_id: Number(studentId),
                            filename: file.name,
                            description: description || "",
                            category: "Digitalized File",
                            pid: dataId,
                            block_hash: tx.hash
                        });

                        navigate("/digitalizedFiles");
                    }
                } else {
                    alert(
                        "Non-Ethereum browser detected. You should consider installing MetaMask."
                    );
                }
            } catch (error) {
                setFormError({
                    ...formError,
                    ...(error?.response?.data?.errors || {
                        file: "Something went wrong!"
                    })
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/digitalizedFiles")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Upload Digitalized File
            </h1>
            <div className="columns">
                <div className="column">
                    <div className="box">
                        <form onSubmit={handleFormSubmit}>
                            <div className="field">
                                <label className="label">Student</label>
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            name="studentId"
                                            value={formData.studentId}
                                            onChange={handleInputChange}
                                        >
                                            <option value={0}></option>
                                            {students.map(student => {
                                                const {
                                                    id,
                                                    course_name,
                                                    year_level
                                                } = student;
                                                return (
                                                    <option key={id} value={id}>
                                                        <UserName
                                                            user={student}
                                                        />{" "}
                                                        &ndash; {course_name}{" "}
                                                        &ndash; {year_level}{" "}
                                                        year
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                {formError.studentId && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.studentId}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="field">
                                <label className="label">
                                    Upload description
                                </label>
                                <div className="control">
                                    <input
                                        name="description"
                                        className="input"
                                        type="text"
                                        placeholder="Enter upload description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {formError.description && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.description}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="field">
                                <label className="label">Select file</label>
                                <div className="control">
                                    <input
                                        name="file"
                                        className="input"
                                        type="file"
                                        //value={formData.file}
                                        onChange={handleInputFileChange}
                                    />
                                </div>
                                {formError.file && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.file}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <button
                                className={`button is-success  ${
                                    isLoading ? "is-loading" : ""
                                }`}
                                type="submit"
                            >
                                Upload file
                            </button>{" "}
                            <div>
                                {isLoading &&
                                    "Uploading to blockchain... Please wait."}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default UploadDigitalizedFile;
