import React, { useEffect, useState } from "react";
import testAbi from "assets/data/test.json";
import { ethers } from "ethers";

import CryptoJS from "crypto-js";

const ReadBlockchain = () => {
    const [userType, setUserType] = useState("Student");
    const [userId, setUserId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState("");

    const handleSelectChange = e => {
        const value = e.target.value;
        setUserType(value);
    };

    const handleInputChange = e => {
        const value = e.target.value;
        setUserId(value);
    };

    const handleQuery = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                setIsLoading(true);
                const provider = new ethers.providers.Web3Provider(ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    "0xC61d8b49518BcE66049bF2977788e12c2C799779",
                    testAbi,
                    signer
                );
                console.log("checking namespace..");

                let fetchedData = "";
                if (userType === "Student") {
                    console.log("gg");
                    fetchedData = await contract.getInfoToStudId(userId);
                } else if (userType === "Teacher") {
                    fetchedData = await contract.getInfoToProfId(userId);
                } else if (userType === "Dean") {
                    fetchedData = await contract.getInfoTDeanId(userId);
                }

                if (fetchedData) {
                    const decrypted = CryptoJS.AES.decrypt(
                        fetchedData,
                        "123zxc123"
                    );
                    const data = CryptoJS.enc.Utf8.stringify(decrypted);
                    setData(data);
                } else {
                    setData("Empty data");
                }
            } else {
                console.log("gg");
            }
        } catch (error) {
            console.log(error);
            setIsError(true);
        } finally {
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
                        <option value="Dean">Dean</option>
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
                <button className="button" onClick={handleQuery}>
                    Query
                </button>
            </div>

            <div className="box">
                <label className="label">Output</label>
                <div
                    style={{
                        maxWidth: 900,
                        //border: "1px solid #000",
                        overflow: "auto",
                        height: 100
                    }}
                >
                    {isLoading ? (
                        <>Loading...</>
                    ) : isError ? (
                        <>An error occured</>
                    ) : (
                        <>{data}</>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReadBlockchain;
