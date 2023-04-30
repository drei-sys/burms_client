import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const Students = () => {
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    const [selectedCourseId, setSelectedCourseId] = useState(0);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const { status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getStudents = async () => {
            try {
                setIsContentLoading(true);
                const { data: courses } = await http.get("/api/courses");
                const { data: students } = await http.get("/api/students");

                setStudents(students);
                setFilteredStudents(students);
                setCourses(courses);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getStudents();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">My Students</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (userStatus === "Rejected") {
        return (
            <>
                <h1 className="is-size-4 mb-4">My Students</h1>
                <div className="notification is-danger my-4">
                    Your account has been rejected.
                </div>
            </>
        );
    }

    const handleCourseChange = courseId => {
        const newFilteredStudents = students.filter(
            ({ course_id }) => course_id === courseId || courseId === 0
        );
        setFilteredStudents(newFilteredStudents);
        setSelectedCourseId(id);
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Students</h1>

            <div className="box mb-4">
                <div className="is-size-5 mb-2">Filters</div>
                <label className="label">Select course</label>
                <div className="select is-fullwidth">
                    <select
                        value={selectedCourseId}
                        onChange={e =>
                            handleCourseChange(Number(e.target.value))
                        }
                    >
                        <option value={0}></option>
                        {courses.map(({ id, name }) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="box">
                {filteredStudents.length === 0 ? (
                    <>No students found.</>
                ) : (
                    <>
                        <table className="table is-fullwidth is-hoverable">
                            <thead>
                                <tr>
                                    <th>Student name</th>
                                    <th>Course</th>
                                    <th style={{ width: 120 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(
                                    ({
                                        id,
                                        lastname,
                                        firstname,
                                        middlename,
                                        extname,
                                        year_level,
                                        course_name
                                    }) => {
                                        return (
                                            <tr key={id}>
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
                                                    <div>{year_level} year</div>
                                                </td>
                                                <td>{course_name}</td>
                                                <td>
                                                    <Link to={`/student/${id}`}>
                                                        <button
                                                            className="button mr-1"
                                                            title="View student data"
                                                        >
                                                            <span className="icon">
                                                                <i className="fa-solid fa-eye"></i>
                                                            </span>
                                                        </button>
                                                    </Link>
                                                    <Link
                                                        to={`/studentGrades/${id}`}
                                                    >
                                                        <button
                                                            className="button is-success mr-1"
                                                            title="View student grade"
                                                        >
                                                            <span className="icon">
                                                                <i className="fa-solid fa-calculator"></i>
                                                            </span>
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                        <div className="p-4 has-text-right">
                            {filteredStudents.length} total items
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Students;
