import { useEffect, useState } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const Dashboard = () => {
    const [announcements, setAnnouncements] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
            <h1 className="is-size-4 mb-4">Dashboard</h1>

            <div className="columns">
                {announcements.map(({ id, name, description }) => (
                    <div className="column is-4" key={id}>
                        <div className="hero is-info mb-4">
                            <div className="hero-body">
                                <p>
                                    <span className="icon">
                                        <i className="fa-solid fa-map-pin"></i>
                                    </span>{" "}
                                    Announcement
                                </p>
                                <p className="title">{name}</p>
                                <p className="subtitle">{description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Dashboard;
