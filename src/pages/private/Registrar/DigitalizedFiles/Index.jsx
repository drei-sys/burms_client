import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import testAbi from "assets/data/test2.json";
import { ethers } from "ethers";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

function DigitalizedFiles() {
    const { status: userStatus } = useUserStore(state => state);

    const [digitalizedFiles, setDigitalizedFiles] = useState([]);
    const [filteredDigitalizedFiles, setFilteredDigitalizedFiles] = useState(
        []
    );

    const [searchText, setSearchText] = useState("");
    const [scrollToTop, setScrollToTop] = useState(false);

    const [isReadLoading, setIsReadLoading] = useState(false);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get(
                    "/api/blockchainUploadFileDigitalizedFiles"
                );
                setSearchText("");
                setDigitalizedFiles(data);
                setFilteredDigitalizedFiles(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getUsers();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [scrollToTop]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Digitalized Files</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (userStatus === "Rejected") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Digitalized Files</h1>
                <div className="notification is-danger my-4">
                    Your account has been rejected.
                </div>
            </>
        );
    }

    const handleRead = async (id, filename) => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                setScrollToTop(!scrollToTop);
                setIsReadLoading(true);

                const provider = new ethers.providers.Web3Provider(ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    import.meta.env.VITE_SMART_CONTRACT_2,
                    testAbi,
                    signer
                );

                const fetchedData = await contract.getDocsToBlock(id);

                if (fetchedData) {
                    const url = `https://${fetchedData}.ipfs.nftstorage.link/${filename}`;
                    window.open(url, "_blank");
                } else {
                    alert("Something wrong on the fetched data");
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
            setIsReadLoading(false);
        }
    };

    const handleSearch = () => {
        if (searchText.trim() === "") {
            setFilteredDigitalizedFiles(digitalizedFiles);
        } else {
            const filteredDigitalizedFiles = digitalizedFiles.filter(
                digitalizedFile => {
                    const {
                        student_lastname,
                        student_firstname,
                        student_middlename,
                        student_extname,
                        filename
                    } = digitalizedFile;
                    const q = `${filename} ${student_lastname} ${student_firstname} ${
                        student_middlename || ""
                    } ${student_extname || ""}`;
                    return q.toLowerCase().includes(searchText.toLowerCase());
                }
            );
            setFilteredDigitalizedFiles(filteredDigitalizedFiles);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Digitalized Files</h1>
            <div className="box" style={{ position: "relative" }}>
                <div className="is-flex is-justify-content-space-between">
                    <div></div>
                    <div>
                        <Link to="/uploadDigitalizedFile">
                            <button className="button is-success">
                                Upload digitalized files
                            </button>
                        </Link>
                    </div>
                </div>
                <hr />
                <div className="is-flex">
                    <input
                        type="text"
                        className="input mb-2"
                        placeholder="Search student name and file name"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <button className="button is-info" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <hr />
                {filteredDigitalizedFiles.length === 0 ? (
                    <div className="has-text-centered p-4">
                        No digitalized files found.
                    </div>
                ) : (
                    <>
                        <div className="table-container">
                            <table
                                className="table is-fullwidth is-hoverable"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                <thead>
                                    <tr>
                                        <th>Files</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDigitalizedFiles.map(
                                        filteredDigitalizedFile => {
                                            const {
                                                id,
                                                student_lastname,
                                                student_firstname,
                                                student_middlnema,
                                                student_extname,
                                                student_course_name,
                                                student_year_level,
                                                filename,
                                                pid,
                                                block_hash
                                            } = filteredDigitalizedFile;

                                            return (
                                                <tr key={id}>
                                                    <td>
                                                        <div>
                                                            <button
                                                                className="button is-ghost p-0"
                                                                onClick={() =>
                                                                    handleRead(
                                                                        pid,
                                                                        filename
                                                                    )
                                                                }
                                                            >
                                                                {filename}
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <UserName
                                                                user={{
                                                                    lastname:
                                                                        student_lastname,
                                                                    firstname:
                                                                        student_firstname,
                                                                    middlename:
                                                                        student_middlnema,
                                                                    extname:
                                                                        student_extname
                                                                }}
                                                            />{" "}
                                                            &ndash;{" "}
                                                            {
                                                                student_course_name
                                                            }{" "}
                                                            &ndash;{" "}
                                                            {student_year_level}{" "}
                                                            year
                                                        </div>
                                                        <div>
                                                            BlockHash:{" "}
                                                            {block_hash}
                                                        </div>
                                                        <div>
                                                            <span
                                                                className="is-size-7 has-background-info has-text-white mr-4"
                                                                style={{
                                                                    padding:
                                                                        "2px 5px",
                                                                    borderRadius: 3
                                                                }}
                                                            >
                                                                On blockchain
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 has-text-right">
                            {filteredDigitalizedFiles.length} total items
                        </div>
                        {isReadLoading && (
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
                                        <div>
                                            Reading in blockchain... Please
                                            wait.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default DigitalizedFiles;
