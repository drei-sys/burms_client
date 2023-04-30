import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const SchoolYearSections = () => {
    const [refetchSchoolYearRef, setRefetchSchoolYearRef] = useState(0);
    const [schoolYear, setSchoolYear] = useState({
        year: "",
        semester: "",
        courses: [
            {
                course_id: 1,
                name: "BSIT",
                sections: [
                    {
                        section_id: 1,
                        name: "1IT-1",
                        subjects: [
                            {
                                subject_id: 1,
                                code: "CS101",
                                name: "Computer Programming 1"
                            }
                        ]
                    }
                ]
            }
        ]
    });
    const [selectedSectionId, setSelectedSectionId] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotExist, setIsNotExist] = useState(false);

    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const { type: userType, status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getSchoolYear = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get(
                    `/api/schoolYearSection/${params.id}`
                );

                const { schoolYear, schoolYearSections } = data;

                let courses = [];
                schoolYearSections.forEach(schoolYearSection => {
                    const {
                        course_id,
                        section_id,
                        subject_id,
                        current_slot_count,
                        max_slot_count,
                        is_slot_full,

                        course_name,
                        section_name,
                        subject_code,
                        subject_name
                    } = schoolYearSection;

                    const course = courses.find(
                        ({ course_id: cId }) => cId === course_id
                    );

                    if (course) {
                        courses = courses.map(course => {
                            if (course.course_id === course_id) {
                                let courseSection = course.sections.find(
                                    ({ section_id: secId }) =>
                                        secId === section_id
                                );
                                if (courseSection) {
                                    courseSection.subjects.push({
                                        id: subject_id,
                                        code: subject_code,
                                        name: subject_name,
                                        current_slot_count,
                                        max_slot_count,
                                        is_slot_full
                                    });
                                    return {
                                        ...course,
                                        sections: course.sections.map(
                                            section => {
                                                if (
                                                    section.section_id ===
                                                    section_id
                                                ) {
                                                    return courseSection;
                                                }
                                                return section;
                                            }
                                        )
                                    };
                                } else {
                                    course.sections.push({
                                        section_id,
                                        name: section_name,
                                        subjects: [
                                            {
                                                id: subject_id,
                                                code: subject_code,
                                                name: subject_name,
                                                current_slot_count,
                                                max_slot_count,
                                                is_slot_full
                                            }
                                        ]
                                    });
                                    return course;
                                }
                            }
                            return course;
                        });
                    } else {
                        courses.push({
                            course_id,
                            name: course_name,
                            sections: [
                                {
                                    section_id,
                                    name: section_name,
                                    subjects: [
                                        {
                                            id: subject_id,
                                            code: subject_code,
                                            name: subject_name,
                                            current_slot_count,
                                            max_slot_count,
                                            is_slot_full
                                        }
                                    ]
                                }
                            ]
                        });
                    }
                });

                if (schoolYear) {
                    setSchoolYear({
                        ...schoolYear,
                        courses
                    });
                } else {
                    setIsNotExist(true);
                }
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getSchoolYear();
    }, [refetchSchoolYearRef]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">School Year Sections</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (userStatus === "Rejected") {
        return (
            <>
                <h1 className="is-size-4 mb-4">School Year Sections</h1>
                <div className="notification is-danger my-4">
                    Your account has been rejected.
                </div>
            </>
        );
    }

    if (isNotExist) {
        return (
            <div className="has-text-centered mt-6">School year not found.</div>
        );
    }

    const showConfirmDelete = selectedId => {
        setSelectedSectionId(selectedId);
        setIsOpenConfirmDelete(true);
    };

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            await http.delete(
                `/api/schoolYearSection/${params.id}/${selectedSectionId}`
            );
            setRefetchSchoolYearRef(Math.random());
        } catch (error) {
            alert("An error occured while deleting. Please try again.");
        } finally {
            setIsOpenConfirmDelete(false);
            setIsDeleteLoading(false);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() =>
                        navigate(
                            `/${
                                userType === "DeptChair"
                                    ? "deptChairSchoolYears"
                                    : "schoolYears"
                            }`
                        )
                    }
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                School Year Sections
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
                                    <td>{schoolYear.year}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="">Semester:</span>
                                    </td>
                                    <td>{schoolYear.semester}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="">Status:</span>
                                    </td>
                                    <td>{schoolYear.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="column is-8">
                    <div className="box">
                        <div className="is-flex is-justify-content-space-between">
                            <div></div>
                            <div>
                                {schoolYear.status !== "Locked" && (
                                    <Link
                                        to={`/${
                                            userType === "DeptChair"
                                                ? "deptChairSchoolYearAddSection"
                                                : "schoolYearAddSection"
                                        }/${params.id}`}
                                    >
                                        <button className="button is-success">
                                            Add section
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                        {schoolYear.status !== "Locked" && <hr />}

                        {schoolYear.courses.length == 0 ? (
                            <div className="has-text-centered p-4">
                                No sections found.
                            </div>
                        ) : (
                            schoolYear.courses.map(course => {
                                const { course_id, name, sections } = course;

                                const sectionsRender = sections.map(section => {
                                    const { section_id, name, subjects } =
                                        section;

                                    const subjectsRender = subjects.map(
                                        subject => {
                                            const {
                                                id,
                                                code,
                                                name,
                                                current_slot_count,
                                                max_slot_count
                                            } = subject;
                                            return (
                                                <div key={id}>
                                                    <div className="is-size-6 ml-4">
                                                        <div className="is-size-6 ml-1 mb-1 is-flex is-justify-content-space-between">
                                                            <div>
                                                                - {code}: {name}{" "}
                                                            </div>
                                                            <div>
                                                                {
                                                                    current_slot_count
                                                                }
                                                                /
                                                                {max_slot_count}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    );

                                    return (
                                        <div key={section_id} className="mb-4">
                                            <div className="is-size-6 ml-1 mb-1 is-flex is-justify-content-space-between">
                                                <div>
                                                    Section:{" "}
                                                    <span className="is-underlined">
                                                        {name}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span>
                                                        {schoolYear.status ===
                                                            "Active" && (
                                                            <button
                                                                className="button is-ghost"
                                                                onClick={() =>
                                                                    showConfirmDelete(
                                                                        section_id
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            {subjectsRender}
                                        </div>
                                    );
                                });

                                return (
                                    <div key={course_id}>
                                        <div className="is-size-5 has-text-weight-bold">
                                            {name}
                                        </div>
                                        {sectionsRender}
                                        <hr />
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            <ConfirmModal
                title="Delete School Year Section"
                description={`Are you sure do you want to delete this section school year?`}
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

export default SchoolYearSections;
