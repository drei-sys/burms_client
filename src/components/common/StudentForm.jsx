const StudentForm = ({ formData, formError, onInputChange }) => {
    return (
        <div className="columns">
            <div className="column is-6">
                <div className="is-size-5 mb-2">Personal Info</div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">
                            <span className="has-text-danger">*</span> Last name
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
                            <span className="has-text-danger">*</span> Date of
                            Birth
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
                            <span className="has-text-danger">*</span> Gender
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
                                        checked={FormData.gender === "Female"}
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
                            <span className="has-text-danger">*</span> Address
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="address"
                                    className="input"
                                    type="text"
                                    placeholder="Address for Cabuyeños"
                                    value={formData.address}
                                    onChange={onInputChange}
                                />
                                {formError.address && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.address}
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
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
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
                            <span className="has-text-danger">*</span> Contact
                            no.
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="contact"
                                    className="input"
                                    type="text"
                                    placeholder="09XX XXXX XXX"
                                    value={formData.contact}
                                    onChange={onInputChange}
                                />
                                {formError.contact && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.contact}
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
                            <span className="has-text-danger">*</span> A
                            Cabuye&ntilde;o?
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_cabuyeno"
                                        checked={formData.is_cabuyeno === "Yes"}
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_cabuyeno",
                                                    value: "Yes"
                                                }
                                            })
                                        }
                                    />
                                    Yes
                                </label>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_cabuyeno"
                                        checked={formData.is_cabuyeno === "No"}
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_cabuyeno",
                                                    value: "No"
                                                }
                                            })
                                        }
                                    />
                                    No
                                </label>
                                {formError.is_cabuyeno && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.is_cabuyeno}
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
                            Registered Voter
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_registered_voter"
                                        checked={
                                            formData.is_registered_voter ===
                                            "Yes"
                                        }
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_registered_voter",
                                                    value: "Yes"
                                                }
                                            })
                                        }
                                    />
                                    Yes
                                </label>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_registered_voter"
                                        checked={
                                            formData.is_registered_voter ===
                                            "No"
                                        }
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_registered_voter",
                                                    value: "No"
                                                }
                                            })
                                        }
                                    />
                                    No
                                </label>
                                {formError.is_registered_voter && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.is_registered_voter}
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
                            <span className="has-text-danger">*</span> Fully
                            Vaccinated?
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_fully_vaccinated"
                                        checked={
                                            formData.is_fully_vaccinated ===
                                            "Yes"
                                        }
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_fully_vaccinated",
                                                    value: "Yes"
                                                }
                                            })
                                        }
                                    />
                                    Yes
                                </label>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_fully_vaccinated"
                                        checked={
                                            formData.is_fully_vaccinated ===
                                            "No"
                                        }
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_fully_vaccinated",
                                                    value: "No"
                                                }
                                            })
                                        }
                                    />
                                    No
                                </label>
                                {formError.is_fully_vaccinated && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.is_fully_vaccinated}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="is-size-5 mt-6 mb-2">Family Background</div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">
                            <span className="has-text-danger">*</span> Father's
                            name
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="father_name"
                                    className="input"
                                    type="text"
                                    placeholder="Last name, First name, Middle name"
                                    value={formData.father_name}
                                    onChange={onInputChange}
                                />
                            </div>
                            {formError.father_name && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.father_name}
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
                            Occupation
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="father_occupation"
                                    className="input"
                                    type="text"
                                    placeholder="Enter father occupation"
                                    value={formData.father_occupation}
                                    onChange={onInputChange}
                                />
                            </div>
                            {formError.father_occupation && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.father_occupation}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">
                            <span className="has-text-danger">*</span> Contact
                            No.
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="father_contact"
                                    className="input"
                                    type="text"
                                    placeholder="Enter father contact no."
                                    value={formData.father_contact}
                                    onChange={onInputChange}
                                />
                            </div>
                            {formError.father_contact && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.father_contact}
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
                            Registered voter of Cabuyao
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_father_voter_of_cabuyao"
                                        checked={
                                            formData.is_father_voter_of_cabuyao ===
                                            "Yes"
                                        }
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_father_voter_of_cabuyao",
                                                    value: "Yes"
                                                }
                                            })
                                        }
                                    />
                                    Yes
                                </label>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_father_voter_of_cabuyao"
                                        checked={
                                            formData.is_father_voter_of_cabuyao ===
                                            "No"
                                        }
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_father_voter_of_cabuyao",
                                                    value: "No"
                                                }
                                            })
                                        }
                                    />
                                    No
                                </label>
                            </div>
                            {formError.is_father_voter_of_cabuyao && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.is_father_voter_of_cabuyao}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">
                            <span className="has-text-danger">*</span> Mother's
                            maiden name
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="mother_name"
                                    className="input"
                                    type="text"
                                    placeholder="Last name, First name, Middle name"
                                    value={formData.mother_name}
                                    onChange={onInputChange}
                                />
                            </div>
                            {formError.mother_name && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.mother_name}
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
                            Occupation
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="mother_occupation"
                                    className="input"
                                    type="text"
                                    placeholder="Enter mother occupation"
                                    value={formData.mother_occupation}
                                    onChange={onInputChange}
                                />
                            </div>
                            {formError.mother_occupation && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.mother_occupation}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">
                            <span className="has-text-danger">*</span> Contact
                            No.
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="mother_contact"
                                    className="input"
                                    type="text"
                                    placeholder="Enter mother contact no."
                                    value={formData.mother_contact}
                                    onChange={onInputChange}
                                />
                            </div>
                            {formError.mother_contact && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.mother_contact}
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
                            Registered voter of Cabuyao
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_mother_voter_of_cabuyao"
                                        checked={
                                            formData.is_mother_voter_of_cabuyao ===
                                            "Yes"
                                        }
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_mother_voter_of_cabuyao",
                                                    value: "Yes"
                                                }
                                            })
                                        }
                                    />
                                    Yes
                                </label>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_mother_voter_of_cabuyao"
                                        checked={
                                            formData.is_mother_voter_of_cabuyao ===
                                            "No"
                                        }
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_mother_voter_of_cabuyao",
                                                    value: "No"
                                                }
                                            })
                                        }
                                    />
                                    No
                                </label>
                            </div>
                            {formError.is_mother_voter_of_cabuyao && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.is_mother_voter_of_cabuyao}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">
                            <span className="has-text-danger">*</span> Living
                            with parents
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_living_with_parents"
                                        checked={
                                            formData.is_living_with_parents ===
                                            "Yes"
                                        }
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_living_with_parents",
                                                    value: "Yes"
                                                }
                                            })
                                        }
                                    />
                                    Yes
                                </label>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_living_with_parents"
                                        checked={
                                            formData.is_living_with_parents ===
                                            "No"
                                        }
                                        onChange={() =>
                                            onInputChange({
                                                target: {
                                                    name: "is_living_with_parents",
                                                    value: "No"
                                                }
                                            })
                                        }
                                    />
                                    No
                                </label>
                            </div>
                            {formError.is_living_with_parents && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.is_living_with_parents}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-6">
                <div className="is-size-5 mb-2">Educational Background</div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">
                            <span className="has-text-danger">*</span> Highest
                            educational attainment
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        name="education_attained"
                                        value={formData.education_attained}
                                        onChange={onInputChange}
                                    >
                                        <option value="Graduate">
                                            Graduate
                                        </option>
                                        <option value="Bachelor Degree">
                                            Bachelor Degree
                                        </option>
                                        <option value="Senior High School">
                                            Senior High School
                                        </option>
                                    </select>
                                </div>
                            </div>
                            {formError.education_attained && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.education_attained}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">
                            <span className="has-text-danger">*</span> Last
                            school attended
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="last_school_attended"
                                    className="input"
                                    type="text"
                                    placeholder="Enter school"
                                    value={formData.last_school_attended}
                                    onChange={onInputChange}
                                />
                            </div>
                            {formError.last_school_attended && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.last_school_attended}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">
                            <span className="has-text-danger">*</span> School
                            address
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="school_address"
                                    className="input"
                                    type="text"
                                    placeholder="Enter school address"
                                    value={formData.school_address}
                                    onChange={onInputChange}
                                />
                            </div>
                            {formError.school_address && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.school_address}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">Awards received</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="award_received"
                                    className="input"
                                    type="text"
                                    placeholder="Enter award received"
                                    value={formData.award_received}
                                    onChange={onInputChange}
                                />
                            </div>
                            {formError.award_received && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.award_received}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">
                            <span className="has-text-danger">*</span> Your
                            taken Senior High School Strand
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input
                                    name="sh_school_strand"
                                    className="input"
                                    type="text"
                                    placeholder="Enter senior high school strand"
                                    value={formData.sh_school_strand}
                                    onChange={onInputChange}
                                />
                            </div>
                            {formError.sh_school_strand && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.sh_school_strand}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-label is-normal is-flex-grow-3">
                        <label className="label">
                            <span className="has-text-danger">*</span> Desired
                            program
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        name="course_id"
                                        value={formData.course_id}
                                        onChange={onInputChange}
                                    >
                                        <option value={1}>BSIT</option>
                                        <option value={2}>BSCpE</option>
                                    </select>
                                </div>
                            </div>
                            {formError.course_id && (
                                <div>
                                    <span className="has-text-danger">
                                        {formError.course_id}
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
                            <span className="has-text-danger">*</span> Password
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
                            <span className="has-text-danger">*</span> Confirm
                            password
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
    );
};

export default StudentForm;
