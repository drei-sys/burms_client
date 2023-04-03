const SchoolYear = () => {
    return (
        <>
            <h1 className="is-size-4 mb-5">School Year</h1>
            <div className="box">
                <div className="is-flex is-justify-content-space-between mb-4">
                    <div>{4} total school year</div>
                    <div>
                        <button className="button is-primary">
                            Add school year
                        </button>
                    </div>
                </div>
                <div>
                    <table className="table is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                <th>School year</th>
                                <th>Semester</th>
                                <th style={{ width: 196 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2022-2023</td>
                                <td>2nd</td>
                                <td>
                                    <button
                                        className="button mr-1"
                                        title="Edit School Year"
                                    >
                                        <span className="icon">
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </span>
                                    </button>
                                    <button
                                        className="button mr-1"
                                        title="Publish"
                                    >
                                        <span className="icon">
                                            <i className="fa-solid fa-upload"></i>
                                        </span>
                                    </button>
                                    <button
                                        className="button mr-1"
                                        title="Lock"
                                    >
                                        <span className="icon">
                                            <i className="fa-solid fa-lock"></i>
                                        </span>
                                    </button>
                                    <button
                                        className="button is-danger"
                                        title="Delete"
                                    >
                                        <span className="icon">
                                            <i className="fa-solid fa-trash"></i>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>2022-2023</td>
                                <td>1st</td>
                                <td style={{ textAlign: "right" }}>
                                    <button
                                        className="button mr-1"
                                        title="Add Section"
                                    >
                                        <span className="icon">
                                            <i className="fa-solid fa-plus"></i>
                                        </span>
                                    </button>
                                    <button className="button " title="Lock">
                                        <span className="icon">
                                            <i className="fa-solid fa-lock"></i>
                                        </span>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>2021-2022</td>
                                <td>2nd</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>2021-2022</td>
                                <td>1st</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default SchoolYear;
