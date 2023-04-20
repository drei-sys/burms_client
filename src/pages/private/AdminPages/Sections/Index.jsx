import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const Sections = () => {
    const [refetchSectionsRef, setRefetchSectionsRef] = useState(0);
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    const { type: userType, status: userStatus } = useUserStore(state => state);

    useEffect(() => {
        const getSections = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/sections");
                setSections(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getSections();
    }, [refetchSectionsRef]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Sections</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    const showConfirmDelete = selectedId => {
        setSelectedSection(sections.find(({ id }) => id === selectedId));
        setIsOpenConfirmDelete(true);
    };

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            await http.delete(`/api/section/${selectedSection.id}`);
            setRefetchSectionsRef(Math.random());
        } catch (error) {
            alert("An error occured while deleting. Please try again.");
        } finally {
            setIsOpenConfirmDelete(false);
            setIsDeleteLoading(false);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Sections</h1>
            <div className="box">
                <div className="is-flex is-justify-content-space-between">
                    <div></div>
                    <div>
                        <Link
                            to={`/${
                                userType === "DeptChair"
                                    ? "deptChairCreateSection"
                                    : "createSection"
                            }`}
                        >
                            <button className="button is-success">
                                Create section
                            </button>
                        </Link>
                    </div>
                </div>
                <hr />
                <div>
                    {sections.length == 0 ? (
                        <div className="has-text-centered p-4">
                            No sections found.
                        </div>
                    ) : (
                        <>
                            <table className="table is-fullwidth is-hoverable">
                                <thead>
                                    <tr>
                                        <th>Section name</th>
                                        <th style={{ width: 120 }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sections.map(({ id, name }) => (
                                        <tr key={id}>
                                            <td>{name}</td>
                                            <td>
                                                <Link
                                                    to={`/${
                                                        userType === "DeptChair"
                                                            ? "deptChairUpdateSection"
                                                            : "updateSection"
                                                    }/${id}`}
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
                                {sections.length} total items
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ConfirmModal
                title="Delete Section"
                description={`Are you sure do you want to delete ${selectedSection?.name} section?`}
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

export default Sections;
