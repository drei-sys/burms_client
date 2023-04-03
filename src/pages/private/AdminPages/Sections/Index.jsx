import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import http from "services/httpService";

const Sections = () => {
    const [refetchSectionsRef, setRefetchSectionsRef] = useState(0);
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

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
            <h1 className="is-size-4 mb-5">Sections</h1>
            <div className="box">
                <div className="is-flex is-justify-content-space-between mb-4">
                    <div>{sections.length} total sections</div>
                    <div>
                        <Link to="/createSection">
                            <button className="button is-primary">
                                Add section
                            </button>
                        </Link>
                    </div>
                </div>
                <div>
                    {sections.length == 0 ? (
                        <div className="has-text-centered p-5">
                            No sections found.
                        </div>
                    ) : (
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
                                            <Link to={`/updateSection/${id}`}>
                                                <button
                                                    className="button mr-1"
                                                    title="Edit"
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
