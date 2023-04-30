import React, { useEffect, useState } from "react";
import testAbi from "assets/data/test.json";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";

import http from "services/httpService";

const BlockchainWrite = () => {
    const [userType, setUserType] = useState("Student");
    const [userId, setUserId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleInputChange = e => {
        const value = e.target.value;
        setUserId(value);
    };

    const handleWrite = async () => {
        try {
            setIsLoading(true);

            const { data: user } = await http.get(`/api/user/${userId}`);
            if (user?.lastname) {
                const { ethereum } = window;
                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(
                        ethereum
                    );
                    await provider.send("eth_requestAccounts", []);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(
                        import.meta.env.VITE_SMART_CONTRACT,
                        testAbi,
                        signer
                    );
                    const userString = JSON.stringify(user);
                    const encrypted = CryptoJS.AES.encrypt(
                        userString,
                        import.meta.env.VITE_SECRET_KEY
                    );
                    const encryptedString = encrypted.toString();

                    let tx = null;
                    if (user.user_type === "Student") {
                        tx = await contract.setInfoToStudId(
                            userId,
                            encryptedString
                        );
                    } else if (user.user_type === "Teacher") {
                        tx = await contract.setInfoToProfId(
                            userId,
                            encryptedString
                        );
                    } else if (user.user_type === "Non Teaching") {
                        tx = await contract.setInfoToNontId(
                            userId,
                            encryptedString
                        );
                    } else if (user.user_type === "Registrar") {
                        tx = await contract.setInfoToRegId(
                            userId,
                            encryptedString
                        );
                    } else if (user.user_type === "Dean") {
                        tx = await contract.setInfoToDeanId(
                            userId,
                            encryptedString
                        );
                    } else if (user.user_type === "DeptChair") {
                        tx = await contract.setInfoToDeptId(
                            userId,
                            encryptedString
                        );
                    }

                    const receipt = await tx.wait();
                    console.log(receipt);
                    if (receipt.status === 1) {
                        await http.put(`/api/userBlockHash/${userId}`, {
                            block_hash: receipt.blockHash
                        });
                        setUserId(0);
                        alert("Done");
                    }
                } else {
                    alert(
                        "Non-Ethereum browser detected. You should consider installing MetaMask."
                    );
                }
            } else {
                alert("User not exist.");
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
            setIsError(false);
        }
    };

    return (
        <div className="box">
            <div className="mb-4">
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
                    onClick={handleWrite}
                >
                    Write
                </button>
                {isLoading && <div>Please wait...</div>}
            </div>
        </div>
    );
};

export default BlockchainWrite;
