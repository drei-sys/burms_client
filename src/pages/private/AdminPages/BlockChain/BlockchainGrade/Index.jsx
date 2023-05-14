import { useEffect, useState } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";
import Drawer from "components/common/Drawer";
import ViewTOR from "./components/ViewTOR";
import ViewTORBlockchain from "./components/ViewTORBlockchain";

import http from "services/httpService";

const BlockchainGrades = () => {
    const [refetchTORRequestsRef, setRefetchTORRequestsRef] = useState(0);
    const [torRequests, setTORRequests] = useState([]);
    const [filteredTORRequests, setFilteredTORRequests] = useState([]);

    const [selectedTORRequestId, setSelectedTORRequestId] = useState(0);
    const [selectedHashId, setSelectedHashId] = useState("");

    const [searchText, setSearchText] = useState("");

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenViewTOR, setIsOpenViewTOR] = useState(false);
    const [isOpenViewTORBlockchain, setIsOpenViewTORBlockchain] =
        useState(false);

    useEffect(() => {
        const getTORRequests = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/torRequestsApproved");
                setTORRequests(data);
                setFilteredTORRequests(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getTORRequests();
    }, [refetchTORRequestsRef]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const showViewTOR = torRequestId => {
        setSelectedTORRequestId(torRequestId);
        setIsOpenViewTOR(true);
    };

    const showViewTORBlockchain = (torRequestId, hashId) => {
        setSelectedTORRequestId(torRequestId);
        setSelectedHashId(hashId);
        setIsOpenViewTORBlockchain(true);
    };

    const handleSearch = () => {
        if (searchText.trim() === "") {
            setFilteredTORRequests(torRequests);
        } else {
            const filteredTORRequests = torRequests.filter(torRequest => {
                const {
                    student_lastname: lastname,
                    student_firstname: firstname,
                    student_middlename: middlename,
                    student_extname: extname
                } = torRequest;

                const name = `${lastname} ${firstname} ${middlename || ""} ${
                    extname || ""
                }`;

                return name.toLowerCase().includes(searchText.toLowerCase());
            });

            setFilteredTORRequests(filteredTORRequests);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Blockchain Grades</h1>

            <div className="box">
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
                                <th>Student name</th>
                                <th style={{ width: 60 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTORRequests.map(
                                ({
                                    id: torRequestId,
                                    student_lastname: lastname,
                                    student_firstname: firstname,
                                    student_middlename: middlename,
                                    student_extname: extname,
                                    block_hash
                                }) => {
                                    const blockHashItems = block_hash
                                        ? JSON.parse(block_hash)
                                        : [];

                                    return (
                                        <tr key={torRequestId}>
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
                                                {blockHashItems.map(
                                                    ({ id, blockHash }) => {
                                                        return (
                                                            <div key={id}>
                                                                <button
                                                                    className="button  is-ghost p-0"
                                                                    onClick={() =>
                                                                        showViewTORBlockchain(
                                                                            torRequestId,
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
                                                    {block_hash ? (
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
                                                    ) : (
                                                        <span
                                                            className="is-size-7 has-background-dark has-text-white mr-4"
                                                            style={{
                                                                padding:
                                                                    "2px 5px",
                                                                borderRadius: 3
                                                            }}
                                                        >
                                                            Pending
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <button
                                                    className="button mr-1"
                                                    title="View grades"
                                                    onClick={() =>
                                                        showViewTOR(
                                                            torRequestId
                                                        )
                                                    }
                                                >
                                                    <span className="icon">
                                                        <i className="fa-solid fa-eye"></i>
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 has-text-right">
                    {filteredTORRequests.length} total items
                </div>
            </div>

            {isOpenViewTOR && (
                <Drawer
                    title="Grades"
                    isOpen={isOpenViewTOR}
                    onOk={() => setIsOpenViewTOR(false)}
                    onClose={() => setIsOpenViewTOR(false)}
                    content={
                        <ViewTOR
                            torRequestId={selectedTORRequestId}
                            onDoneWrite={() => {
                                setIsOpenViewTOR(false);
                                setRefetchTORRequestsRef(Math.random());
                            }}
                        />
                    }
                />
            )}

            {isOpenViewTORBlockchain && (
                <Drawer
                    title="Grades Blockchain"
                    isOpen={isOpenViewTORBlockchain}
                    onOk={() => setIsOpenViewTORBlockchain(false)}
                    onClose={() => setIsOpenViewTORBlockchain(false)}
                    content={
                        <ViewTORBlockchain
                            torRequestId={selectedTORRequestId}
                            hashId={selectedHashId}
                        />
                    }
                />
            )}
        </>
    );
};

export default BlockchainGrades;
