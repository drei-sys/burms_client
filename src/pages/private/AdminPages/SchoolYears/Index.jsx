import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import http from "services/httpService";

const SchoolYears = () => {
    const [refetchSchoolYearsRef, setRefetchSchoolYearsRef] = useState(0);
    const [schoolYears, setSchoolYears] = useState([]);
    const [selectedSchoolYear, setSelectedSchoolYear] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isOpenConfirmPublish, setIsOpenConfirmPublish] = useState(false);
    const [isOpenConfirmLock, setIsOpenConfirmLock] = useState(false);

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isPublishLoading, setIsPublishLoading] = useState(false);
    const [isLockLoading, setIsLockLoading] = useState(false);

    useEffect(() => {
        const getSchoolYears = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/schoolYears");
                console.log(data);
                setSchoolYears(data);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getSchoolYears();
    }, [refetchSchoolYearsRef]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const showConfirmDelete = selectedId => {
        setSelectedSchoolYear(schoolYears.find(({ id }) => id === selectedId));
        setIsOpenConfirmDelete(true);
    };

    const showConfirmPublish = selectedId => {
        setSelectedSchoolYear(schoolYears.find(({ id }) => id === selectedId));
        setIsOpenConfirmPublish(true);
    };

    const showConfirmLock = selectedId => {
        setSelectedSchoolYear(schoolYears.find(({ id }) => id === selectedId));
        setIsOpenConfirmLock(true);
    };

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            await http.delete(`/api/schoolYear/${selectedSchoolYear.id}`);
            setRefetchSchoolYearsRef(Math.random());
        } catch (error) {
            alert("An error occured while deleting. Please try again.");
        } finally {
            setIsOpenConfirmDelete(false);
            setIsDeleteLoading(false);
        }
    };

    const handlePublish = async () => {
        try {
            setIsPublishLoading(true);
            await http.put(`/api/schoolYearStatus/${selectedSchoolYear.id}`, {
                status: "published"
            });
            setRefetchSchoolYearsRef(Math.random());
        } catch (error) {
            alert("An error occured while deleting. Please try again.");
        } finally {
            setIsOpenConfirmPublish(false);
            setIsPublishLoading(false);
        }
    };

    const handleLock = async () => {
        try {
            setIsLockLoading(true);
            await http.put(`/api/schoolYearStatus/${selectedSchoolYear.id}`, {
                status: "locked"
            });
            setRefetchSchoolYearsRef(Math.random());
        } catch (error) {
            alert("An error occured while deleting. Please try again.");
        } finally {
            setIsOpenConfirmLock(false);
            setIsLockLoading(false);
        }
    };

    const semesters = {
        1: "1st",
        2: "2nd"
    };

    return (
        <>
            <h1 className="is-size-4 mb-5">School Year</h1>
            <div className="box">
                <div className="is-flex is-justify-content-space-between mb-4">
                    <div>{schoolYears.length} total school year</div>
                    <div>
                        <Link to="/createSchoolYear">
                            <button className="button is-success">
                                Create school year
                            </button>
                        </Link>
                    </div>
                </div>
                <div>
                    {schoolYears.length == 0 ? (
                        <div className="has-text-centered p-5">
                            No school year found.
                        </div>
                    ) : (
                        <table className="table is-fullwidth is-hoverable">
                            <thead>
                                <tr>
                                    <th>School year</th>
                                    <th>Semester</th>
                                    <th>Status</th>
                                    <th style={{ width: 283 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {schoolYears.map(
                                    ({ id, year, semester, status }) => (
                                        <tr key={id}>
                                            <td>{year}</td>
                                            <td>{semesters[semester]}</td>
                                            <td>{status}</td>
                                            <td>
                                                <Link
                                                    to={`/schoolYearSection/${id}`}
                                                >
                                                    <button
                                                        className="button mr-1"
                                                        title="View"
                                                    >
                                                        <span className="icon">
                                                            <i className="fa-solid fa-eye"></i>
                                                        </span>
                                                    </button>
                                                </Link>
                                                {status !== "locked" && (
                                                    <Link
                                                        to={`/schoolYearSection/${id}`}
                                                    >
                                                        <button
                                                            className="button mr-1"
                                                            title="Add Section"
                                                        >
                                                            <span className="icon">
                                                                <i className="fa-solid fa-plus"></i>
                                                            </span>
                                                        </button>
                                                    </Link>
                                                )}
                                                {status === "active" && (
                                                    <button
                                                        className="button mr-1"
                                                        title="Publish"
                                                        onClick={() =>
                                                            showConfirmPublish(
                                                                id
                                                            )
                                                        }
                                                    >
                                                        <span className="icon">
                                                            <i className="fa-solid fa-upload"></i>
                                                        </span>
                                                    </button>
                                                )}
                                                {status !== "locked" && (
                                                    <button
                                                        className="button mr-1"
                                                        title="Lock"
                                                        onClick={() =>
                                                            showConfirmLock(id)
                                                        }
                                                    >
                                                        <span className="icon">
                                                            <i className="fa-solid fa-lock"></i>
                                                        </span>
                                                    </button>
                                                )}
                                                {status === "active" && (
                                                    <Link
                                                        to={`/updateSchoolYear/${id}`}
                                                    >
                                                        <button
                                                            className="button mr-1"
                                                            title="Edit School Year"
                                                        >
                                                            <span className="icon">
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </span>
                                                        </button>
                                                    </Link>
                                                )}
                                                {status === "active" && (
                                                    <button
                                                        className="button is-danger"
                                                        title="Delete"
                                                        onClick={() =>
                                                            showConfirmDelete(
                                                                id
                                                            )
                                                        }
                                                    >
                                                        <span className="icon">
                                                            <i className="fa-solid fa-trash"></i>
                                                        </span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <ConfirmModal
                title="Delete School Year"
                description={`Are you sure do you want to delete ${selectedSchoolYear?.year} school year?`}
                isOpen={isOpenConfirmDelete}
                isLoading={isDeleteLoading}
                onOk={() => {
                    handleDelete();
                }}
                onClose={() => {
                    setIsOpenConfirmDelete(false);
                }}
            />

            <ConfirmModal
                title="Publish School Year"
                description={`Are you sure do you want to publish ${selectedSchoolYear?.year} school year?`}
                isOpen={isOpenConfirmPublish}
                isLoading={isPublishLoading}
                onOk={() => {
                    handlePublish();
                }}
                onClose={() => {
                    setIsOpenConfirmPublish(false);
                }}
            />

            <ConfirmModal
                title="Lock School Year"
                description={`Are you sure do you want to lock ${selectedSchoolYear?.year} school year?`}
                isOpen={isOpenConfirmLock}
                isLoading={isLockLoading}
                onOk={() => {
                    handleLock();
                }}
                onClose={() => {
                    setIsOpenConfirmLock(false);
                }}
            />
        </>
    );
};

export default SchoolYears;
