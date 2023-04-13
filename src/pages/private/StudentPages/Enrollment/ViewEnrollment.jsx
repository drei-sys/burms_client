import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const ViewEnrollment = () => {
    const [enrollmentItems, setEnrollmentItems] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await http.get(
                    `/api/enrollmentItems/${params.id}`
                );
                const { enrollmentItems } = data;
                if (data.length === 0) {
                    setIsNotExist(true);
                } else {
                    setEnrollmentItems(enrollmentItems);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getUser();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (isNotExist) {
        return (
            <div className="has-text-centered mt-6">Enrollment not found.</div>
        );
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
                    onClick={() => navigate("/studentViewEnrollments")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                View Enrollment
            </h1>
            <div className="box">
                <table className="table " style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>School Year</th>
                            <th>Semester</th>
                            <th>Course</th>
                            <th>Section</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollmentItems.map(enrollmentItem => {
                            const {
                                subject_id,
                                year,
                                semester,
                                course_name,
                                section_name,
                                subject_code,
                                subject_name
                            } = enrollmentItem;

                            return (
                                <tr key={subject_id}>
                                    <td>{year}</td>
                                    <td>{semesters[semester]}</td>
                                    <td>{course_name}</td>
                                    <td>{section_name}</td>
                                    <td>
                                        {subject_code}: {subject_name}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ViewEnrollment;