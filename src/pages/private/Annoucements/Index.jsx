import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import ConfirmModal from "components/common/ConfirmModal";

import http from "services/httpService";

const Announcements = () => {
    const [refetchAnnouncementsRef, setRefetchAnnouncementsRef] = useState(0);
    const [announcements, setAnnouncements] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    useEffect(() => {
        const getAnnouncements = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/announcements");
                setAnnouncements(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getAnnouncements();
    }, [refetchAnnouncementsRef]);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const showConfirmDelete = selectedId => {
        setSelectedAnnouncement(
            announcements.find(({ id }) => id === selectedId)
        );
        setIsOpenConfirmDelete(true);
    };

    const handleDelete = async () => {
        try {
            setIsDeleteLoading(true);
            await http.delete(`/api/announcement/${selectedAnnouncement.id}`);
            setRefetchAnnouncementsRef(Math.random());
        } catch (error) {
            alert("An error occured while deleting. Please try again.");
        } finally {
            setIsOpenConfirmDelete(false);
            setIsDeleteLoading(false);
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">Announcements</h1>
            <div className="box">
                <div className="is-flex is-justify-content-space-between">
                    <div></div>
                    <div>
                        <Link to="/createAnnouncement">
                            <button className="button is-success">
                                Create announcement
                            </button>
                        </Link>
                    </div>
                </div>
                <hr />
                <div>
                    {announcements.length == 0 ? (
                        <div className="has-text-centered p-4">
                            No announcements found.
                        </div>
                    ) : (
                        <>
                            <table className="table is-fullwidth is-hoverable">
                                <thead>
                                    <tr>
                                        <th>Announcement name</th>
                                        <th style={{ width: 120 }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {announcements.map(({ id, name }) => (
                                        <tr key={id}>
                                            <td>{name}</td>
                                            <td>
                                                <Link
                                                    to={`/updateAnnouncement/${id}`}
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
                                {announcements.length} total items
                            </div>
                        </>
                    )}
                </div>
            </div>

            <ConfirmModal
                title="Delete Announcement"
                description={`Are you sure do you want to delete ${selectedAnnouncement?.name} announcement?`}
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

export default Announcements;
