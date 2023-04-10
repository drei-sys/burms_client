import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const SchoolYear = () => {
    const [schoolYears, setSchoolYears] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSchoolYears = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/schoolYears");
                // setSchoolYears(
                //     data.filter(({ status }) => status === "published")
                // );
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

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

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
                    <div></div>
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
                                    <th style={{ width: 120 }}></th>
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
                                                    to={`/deptChairSchoolYearSections/${id}`}
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
                                                        to={`/deptChairSchoolYearSections/${id}`}
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
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default SchoolYear;
