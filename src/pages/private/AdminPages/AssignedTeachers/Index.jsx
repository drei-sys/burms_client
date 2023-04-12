import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import http from "services/httpService";

const AssignTeachers = () => {
    const [refetchAssignedTeachersRef, setRefetchAssignedTeachersRef] =
        useState(0);
    const [schoolYears, setSchoolYears] = useState([]);
    const [schoolYearId, setSchoolYearId] = useState(0);
    const [assignedTeachers, setAssignedTeachers] = useState([]);
    const [selectedAssignedTeacher, setSelectedAssignedTeacher] =
        useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [isAssignedTeachersLoading, setIsAssignedTeachersLoading] =
        useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    useEffect(() => {
        const getSchoolYears = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/schoolYears");
                setSchoolYears(data);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getSchoolYears();
    }, []);

    useEffect(() => {
        if (schoolYearId !== 0) {
            const getAssignedTeachers = async () => {
                try {
                    setIsAssignedTeachersLoading(true);
                    const { data } = await http.get(
                        `/api/assignedTeachers/${schoolYearId}`
                    );
                    setAssignedTeachers(data);
                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setIsAssignedTeachersLoading(false);
                }
            };

            getAssignedTeachers();
        }
    }, [schoolYearId, refetchAssignedTeachersRef]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const handleSYChange = id => {
        setSchoolYearId(Number(id));
    };

    const showConfirmDelete = selectedId => {
        setSelectedAssignedTeacher(
            assignedTeachers.find(({ id }) => id === selectedId)
        );
        setIsOpenConfirmDelete(true);
    };

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            await http.delete(
                `/api/assignedTeacher/${selectedAssignedTeacher.id}`
            );
            setRefetchAssignedTeachersRef(Math.random());
        } catch (error) {
            alert("An error occured while deleting. Please try again.");
        } finally {
            setIsOpenConfirmDelete(false);
            setIsDeleteLoading(false);
        }
    };

    const semesters = {
        1: "1st",
        2: "2nd"
    };

    const schoolYear = schoolYears.find(({ id }) => id === schoolYearId);

    return (
        <>
            <h1 className="is-size-4 mb-5">Assigned Teachers</h1>
            <div className="box mb-4 has-text-right">
                <Link to={`/assignTeacher`}>
                    <button className="button is-success">
                        Assign teacher
                    </button>
                </Link>
            </div>

            <div className="box mb-4">
                <div className="field">
                    <label className="label">Select SY</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select
                                name="syId"
                                value={schoolYearId}
                                onChange={e => handleSYChange(e.target.value)}
                            >
                                <option value={0}></option>
                                {schoolYears.map(({ id, year, semester }) => (
                                    <option key={id} value={id}>
                                        {year}: {semesters[semester]} Semester
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {schoolYearId === 0 ? (
                <div></div>
            ) : isAssignedTeachersLoading ? (
                <div className="has-text-centered p-5">Loading...</div>
            ) : (
                <>
                    <div className="box">
                        <div>
                            <label className="label">Teachers</label>
                        </div>
                        <table className="table " style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Total subjects</th>
                                    <th style={{ width: 180 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignedTeachers.map(
                                    ({ id, teacher_name, total_subjects }) => (
                                        <tr key={id}>
                                            <td>{teacher_name}</td>
                                            <td>{total_subjects}</td>
                                            <td>
                                                <Link
                                                    to={`/assignedTeacher/${id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
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
                                                {schoolYear?.status ===
                                                    "active" && (
                                                    <Link
                                                        to={`/updateAssignedTeacher/${id}`}
                                                    >
                                                        <button
                                                            className="button mr-1"
                                                            title="Edit"
                                                        >
                                                            <span className="icon">
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </span>
                                                        </button>
                                                    </Link>
                                                )}
                                                {schoolYear?.status ===
                                                    "active" && (
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
                    </div>
                </>
            )}

            <ConfirmModal
                title="Delete Assigned Teacher"
                description={`Are you sure do you want to delete ${selectedAssignedTeacher?.teacher_name} subjects?`}
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

export default AssignTeachers;
