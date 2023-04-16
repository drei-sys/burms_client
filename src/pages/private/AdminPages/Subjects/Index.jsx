import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import http from "services/httpService";

const Subjects = () => {
    const [refetchSubjectsRef, setRefetchSubjectsRef] = useState(0);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    useEffect(() => {
        const getSubjects = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/subjects");
                setSubjects(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getSubjects();
    }, [refetchSubjectsRef]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const showConfirmDelete = selectedId => {
        setSelectedSubject(subjects.find(({ id }) => id === selectedId));
        setIsOpenConfirmDelete(true);
    };

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            await http.delete(`/api/subject/${selectedSubject.id}`);
            setRefetchSubjectsRef(Math.random());
        } catch (error) {
            alert("An error occured while deleting. Please try again.");
        } finally {
            setIsOpenConfirmDelete(false);
            setIsDeleteLoading(false);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Subjects</h1>
            <div className="box">
                <div className="is-flex is-justify-content-space-between">
                    <div></div>
                    <div>
                        <Link to="/createSubject">
                            <button className="button is-success">
                                Create subject
                            </button>
                        </Link>
                    </div>
                </div>
                <hr />
                <div>
                    {subjects.length == 0 ? (
                        <div className="has-text-centered p-4">
                            No subjects found.
                        </div>
                    ) : (
                        <>
                            <table className="table is-fullwidth is-hoverable">
                                <thead>
                                    <tr>
                                        <th>Subject code</th>
                                        <th>Subject name</th>
                                        <th>Unit</th>
                                        <th>Type</th>
                                        <th style={{ width: 120 }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjects.map(
                                        ({ id, code, name, unit, type }) => (
                                            <tr key={id}>
                                                <td>{code}</td>
                                                <td>{name}</td>
                                                <td>{unit}</td>
                                                <td>{type}</td>
                                                <td>
                                                    <Link
                                                        to={`/updateSubject/${id}`}
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
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                            <div className="p-4 has-text-right">
                                {subjects.length} total items
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ConfirmModal
                title="Delete Subject"
                description={`Are you sure do you want to delete ${selectedSubject?.name} subject?`}
                isOpen={isOpenConfirmDelete}
                isLoading={isDeleteLoading}
                onOk={() => {
                    handleDelete();
                }}
                onClose={() => {
                    setIsOpenConfirmDelete(false);
                }}
            />
        </>
    );
};

export default Subjects;
