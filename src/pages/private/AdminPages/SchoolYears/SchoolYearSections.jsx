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
    const { type: userType } = useUserStore(state => state);

    useEffect(() => {
        const getSchoolYear = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get(
                    `/api/schoolYearSection/${params.id}`
                );

                const {
                    schoolYear,
                    schoolYearSections,
                    courses: courseList,
                    sections: sectionList,
                    subjects: subjectList
                } = data;

                let courses = [];
                schoolYearSections.forEach(schoolYearSection => {
                    const {
                        course_id,
                        section_id,
                        current_slot_count,
                        max_slot_count,
                        is_slot_full,
                        subjects: subjIds
                    } = schoolYearSection;

                    const course = courses.find(
                        ({ course_id: cId }) => cId === course_id
                    );

                    if (course) {
                        courses = courses.map(course => {
                            if (course.course_id === course_id) {
                                const section = sectionList.find(
                                    ({ id }) => id === section_id
                                );

                                const subjectIds = JSON.parse(subjIds);
                                const subjects = subjectIds.map(subjectId => {
                                    const subject = subjectList.find(
                                        ({ id }) => id === subjectId
                                    );
                                    return subject;
                                });

                                return {
                                    ...course,
                                    sections: [
                                        ...course.sections,
                                        {
                                            section_id: section.id,
                                            name: section.name,
                                            current_slot_count,
                                            max_slot_count,
                                            is_slot_full,
                                            subjects: subjects
                                        }
                                    ]
                                };
                            }
                            return course;
                        });
                    } else {
                        const course = courseList.find(
                            ({ id }) => id === course_id
                        );
                        const section = sectionList.find(
                            ({ id }) => id === section_id
                        );

                        const subjectIds = JSON.parse(subjIds);
                        const subjects = subjectIds.map(subjectId => {
                            const subject = subjectList.find(
                                ({ id }) => id === subjectId
                            );
                            return subject;
                        });

                        courses.push({
                            course_id,
                            name: course.name,
                            sections: [
                                {
                                    section_id: section.id,
                                    name: section.name,
                                    current_slot_count,
                                    max_slot_count,
                                    is_slot_full,
                                    subjects: subjects
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
            <h1 className="is-size-4 mb-5">
                <button
                    className="button is-ghost"
                    onClick={() =>
                        navigate(
                            `/${
                                userType === 8
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
                        {schoolYear.courses.length == 0 ? (
                            <div className="has-text-centered p-5">
                                No sections found.
                            </div>
                        ) : (
                            <div>
                                {schoolYear.courses.map(course => {
                                    const { course_id, name, sections } =
                                        course;

                                    const sectionsRender = sections.map(
                                        section => {
                                            const {
                                                section_id,
                                                name,
                                                subjects,
                                                current_slot_count,
                                                max_slot_count
                                            } = section;

                                            const subjectsRender = subjects.map(
                                                subject => {
                                                    const { id, code, name } =
                                                        subject;
                                                    return (
                                                        <div key={id}>
                                                            <div className="is-size-6 ml-4">
                                                                - {code}: {name}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            );

                                            return (
                                                <div key={section_id}>
                                                    <div className="is-size-6 ml-1 mb-1 is-flex is-justify-content-space-between	">
                                                        <div>
                                                            <span className="is-underlined">
                                                                {name}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="is-size-6">
                                                                (
                                                                {
                                                                    current_slot_count
                                                                }
                                                                /
                                                                {max_slot_count}
                                                                )
                                                            </span>
                                                            <span>
                                                                {schoolYear.status ===
                                                                    "active" && (
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
                                        }
                                    );

                                    return (
                                        <div key={course_id}>
                                            <div className="is-size-5 has-text-weight-bold">
                                                {name}
                                            </div>
                                            {sectionsRender}
                                            <hr />
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        <div>
                            {schoolYear.status !== "locked" && (
                                <Link
                                    to={`/${
                                        userType === 8
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
