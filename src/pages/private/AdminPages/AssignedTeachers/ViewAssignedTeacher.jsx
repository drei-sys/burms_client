import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const ViewAssignedTeacher = () => {
    const [assignedTeacher, setAssignedTeacher] = useState(null);
    const [assignedTeacherItems, setAssignedTeacherItems] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get(
                    `/api/assignedTeacher/${params.id}`
                );
                const { assignedTeacher, assignedTeacherItems } = data;
                if (assignedTeacher) {
                    setAssignedTeacher(assignedTeacher);
                    setAssignedTeacherItems(assignedTeacherItems);
                } else {
                    setIsNotExist(true);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getUsers();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (isNotExist) {
        return <div className="has-text-centered mt-6">Teacher not found.</div>;
    }

    const semesters = {
        1: "1st",
        2: "2nd"
    };

    return (
        <>
            <h1 className="is-size-4 mb-5">
                <button
                    className="button is-ghost"
                    onClick={() => {
                        navigate(`/assignedTeachers`);
                    }}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                View Assigned Teacher
            </h1>

            <div className="columns">
                <div className="column is-4">
                    <div className="box">
                        <table className="table " style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <span className="">Year:</span>
                                    </td>
                                    <td>{assignedTeacher.year}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="">Semester:</span>
                                    </td>
                                    <td>
                                        {semesters[assignedTeacher.semester]}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="">Status:</span>
                                    </td>
                                    <td>{assignedTeacher.sy_status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="column is-8">
                    <div className="box mb-4">
                        <div>
                            <label className="label">Teacher name:</label>{" "}
                        </div>
                        <div>{assignedTeacher.teacher_name}</div>
                    </div>
                    <div className="box">
                        <div>
                            <label className="label">Subjects:</label>{" "}
                        </div>
                        <div>
                            {assignedTeacherItems.map(({ id, code, name }) => (
                                <div key={id}>
                                    - {code}: {name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>User name</th>
                            <th>Hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ id, name, user_type, hash }) => {
                            return (
                                <tr key={id}>
                                    <td>
                                        <div>
                                            <span className="has-text-weight-medium">
                                                {name}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="is-size-6">
                                                {userTypes[user_type]}
                                            </span>
                                        </div>
                                    </td>
                                    <td>{hash}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table> */}
        </>
    );
};

export default ViewAssignedTeacher;
