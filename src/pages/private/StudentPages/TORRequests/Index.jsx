import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const TORRequests = () => {
    const [refetchCoursesRef, setRefetchCoursesRef] = useState(0);
    const [TORRequests, setTORRequests] = useState([]);
    const [selectedTORRequest, setSelectedTORRequest] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const { status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getCourses = async () => {
            try {
                setIsContentLoading(true);
                // const { data } = await http.get("/api/courses");
                // setTORRequests(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getCourses();
    }, [refetchCoursesRef]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">TOR Requests</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="is-size-4 mb-4">TOR Requests</h1>

            <div className="box">
                <div className="is-flex is-justify-content-space-between">
                    <div></div>
                    <div>
                        <Link to="/createCourse">
                            <button className="button is-success">
                                Request TOR
                            </button>
                        </Link>
                    </div>
                </div>
                <hr />
                <div>
                    {TORRequests.length == 0 ? (
                        <div className="has-text-centered p-4">
                            No requrests found.
                        </div>
                    ) : (
                        <>
                            <table className="table is-fullwidth is-hoverable">
                                <thead>
                                    <tr>
                                        <th>Reason</th>
                                        <th>Date requested</th>
                                        <th>Remarks</th>
                                        <th>Status</th>
                                        <th style={{ width: 120 }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TORRequests.map(({ id, name }) => (
                                        <tr key={id}>
                                            <td>{name}</td>
                                            <td>
                                                <Link
                                                    to={`/updateCourse/${id}`}
                                                >
                                                    <button
                                                        className="button mr-1"
                                                        title="Update"
                                                    >
                                                        <span className="icon">
                                                            <i className="fa-solid fa-pen-to-square"></i>
                                                        </span>
                                                    </button>
                                                </Link>
                                                <button
                                                    className="button is-danger"
                                                    title="Delete"
                                                    // onClick={() =>
                                                    //     showConfirmDelete(id)
                                                    // }
                                                >
                                                    <span className="icon">
                                                        <i className="fa-solid fa-trash"></i>
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-4 has-text-right">
                                {TORRequests.length} total items
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default TORRequests;
