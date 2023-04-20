const NonTeachingDetails = ({ data }) => {
    const {
        lastname,
        firstname,
        middlename,
        extname,
        birth_date,
        birth_place,
        gender,
        civil_status,
        citizenship,

        house_number,
        street,
        subdivision,
        barangay,
        city,
        province,
        zipcode,
        gsis,
        pagibig,
        philhealth,
        sss,
        tin,
        agency_employee_no,
        email,
        user_type,

        elementary_school,
        elementary_remarks,
        secondary_school,
        secondary_remarks,
        vocational_school,
        vocational_remarks,
        college_school,
        college_remarks,
        graduate_studies_school,
        graduate_studies_remarks,

        work_experiences
    } = data;

    const workExperiences = JSON.parse(work_experiences);
    const {
        we_from_1,
        we_to_1,
        we_position_1,
        we_designation_1,
        we_monthly_salary_1
    } = workExperiences[0] || {};

    const {
        we_from_2,
        we_to_2,
        we_position_2,
        we_designation_2,
        we_monthly_salary_2
    } = workExperiences[1] || {};

    const {
        we_from_3,
        we_to_3,
        we_position_3,
        we_designation_3,
        we_monthly_salary_3
    } = workExperiences[2] || {};

    const {
        we_from_4,
        we_to_4,
        we_position_4,
        we_designation_4,
        we_monthly_salary_4
    } = workExperiences[3] || {};

    const {
        we_from_5,
        we_to_5,
        we_position_5,
        we_designation_5,
        we_monthly_salary_5
    } = workExperiences[4] || {};

    return (
        <>
            <div className="columns">
                <div className="column is-6">
                    <div className="is-size-5 mb-2 has-text-weight-bold">
                        Personal Info
                    </div>
                    <table className="table" style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td
                                    className="has-text-weight-medium"
                                    style={{ width: 180 }}
                                >
                                    Type
                                </td>
                                <td>{user_type}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Last name
                                </td>
                                <td>{lastname}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    First name
                                </td>
                                <td>{firstname}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Middle name
                                </td>
                                <td>{middlename || "-"}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Ext name
                                </td>
                                <td>{extname || "-"}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Birth date
                                </td>
                                <td>{birth_date}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Birth place
                                </td>
                                <td>{birth_place}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Gender
                                </td>
                                <td>{gender}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Civil status
                                </td>
                                <td>{civil_status}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Citizenship
                                </td>
                                <td>{citizenship}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Email
                                </td>
                                <td>{email}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="is-size-5 mb-2 has-text-weight-bold">
                        Address
                    </div>
                    <table className="table" style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td
                                    className="has-text-weight-medium"
                                    style={{ width: 180 }}
                                >
                                    House/Block/Lot
                                </td>
                                <td>{house_number}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Street
                                </td>
                                <td>{street}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Subdivision/Village
                                </td>
                                <td>{subdivision}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Barangay
                                </td>
                                <td>{barangay}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">City</td>
                                <td>{city}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Province
                                </td>
                                <td>{province}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Zip code
                                </td>
                                <td>{zipcode}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="column is-6">
                    <div className="is-size-5 mb-2 has-text-weight-bold">
                        ID's
                    </div>
                    <table className="table" style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td
                                    className="has-text-weight-medium"
                                    style={{ width: 180 }}
                                >
                                    GSIS ID no.
                                </td>
                                <td>{gsis}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    PAGIBIG ID no.
                                </td>
                                <td>{pagibig}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    PHILHEALTH ID no.
                                </td>
                                <td>{philhealth}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    SSS ID no.
                                </td>
                                <td>{sss}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    TIN ID no.
                                </td>
                                <td>{tin}</td>
                            </tr>
                            <tr>
                                <td className="has-text-weight-medium">
                                    Agency Employee no.
                                </td>
                                <td>{agency_employee_no || "-"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <hr />

            <div className="is-size-5 mb-2 has-text-weight-bold">
                Educational Background
            </div>
            <table className="table mb-4" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>Level</th>
                        <th>Name of School</th>
                        <th>Basic Education/Degree/Course</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Elementary</td>
                        <td>{elementary_school || "-"}</td>
                        <td>{elementary_remarks || "-"}</td>
                    </tr>
                    <tr>
                        <td>Secondary</td>
                        <td>{secondary_school || "-"}</td>
                        <td>{secondary_remarks || "-"}</td>
                    </tr>
                    <tr>
                        <td>Vocational / Trade Course</td>
                        <td>{vocational_school || "-"}</td>
                        <td>{vocational_remarks || "-"}</td>
                    </tr>
                    <tr>
                        <td>College</td>
                        <td>{college_school || "-"}</td>
                        <td>{college_remarks || "-"}</td>
                    </tr>
                    <tr>
                        <td>Graduate Studies</td>
                        <td>{graduate_studies_school || "-"}</td>
                        <td>{graduate_studies_remarks || "-"}</td>
                    </tr>
                </tbody>
            </table>

            <div className="is-size-5 mb-2 has-text-weight-bold">
                Work Experiences
            </div>
            <table className="table mb-2" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th style={{ width: 130 }}>From</th>
                        <th style={{ width: 130 }}>To</th>
                        <th>Position title</th>
                        <th>Designation</th>
                        <th>Monthly salary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{we_from_1 || "-"}</td>
                        <td>{we_to_1 || "-"}</td>
                        <td>{we_position_1 || "-"}</td>
                        <td>{we_designation_1 || "-"}</td>
                        <td>{we_monthly_salary_1 || "-"}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{we_from_2 || "-"}</td>
                        <td>{we_to_2 || "-"}</td>
                        <td>{we_position_2 || "-"}</td>
                        <td>{we_designation_2 || "-"}</td>
                        <td>{we_monthly_salary_2 || "-"}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>{we_from_3 || "-"}</td>
                        <td>{we_to_3 || "-"}</td>
                        <td>{we_position_3 || "-"}</td>
                        <td>{we_designation_3 || "-"}</td>
                        <td>{we_monthly_salary_3 || "-"}</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>{we_from_4 || "-"}</td>
                        <td>{we_to_4 || "-"}</td>
                        <td>{we_position_4 || "-"}</td>
                        <td>{we_designation_4 || "-"}</td>
                        <td>{we_monthly_salary_4 || "-"}</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>{we_from_5 || "-"}</td>
                        <td>{we_to_5 || "-"}</td>
                        <td>{we_position_5 || "-"}</td>
                        <td>{we_designation_5 || "-"}</td>
                        <td>{we_monthly_salary_5 || "-"}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default NonTeachingDetails;
