import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import StudentDetails from "components/common/StudentDetails";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const ViewStudent = () => {
    const [student, setStudent] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const { status: userStatus, type: userType } = useUserStore(state => state);

    useEffect(() => {
        const getStudent = async () => {
            try {
                const { data } = await http.get(`/api/student/${params.id}`);
                if (data?.lastname) {
                    setStudent(data);
                } else {
                    setIsNotExist(true);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getStudent();
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

    if (isNotExist) {
        return <div className="has-text-centered mt-6">Student not found.</div>;
    }

    return (
        <>
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() =>
                        navigate(
                            `/${
                                userType === "Registrar"
                                    ? "registrarStudents"
                                    : "deptChairStudents"
                            }`
                        )
                    }
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Student
            </h1>

            <div className="box">
                <StudentDetails data={student} />
            </div>
        </>
    );
};

export default ViewStudent;
