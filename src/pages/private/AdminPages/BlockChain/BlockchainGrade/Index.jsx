import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";
import Drawer from "components/common/Drawer";

import testAbi from "assets/data/test.json";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";

import http from "services/httpService";

const BlockchainGrades = () => {
    const [refetchUsersRef, setRefetchUsersRef] = useState(0);
    const [torRequests, setTORRequests] = useState([]);
    const [selectedTORRequestId, setSelectedTORRequestId] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [scrollToTop, setScrollToTop] = useState(false);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenViewTOR, setIsOpenViewTOR] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/torRequestsApproved");
                console.log(data);
                setTORRequests(data);
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

    const showViewTOR = torId => {
        setSelectedTORRequestId(torId);
        setIsOpenViewTOR(true);
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Blockchain Grades</h1>

            <div className="box">
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>Student name</th>
                            {/* <th>Date requested</th>
                            <th>Reason / Purpose</th>
                            <th>Remarks</th> */}
                            <th style={{ width: 60 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {torRequests.map(
                            ({
                                id,
                                student_lastname: lastname,
                                student_firstname: firstname,
                                student_middlename: middlename,
                                student_extname: extname,
                                created_at
                            }) => {
                                let d = new Date(created_at);
                                const datestring = `${
                                    d.getMonth() + 1
                                }-${d.getDate()}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

                                return (
                                    <tr key={id}>
                                        {/* <td>{datestring}</td> */}
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
                                        </td>
                                        {/* <td>{reason}</td>
                                        <td>{remarks}</td> */}
                                        <td>
                                            {/* <Link to={`/tor/${id}`}> */}
                                            <button
                                                className="button mr-1"
                                                title="View grades"
                                                onClick={() => showViewTOR(id)}
                                            >
                                                <span className="icon">
                                                    <i className="fa-solid fa-eye"></i>
                                                </span>
                                            </button>
                                            {/* </Link> */}
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
                <div className="p-4 has-text-right">
                    {torRequests.length} total items
                </div>
            </div>

            {isOpenViewTOR && (
                <Drawer
                    title="Input Grades"
                    isOpen={isOpenViewTOR}
                    onOk={() => setIsOpenViewTOR(false)}
                    onClose={() => setIsOpenViewTOR(false)}
                    content={
                        // <GradeDetails
                        //     teacherId={null}
                        //     enrollmentItem={selectedEnrollmentItem}
                        //     readOnly={true}
                        //     onRefetch={() => console.log("refetch")}
                        // />
                        <>gg</>
                    }
                />
            )}
        </>
    );
};

export default BlockchainGrades;
