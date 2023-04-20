import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const SchoolYear = () => {
    const [schoolYears, setSchoolYears] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const { status: userStatus } = useUserStore(state => state);

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

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">School Years</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="is-size-4 mb-4">School Years</h1>
            <div className="box">
                <div>
                    {schoolYears.length == 0 ? (
                        <div className="has-text-centered p-4">
                            No school year found.
                        </div>
                    ) : (
                        <>
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
                                                <td>{semester}</td>
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
                                                    {status !== "Locked" && (
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
                            <div className="p-4 has-text-right">
                                {schoolYears.length} total items
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default SchoolYear;
