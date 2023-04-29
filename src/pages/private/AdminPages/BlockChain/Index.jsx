import { useEffect, useState } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import UserName from "components/common/UserName";

import http from "services/httpService";

const BlockChain = () => {
    const [users, setUsers] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/users");
                setUsers(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getUsers();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <>
            <h1 className="is-size-4 mb-4">BlockChain</h1>
            <div className="box">
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>User name</th>
                            <th>Hash</th>
                            <th>Block hash</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(
                            ({
                                id,
                                lastname,
                                firstname,
                                middlename,
                                extname,
                                user_type,
                                hash,
                                block_hash
                            }) => {
                                return (
                                    <tr key={id}>
                                        <td>
                                            <div>
                                                <span className="has-text-weight-medium">
                                                    <UserName
                                                        user={{
                                                            lastname,
                                                            firstname,
                                                            middlename,
                                                            extname
                                                        }}
                                                    />
                                                </span>
                                            </div>
                                            <div>
                                                <span className="is-size-6">
                                                    {user_type}
                                                </span>
                                            </div>
                                        </td>
                                        <td>{hash}</td>
                                        <td>{block_hash || "-"}</td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BlockChain;
