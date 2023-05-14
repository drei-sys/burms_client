import { useEffect, useState } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";
import Drawer from "components/common/Drawer";
import StudentDetails from "components/common/StudentDetails";
import NonTeachingDetails from "components/common/NonTeachingDetails";

import testAbi from "assets/data/test.json";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";

import http from "services/httpService";

import { generateString } from "helpers/helpers";

const BlockchainUsers = () => {
    const [refetchUsersRef, setRefetchUsersRef] = useState(0);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [searchText, setSearchText] = useState("");

    const [blockchainUser, setBlockchainUser] = useState(null);

    const [isWriteLoading, setIsWriteLoading] = useState(false);
    const [isReadLoading, setIsReadLoading] = useState(false);
    const [scrollToTop, setScrollToTop] = useState(false);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenUserDetails, setIsOpenUserDetails] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/users");
                setSearchText("");
                setUsers(data);
                setFilteredUsers(data);
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

                const userString = JSON.stringify(user);
                const encrypted = CryptoJS.AES.encrypt(
                    userString,
                    import.meta.env.VITE_SECRET_KEY_1
                );
                const encryptedString = encrypted.toString();

                const userId = user.id;
                const dataId = generateString(10, "00");
                let tx = await contract.setUserInfoInBlock(
                    dataId,
                    encryptedString
                );

                const receipt = await tx.wait();
                if (receipt.status === 1) {
                    const blockHashItems = user.block_hash
                        ? JSON.parse(user.block_hash)
                        : [];
                    blockHashItems.push({ id: dataId, blockHash: tx.hash });

                    await http.put(`/api/userBlockHash/${userId}`, {
                        block_hash: JSON.stringify(blockHashItems)
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
            setIsWriteLoading(false);
        }
    };

    const handleRead = async id => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                setIsReadLoading(true);
                setIsOpenUserDetails(true);

                const provider = new ethers.providers.Web3Provider(ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    import.meta.env.VITE_SMART_CONTRACT_1,
                    testAbi,
                    signer
                );

                const fetchedData = await contract.getUserInfoInBlock(id);

                if (fetchedData) {
                    const decrypted = CryptoJS.AES.decrypt(
                        fetchedData,
                        import.meta.env.VITE_SECRET_KEY_1
                    );
                    let data = CryptoJS.enc.Utf8.stringify(decrypted);
                    data = JSON.parse(data);
                    setBlockchainUser(data);
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
            setIsOpenUserDetails(false);
        } finally {
            setIsReadLoading(false);
        }
    };

    const handleSearch = () => {
        if (searchText.trim() === "") {
            setFilteredUsers(users);
        } else {
            const filteredUsers = users.filter(user => {
                const { lastname, firstname, middlename, extname } = user;

                const name = `${lastname} ${firstname} ${middlename || ""} ${
                    extname || ""
                }`;

                return name.toLowerCase().includes(searchText.toLowerCase());
            });

            setFilteredUsers(filteredUsers);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Blockchain Users</h1>
            <div className="box" style={{ position: "relative" }}>
                <div className="is-flex">
                    <input
                        type="text"
                        className="input mb-2"
                        placeholder="Search user name"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <button className="button is-info" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <hr />
                <div className="table-container">
                    <table
                        className="table is-fullwidth is-hoverable"
                        style={{
                            whiteSpace: "nowrap"
                        }}
                    >
                        <thead>
                            <tr>
                                <th>User name</th>
                                <th style={{ width: 100 }}>User Id</th>
                                <th style={{ width: 60 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => {
                                const {
                                    id,
                                    lastname,
                                    firstname,
                                    middlename,
                                    extname,
                                    user_type,
                                    block_hash
                                } = user;

                                const blockHashItems = block_hash
                                    ? JSON.parse(block_hash)
                                    : [];

                                return (
                                    <tr key={id}>
                                        <td>
                                            <div className="mb-1">
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
                                            {blockHashItems.map(
                                                ({ id, blockHash }) => {
                                                    return (
                                                        <div key={id}>
                                                            <button
                                                                className="button  is-ghost p-0"
                                                                onClick={() =>
                                                                    handleRead(
                                                                        id
                                                                    )
                                                                }
                                                            >
                                                                BlockHash:{" "}
                                                                {blockHash}
                                                            </button>
                                                        </div>
                                                    );
                                                }
                                            )}
                                            <div>
                                                <span className="is-size-6">
                                                    {user_type}
                                                </span>
                                            </div>
                                            <div>
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
                                            </div>
                                        </td>
                                        <td>{id}</td>
                                        <td>
                                            <button
                                                className="button is-success"
                                                title="Write to blockchain"
                                                onClick={() =>
                                                    handleWrite(user)
                                                }
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
                </div>

                <div className="p-4 has-text-right">
                    {filteredUsers.length} total items
                </div>

                {isWriteLoading && (
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

            {isOpenUserDetails && (
                <Drawer
                    title="User Blockchain Details"
                    isOpen={isOpenUserDetails}
                    onOk={() => setIsOpenUserDetails(false)}
                    onClose={() => setIsOpenUserDetails(false)}
                    content={
                        <>
                            {isReadLoading ? (
                                <div className="is-flex is-justify-content-center is-align-items-center mt-6">
                                    <div className="has-text-centered">
                                        <div>
                                            <i className="fa-solid fa-spinner fa-spin"></i>
                                        </div>
                                        <div>
                                            Reading from blockchain... Please
                                            wait.
                                        </div>
                                    </div>
                                </div>
                            ) : blockchainUser ? (
                                <>
                                    {blockchainUser.user_type === "Student" ? (
                                        <StudentDetails data={blockchainUser} />
                                    ) : (
                                        <NonTeachingDetails
                                            data={blockchainUser}
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="has-text-centered">
                                    No details.
                                </div>
                            )}
                        </>
                    }
                />
            )}
        </>
    );
};

export default BlockchainUsers;
