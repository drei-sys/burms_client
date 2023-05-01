import { useEffect, useState } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import testAbi from "assets/data/test.json";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";

import http from "services/httpService";

const BlockchainUsers = () => {
    const [refetchUsersRef, setRefetchUsersRef] = useState(0);
    const [users, setUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [scrollToTop, setScrollToTop] = useState(false);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/users");
                setUsers(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getUsers();
    }, [refetchUsersRef]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [scrollToTop]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const handleWrite = async user => {
        try {
            setScrollToTop(!scrollToTop);
            setIsLoading(true);

            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
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

                const userId = user.id;
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
                    tx = await contract.setInfoToRegId(userId, encryptedString);
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
                    setRefetchUsersRef(Math.random());
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
            setIsLoading(false);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Blockchain Users</h1>
            <div className="box" style={{ position: "relative" }}>
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>User name</th>
                            <th>User Id</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => {
                            const {
                                id,
                                lastname,
                                firstname,
                                middlename,
                                extname,
                                user_type,
                                block_hash
                            } = user;

                            return (
                                <tr key={id}>
                                    <td>
                                        <div>
                                            <span className="has-text-weight-medium">
                                                <UserName
                                                    user={{
                                                        lastname,
                                                        firstname,
                                                        middlename,
                                                        extname
                                                    }}
                                                />
                                            </span>
                                        </div>
                                        <div>
                                            <span className="is-size-6">
                                                BlockHash: {block_hash || "-"}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="is-size-6">
                                                {user_type}
                                            </span>
                                        </div>
                                        {block_hash ? (
                                            <span
                                                className="is-size-7 has-background-info has-text-white mr-4"
                                                style={{
                                                    padding: "2px 5px",
                                                    borderRadius: 3
                                                }}
                                            >
                                                On blockchain
                                            </span>
                                        ) : (
                                            <span
                                                className="is-size-7 has-background-dark has-text-white mr-4"
                                                style={{
                                                    padding: "2px 5px",
                                                    borderRadius: 3
                                                }}
                                            >
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td>{id}</td>
                                    <td>
                                        <button
                                            className="button is-success"
                                            title="Write to blockchain"
                                            onClick={() => handleWrite(user)}
                                        >
                                            <span className="icon">
                                                <i className="fa-solid fa-pencil"></i>
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="p-4 has-text-right">
                    {users.length} total items
                </div>

                {isLoading && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 100,
                            backgroundColor: "#fff",
                            opacity: 0.85
                        }}
                    >
                        <div className="is-flex is-justify-content-center is-align-items-center mt-6">
                            <div className="has-text-centered">
                                <div>
                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                </div>
                                <div>Writing in blockchain... Please wait.</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BlockchainUsers;
