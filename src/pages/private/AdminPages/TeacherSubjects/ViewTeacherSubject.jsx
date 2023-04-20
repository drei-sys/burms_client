import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import http from "services/httpService";

const ViewTeacherSubject = () => {
    const [teacherSubject, setTeacherSubject] = useState(null);
    const [teacherSubjectItems, setTeacherSubjectItems] = useState([]);

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
                    `/api/teacherSubject/${params.id}`
                );
                const { teacherSubject, teacherSubjectItems } = data;
                if (teacherSubject) {
                    setTeacherSubject(teacherSubject);
                    setTeacherSubjectItems(teacherSubjectItems);
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

    return (
        <>
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() => {
                        navigate(`/teacherSubjects`);
                    }}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Teacher Subject
            </h1>

            <div className="columns">
                <div className="column is-4">
                    <div className="box">
                        <label className="label">School year details</label>
                        <table className="table " style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <span className="">Year:</span>
                                    </td>
                                    <td>{teacherSubject.year}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="">Semester:</span>
                                    </td>
                                    <td>{teacherSubject.semester}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="">Status:</span>
                                    </td>
                                    <td>{teacherSubject.sy_status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="column is-8">
                    <div className="box mb-4">
                        <div>
                            <label className="label">Teacher name:</label>
                        </div>
                        <div>
                            <UserName user={teacherSubject} />
                        </div>
                    </div>
                    <div className="box">
                        <div>
                            <label className="label">Subjects:</label>
                        </div>
                        <div>
                            {teacherSubjectItems.map(({ id, code, name }) => (
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

export default ViewTeacherSubject;
