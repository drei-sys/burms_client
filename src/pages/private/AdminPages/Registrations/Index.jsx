const Registrations = () => {
    return (
        <>
            <h1 className="is-size-4 mb-5">Registrations</h1>
            <div className="box">
                <div className="mb-4">{0} total for approval registrations</div>
                <table className="table is-fullwidth is-hoverable">
                    <thead>
                        <tr>
                            <th>User name</th>
                            <th style={{ width: 120 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div>
                                    <span className="has-text-weight-medium">
                                        Christian Andrei Papa
                                    </span>
                                </div>
                                <div>
                                    <span className="is-size-6">Student</span>
                                </div>
                            </td>
                            <td>
                                <button
                                    className="button mr-1"
                                    title="View profile"
                                >
                                    <span className="icon">
                                        <i className="fa-solid fa-eye"></i>
                                    </span>
                                </button>
                                <button
                                    className="button is-success mr-1"
                                    title="Approve"
                                >
                                    <span className="icon">
                                        <i className="fa-solid fa-check"></i>
                                    </span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Registrations;
