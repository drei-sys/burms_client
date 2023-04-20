const NonTeachingForm = ({ formData, formError, onInputChange }) => {
    return (
        <>
            <div className="columns">
                <div className="column is-6">
                    <div className="is-size-5 mb-2">Personal Info</div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span> Last
                                name
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="lastname"
                                        className="input"
                                        type="text"
                                        placeholder="Enter last name"
                                        value={formData.lastname}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.lastname && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.lastname}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span> First
                                name
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="firstname"
                                        className="input"
                                        type="text"
                                        placeholder="Enter first name"
                                        value={formData.firstname}
                                        onChange={onInputChange}
                                    />
                                    {formError.firstname && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.firstname}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">Middle name</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="middlename"
                                        className="input"
                                        type="text"
                                        placeholder="Enter middle name"
                                        value={formData.middlename}
                                        onChange={onInputChange}
                                    />
                                    {formError.middlename && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.middlename}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">Extension name</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="extname"
                                        className="input"
                                        type="text"
                                        placeholder="JR., SR., III"
                                        value={formData.extname}
                                        onChange={onInputChange}
                                    />
                                    {formError.extname && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.extname}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span> Date
                                of Birth
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="birth_date"
                                        className="input"
                                        type="date"
                                        value={formData.birth_date}
                                        onChange={onInputChange}
                                    />
                                    {formError.birth_date && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.birth_date}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span> Place
                                of birth
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="birth_place"
                                        className="input"
                                        type="text"
                                        placeholder="Place of birth"
                                        value={formData.birth_place}
                                        onChange={onInputChange}
                                    />
                                    {formError.birth_place && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.birth_place}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span>{" "}
                                Gender
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="gender"
                                            checked={formData.gender === "Male"}
                                            onChange={() =>
                                                onInputChange({
                                                    target: {
                                                        name: "gender",
                                                        value: "Male"
                                                    }
                                                })
                                            }
                                        />
                                        Male
                                    </label>
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="gender"
                                            checked={
                                                formData.gender === "Female"
                                            }
                                            onChange={() =>
                                                onInputChange({
                                                    target: {
                                                        name: "gender",
                                                        value: "Female"
                                                    }
                                                })
                                            }
                                        />
                                        Female
                                    </label>
                                    {formError.gender && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.gender}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span> Civil
                                status
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select
                                            name="civil_status"
                                            value={formData.civil_status}
                                            onChange={onInputChange}
                                        >
                                            <option value="Single">
                                                Single
                                            </option>
                                            <option value="Married">
                                                Married
                                            </option>
                                        </select>
                                    </div>
                                    {formError.civil_status && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.civil_status}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                {" "}
                                <span className="has-text-danger">*</span>{" "}
                                Citizenship
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="citizenship"
                                        className="input"
                                        type="text"
                                        placeholder="Enter middle name"
                                        value={formData.citizenship}
                                        onChange={onInputChange}
                                    />
                                    {formError.citizenship && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.citizenship}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="is-size-5 mb-2">Address</div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span>{" "}
                                House/Block/Lot
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="house_number"
                                        className="input"
                                        type="text"
                                        placeholder="House/Block/Lot no."
                                        value={formData.house_number}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.house_number && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.house_number}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span>{" "}
                                Street
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="street"
                                        className="input"
                                        type="text"
                                        placeholder="Enter street"
                                        value={formData.street}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.street && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.street}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span>{" "}
                                Subdivision/Village
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="subdivision"
                                        className="input"
                                        type="text"
                                        placeholder="Subdivision/Village"
                                        value={formData.subdivision}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.subdivision && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.subdivision}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span>{" "}
                                Barangay
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="barangay"
                                        className="input"
                                        type="text"
                                        placeholder="Enter barangay"
                                        value={formData.barangay}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.barangay && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.barangay}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span> City
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="city"
                                        className="input"
                                        type="text"
                                        placeholder="Enter city"
                                        value={formData.city}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.city && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.city}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span>{" "}
                                Province
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="province"
                                        className="input"
                                        type="text"
                                        placeholder="Enter province"
                                        value={formData.province}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.province && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.province}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span> Zip
                                code
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="zipcode"
                                        className="input"
                                        type="text"
                                        placeholder="Enter zip code"
                                        value={formData.zipcode}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.zipcode && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.zipcode}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-6">
                    <div className="is-size-5 mb-2">ID's</div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span> GSIS
                                ID no.
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="gsis"
                                        className="input"
                                        type="text"
                                        placeholder="Enter GSIS id no."
                                        value={formData.gsis}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.gsis && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.gsis}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span>{" "}
                                PAGIBIG ID no.
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="pagibig"
                                        className="input"
                                        type="text"
                                        placeholder="Enter PAGIBIG no."
                                        value={formData.pagibig}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.pagibig && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.pagibig}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span>{" "}
                                PHILHEALTH ID no.
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="philhealth"
                                        className="input"
                                        type="text"
                                        placeholder="Enter PHILHEALTH no."
                                        value={formData.philhealth}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.philhealth && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.philhealth}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span> SSS
                                ID no.
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="sss"
                                        className="input"
                                        type="text"
                                        placeholder="Enter SSS No."
                                        value={formData.sss}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.sss && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.sss}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span> TIN
                                ID no.
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="tin"
                                        className="input"
                                        type="text"
                                        placeholder="Enter TIN no."
                                        value={formData.tin}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.tin && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.tin}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">Agency Employee no.</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="agency_employee_no"
                                        className="input"
                                        type="text"
                                        placeholder="Enter agency employee no."
                                        value={formData.agency_employee_no}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.agency_employee_no && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.agency_employee_no}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="is-size-5 mt-6 mb-2">Account Info</div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span> Email
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="email"
                                        className="input"
                                        type="email"
                                        placeholder="Enter email address"
                                        value={formData.email}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.email && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.email}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span>{" "}
                                Password
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="password"
                                        className="input"
                                        type="password"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.password && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.password}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span>{" "}
                                Confirm password
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="password_confirmation"
                                        className="input"
                                        type="password"
                                        placeholder="Confirm password"
                                        value={formData.password_confirmation}
                                        onChange={onInputChange}
                                    />
                                </div>
                                {formError.password_confirmation && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.password_confirmation}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="is-size-5 mb-2">Educational Background</div>
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
                        <td>
                            <input
                                name="elementary_school"
                                className="input"
                                type="text"
                                placeholder="Enter school name"
                                value={formData.elementary_school}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="elementary_remarks"
                                className="input"
                                type="text"
                                placeholder="Basic Education/Degree/Course"
                                value={formData.elementary_remarks}
                                onChange={onInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Secondary</td>
                        <td>
                            <input
                                name="secondary_school"
                                className="input"
                                type="text"
                                placeholder="Enter school name"
                                value={formData.secondary_school}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="secondary_remarks"
                                className="input"
                                type="text"
                                placeholder="Basic Education/Degree/Course"
                                value={formData.secondary_remarks}
                                onChange={onInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Vocational / Trade Course</td>
                        <td>
                            <input
                                name="vocational_school"
                                className="input"
                                type="text"
                                placeholder="Enter school name"
                                value={formData.vocational_school}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="vocational_remarks"
                                className="input"
                                type="text"
                                placeholder="Basic Education/Degree/Course"
                                value={formData.vocational_remarks}
                                onChange={onInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>College</td>
                        <td>
                            <input
                                name="college_school"
                                className="input"
                                type="text"
                                placeholder="Enter school name"
                                value={formData.college_school}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="college_remarks"
                                className="input"
                                type="text"
                                placeholder="Basic Education/Degree/Course"
                                value={formData.college_remarks}
                                onChange={onInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Graduate Studies</td>
                        <td>
                            <input
                                name="graduate_studies_school"
                                className="input"
                                type="text"
                                placeholder="Enter school name"
                                value={formData.graduate_studies_school}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="graduate_studies_remarks"
                                className="input"
                                type="text"
                                placeholder="Basic Education/Degree/Course"
                                value={formData.graduate_studies_remarks}
                                onChange={onInputChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="is-size-5 mb-2">Work Experiences</div>
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
                        <td>
                            <input
                                name="we_from_1"
                                className="input"
                                type="date"
                                value={formData.we_from_1}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_to_1"
                                className="input"
                                type="date"
                                value={formData.we_to_1}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_position_1"
                                className="input"
                                type="input"
                                placeholder="Enter position"
                                value={formData.we_position_1}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_designation_1"
                                className="input"
                                type="input"
                                placeholder="Dept./Agency/Office/Company"
                                value={formData.we_designation_1}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_monthly_salary_1"
                                className="input"
                                type="input"
                                placeholder="Enter salary"
                                value={formData.we_monthly_salary_1}
                                onChange={onInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>
                            <input
                                name="we_from_2"
                                className="input"
                                type="date"
                                value={formData.we_from_2}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_to_2"
                                className="input"
                                type="date"
                                value={formData.we_to_2}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_position_2"
                                className="input"
                                type="input"
                                placeholder="Enter position"
                                value={formData.we_position_2}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_designation_2"
                                className="input"
                                type="input"
                                placeholder="Dept./Agency/Office/Company"
                                value={formData.we_designation_2}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_monthly_salary_2"
                                className="input"
                                type="input"
                                placeholder="Enter salary"
                                value={formData.we_monthly_salary_2}
                                onChange={onInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>
                            <input
                                name="we_from_3"
                                className="input"
                                type="date"
                                value={formData.we_from_3}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_to_3"
                                className="input"
                                type="date"
                                value={formData.we_to_3}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_position_3"
                                className="input"
                                type="input"
                                placeholder="Enter position"
                                value={formData.we_position_3}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_designation_3"
                                className="input"
                                type="input"
                                placeholder="Dept./Agency/Office/Company"
                                value={formData.we_designation_3}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_monthly_salary_3"
                                className="input"
                                type="input"
                                placeholder="Enter salary"
                                value={formData.we_monthly_salary_3}
                                onChange={onInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>
                            <input
                                name="we_from_4"
                                className="input"
                                type="date"
                                value={formData.we_from_4}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_to_4"
                                className="input"
                                type="date"
                                value={formData.we_to_4}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_position_4"
                                className="input"
                                type="input"
                                placeholder="Enter position"
                                value={formData.we_position_4}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_designation_4"
                                className="input"
                                type="input"
                                placeholder="Dept./Agency/Office/Company"
                                value={formData.we_designation_4}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_monthly_salary_4"
                                className="input"
                                type="input"
                                placeholder="Enter salary"
                                value={formData.we_monthly_salary_4}
                                onChange={onInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>
                            <input
                                name="we_from_5"
                                className="input"
                                type="date"
                                value={formData.we_from_5}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_to_5"
                                className="input"
                                type="date"
                                value={formData.we_to_5}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_position_5"
                                className="input"
                                type="input"
                                placeholder="Enter position"
                                value={formData.we_position_5}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_designation_5"
                                className="input"
                                type="input"
                                placeholder="Dept./Agency/Office/Company"
                                value={formData.we_designation_5}
                                onChange={onInputChange}
                            />
                        </td>
                        <td>
                            <input
                                name="we_monthly_salary_5"
                                className="input"
                                type="input"
                                placeholder="Enter salary"
                                value={formData.we_monthly_salary_5}
                                onChange={onInputChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default NonTeachingForm;
