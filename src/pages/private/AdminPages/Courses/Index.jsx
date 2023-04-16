import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import http from "services/httpService";

const Courses = () => {
    const [refetchCoursesRef, setRefetchCoursesRef] = useState(0);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    useEffect(() => {
        const getCourses = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/courses");
                setCourses(data);
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

    const showConfirmDelete = selectedId => {
        setSelectedCourse(courses.find(({ id }) => id === selectedId));
        setIsOpenConfirmDelete(true);
    };

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            await http.delete(`/api/course/${selectedCourse.id}`);
            setRefetchCoursesRef(Math.random());
        } catch (error) {
            alert("An error occured while deleting. Please try again.");
        } finally {
            setIsOpenConfirmDelete(false);
            setIsDeleteLoading(false);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Courses</h1>
            <div className="box">
                <div className="is-flex is-justify-content-space-between">
                    <div></div>
                    <div>
                        <Link to="/createCourse">
                            <button className="button is-success">
                                Create course
                            </button>
                        </Link>
                    </div>
                </div>
                <hr />
                <div>
                    {courses.length == 0 ? (
                        <div className="has-text-centered p-4">
                            No courses found.
                        </div>
                    ) : (
                        <>
                            <table className="table is-fullwidth is-hoverable">
                                <thead>
                                    <tr>
                                        <th>Course name</th>
                                        <th style={{ width: 120 }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(({ id, name }) => (
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
                                                    onClick={() =>
                                                        showConfirmDelete(id)
                                                    }
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
                                {courses.length} total items
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ConfirmModal
                title="Delete Course"
                description={`Are you sure do you want to delete ${selectedCourse?.name} course?`}
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

export default Courses;
