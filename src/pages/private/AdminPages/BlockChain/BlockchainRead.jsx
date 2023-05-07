import React, { useEffect, useState } from "react";
import testAbi from "assets/data/test.json";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";

import StudentDetails from "components/common/StudentDetails";
import NonTeachingDetails from "components/common/NonTeachingDetails";

const BlockchainRead = () => {
    const [userType, setUserType] = useState("Student");
    const [userId, setUserId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState(null);

    const handleSelectChange = e => {
        const value = e.target.value;
        setUserType(value);
    };

    const handleInputChange = e => {
        const value = e.target.value;
        setUserId(value);
    };

    const handleGet = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                setIsLoading(true);
                const provider = new ethers.providers.Web3Provider(ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    import.meta.env.VITE_SMART_CONTRACT_1,
                    testAbi,
                    signer
                );
                console.log("checking namespace..");

                let fetchedData = "";
                if (userType === "Student") {
                    fetchedData = await contract.getInfoToStudId(userId);
                } else if (userType === "Teacher") {
                    fetchedData = await contract.getInfoToProfId(userId);
                } else if (userType === "Non Teaching") {
                    fetchedData = await contract.getInfoToNontId(userId);
                } else if (userType === "Registrar") {
                    fetchedData = await contract.getInfoToRegId(userId);
                } else if (userType === "Dean") {
                    fetchedData = await contract.getInfoToDeanId(userId);
                } else if (userType === "DeptChair") {
                    fetchedData = await contract.getInfoToDeptId(userId);
                }

                if (fetchedData) {
                    const decrypted = CryptoJS.AES.decrypt(
                        fetchedData,
                        import.meta.env.VITE_SECRET_KEY_1
                    );
                    let data = CryptoJS.enc.Utf8.stringify(decrypted);
                    data = JSON.parse(data);
                    setData(data);
                } else {
                    console.log("Empty data");
                    setData(null);
                }
            } else {
                alert(
                    "Non-Ethereum browser detected. You should consider installing MetaMask."
                );
            }
        } catch (error) {
            console.log(error);
            setIsError(true);
        } finally {
            setIsError(false);
            setIsLoading(false);
        }
    };

    return (
        <div className="box">
            <div className="mb-4">
                <label className="label">Select user type:</label>
                <div className="select is-fullwidth mb-2">
                    <select onChange={handleSelectChange}>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Non Teaching">Non Teaching</option>
                        <option value="Registrar">Registrar</option>
                        <option value="Dean">Dean</option>
                        <option value="DeptChair">Department Chair</option>
                    </select>
                </div>
                <label className="label">Input user id:</label>
                <div className="mb-2">
                    <input
                        type="number"
                        className="input"
                        value={userId}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    className={`button is-success  ${
                        isLoading ? "is-loading" : ""
                    }`}
                    disabled={isLoading}
                    onClick={handleGet}
                >
                    Get
                </button>
            </div>

            <hr />

            <label className="label">User Details</label>
            <div>
                {isLoading ? (
                    <>Loading...</>
                ) : isError ? (
                    <>An error occured.</>
                ) : !data ? (
                    <>User not found.</>
                ) : data.user_type === "Student" ? (
                    <StudentDetails data={data} />
                ) : data.user_type !== "Student" ? (
                    <NonTeachingDetails data={data} />
                ) : (
                    <>Something went wrong!</>
                )}
            </div>
        </div>
    );
};

export default BlockchainRead;
