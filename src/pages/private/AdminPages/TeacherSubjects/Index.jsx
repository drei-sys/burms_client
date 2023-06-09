import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";
import UserName from "components/common/UserName";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const TeacherSubjects = () => {
    const [refetchTeacherSubjectsRef, setRefetchTeacherSubjectsRef] =
        useState(0);
    const [schoolYears, setSchoolYears] = useState([]);
    const [schoolYearId, setSchoolYearId] = useState(0);
    const [teacherSubjects, setTeacherSubjects] = useState([]);
    const [selectedTeacherSubject, setSelectedTeacherSubject] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTeacherSubjectsLoading, setIsTeacherSubjectsLoading] =
        useState(false);

    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const { type: userType, status: userStatus } = useUserStore(state => state);

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
            const getTeacherSubjects = async () => {
                try {
                    setIsTeacherSubjectsLoading(true);
                    const { data } = await http.get(
                        `/api/teacherSubjects/${schoolYearId}`
                    );
                    setTeacherSubjects(data);
                } catch (error) {
                    console.log(error);
                    setError(error);
                } finally {
                    setIsTeacherSubjectsLoading(false);
                }
            };

            getTeacherSubjects();
        }
    }, [schoolYearId, refetchTeacherSubjectsRef]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Teacher Subjects</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (userStatus === "Rejected") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Teacher Subjects</h1>
                <div className="notification is-danger my-4">
                    Your account has been rejected.
                </div>
            </>
        );
    }

    const handleSYChange = id => {
        setSchoolYearId(Number(id));
    };

    const showConfirmDelete = selectedId => {
        setSelectedTeacherSubject(
            teacherSubjects.find(({ id }) => id === selectedId)
        );
        setIsOpenConfirmDelete(true);
    };

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            await http.delete(
                `/api/teacherSubject/${selectedTeacherSubject.id}`
            );
            setRefetchTeacherSubjectsRef(Math.random());
        } catch (error) {
            alert("An error occured while deleting. Please try again.");
        } finally {
            setIsOpenConfirmDelete(false);
            setIsDeleteLoading(false);
        }
    };

    const schoolYear = schoolYears.find(({ id }) => id === schoolYearId);

    return (
        <>
            <h1 className="is-size-4 mb-4">Teacher Subjects</h1>

            <div className="box mb-4">
                <div className="has-text-right">
                    <Link
                        to={`/${
                            userType === "Dean"
                                ? "deanCreateTeacherSubject"
                                : "createTeacherSubject"
                        }`}
                    >
                        <button className="button is-success">
                            Create teacher subjects
                        </button>
                    </Link>
                </div>
            </div>

            <div className="box mb-4">
                <div className="field">
                    <label className="label">Select school year</label>
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
                                        {year}: {semester} Semester
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {schoolYearId === 0 ? (
                <div></div>
            ) : isTeacherSubjectsLoading ? (
                <div className="has-text-centered p-4">Loading...</div>
            ) : (
                <>
                    <div className="box">
                        {teacherSubjects.length == 0 ? (
                            <div className="has-text-centered p-4">
                                No teachers found.
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
                                                <th>Name</th>
                                                <th>Total subjects</th>
                                                <th style={{ width: 180 }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teacherSubjects.map(
                                                ({
                                                    id,
                                                    total_subjects,
                                                    ...rest
                                                }) => (
                                                    <tr key={id}>
                                                        <td>
                                                            <UserName
                                                                user={rest}
                                                            />
                                                        </td>
                                                        <td>
                                                            {total_subjects}
                                                        </td>
                                                        <td>
                                                            <Link
                                                                to={`/${
                                                                    userType ===
                                                                    "Dean"
                                                                        ? "deanTeacherSubject"
                                                                        : "teacherSubject"
                                                                }/${id}`}
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
                                                                "Active" && (
                                                                <Link
                                                                    to={`/${
                                                                        userType ===
                                                                        "Dean"
                                                                            ? "deanUpdateTeacherSubject"
                                                                            : "updateTeacherSubject"
                                                                    }/${id}`}
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
                                                            )}
                                                            {schoolYear?.status ===
                                                                "Active" && (
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
                                <div className="p-4 has-text-right">
                                    {teacherSubjects.length} total items
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}

            <ConfirmModal
                title="Delete Assigned Teacher"
                description={`Are you sure do you want to delete ${selectedTeacherSubject?.teacher_name} subjects?`}
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

export default TeacherSubjects;
