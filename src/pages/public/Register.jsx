import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "services/httpService";

const Register = () => {
    const [formData, setFormData] = useState({
        userType: 3,
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [formError, setFormError] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = e => {
        let { name, value } = e.target;
        if (name === "userType") {
            value = Number(value);
        }
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: "" });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        const { userType, name, email, password, confirmPassword } = formData;

        let hasError = false;
        const formError = {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        };

        if (name.trim() === "") {
            formError.name = "Name is required";
            hasError = true;
        }
        if (email.trim() === "") {
            formError.email = "Email is required";
            hasError = true;
        }
        if (password.trim() === "") {
            formError.password = "Password is required";
            hasError = true;
        }
        if (confirmPassword.trim() === "") {
            formError.confirmPassword = "Confirm password is required";
            hasError = true;
        }
        if (password !== confirmPassword) {
            formError.confirmPassword = "Password not match";
            hasError = true;
        }

        if (hasError) {
            setFormError(formError);
            alert("has error");
        } else {
            try {
                setFormError({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });

                setIsLoading(true);
                await http.get("/sanctum/csrf-cookie");
                await http.post("/register", {
                    user_type: userType,
                    name,
                    email,
                    password,
                    password_confirmation: confirmPassword
                });

                setFormData({
                    userType: 3,
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });

                window.location = "/login";
            } catch (error) {
                setFormError({
                    ...formError,
                    ...(error?.response?.data?.errors || {
                        confirmPassword: "Something went wrong!"
                    })
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const StudentForm = () => {
        return (
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
                                        //value={formData.lastname}
                                        //onChange={handleInputChange}
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
                                        //value={formData.firstname}
                                        //onChange={handleInputChange}
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
                                        //value={formData.middlename}
                                        //onChange={handleInputChange}
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
                                        //value={formData.extname}
                                        //onChange={handleInputChange}
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
                                        name="birthdate"
                                        className="input"
                                        type="date"
                                        //value={formData.birthdate}
                                        //onChange={handleInputChange}
                                    />
                                    {formError.birthdate && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.birthdate}
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
                                        <input type="radio" name="gender" />
                                        Male
                                    </label>
                                    <label className="radio">
                                        <input type="radio" name="gender" />
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
                                <span className="has-text-danger">*</span>{" "}
                                Address
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
                                        //value={formData.address}
                                        //onChange={handleInputChange}
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
                                        <select name="civilStatus">
                                            <option value="Single">
                                                Single
                                            </option>
                                            <option value="Married">
                                                Married
                                            </option>
                                        </select>
                                    </div>
                                    {formError.civilStatus && (
                                        <div>
                                            <span className="has-text-danger">
                                                {formError.civilStatus}
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
                                Contact no.
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
                                        //value={formData.contact}
                                        //onChange={handleInputChange}
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
                                        />
                                        Yes
                                    </label>
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="is_cabuyeno"
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
                                        />
                                        Yes
                                    </label>
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="is_registered_voter"
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
                                        />
                                        Yes
                                    </label>
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="is_fully_vaccinated"
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
                                <span className="has-text-danger">*</span>{" "}
                                Father's name
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
                                        //value={formData.father_name}
                                        //onChange={handleInputChange}
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
                                        //value={formData.father_occupation}
                                        //onChange={handleInputChange}
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
                                <span className="has-text-danger">*</span>{" "}
                                Contact No.
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
                                        //value={formData.father_contact}
                                        //onChange={handleInputChange}
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
                                        />
                                        Yes
                                    </label>
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="is_father_voter_of_cabuyao"
                                        />
                                        No
                                    </label>
                                </div>
                                {formError.is_father_voter_of_cabuyao && (
                                    <div>
                                        <span className="has-text-danger">
                                            {
                                                formError.is_father_voter_of_cabuyao
                                            }
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
                                Mother's maiden name
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
                                        //value={formData.mother_name}
                                        //onChange={handleInputChange}
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
                                        //value={formData.mother_occupation}
                                        //onChange={handleInputChange}
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
                                <span className="has-text-danger">*</span>{" "}
                                Contact No.
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
                                        //value={formData.mother_contact}
                                        //onChange={handleInputChange}
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
                                        />
                                        Yes
                                    </label>
                                    <label className="radio">
                                        <input
                                            type="radio"
                                            name="is_mother_voter_of_cabuyao"
                                        />
                                        No
                                    </label>
                                </div>
                                {formError.is_mother_voter_of_cabuyao && (
                                    <div>
                                        <span className="has-text-danger">
                                            {
                                                formError.is_mother_voter_of_cabuyao
                                            }
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
                                Living with parents
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="control">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_mother_voter_of_cabuyao"
                                    />
                                    Yes
                                </label>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="is_mother_voter_of_cabuyao"
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
                <div className="column is-6">
                    <div className="is-size-5 mb-2">Educational Background</div>

                    <div className="field is-horizontal">
                        <div className="field-label is-normal is-flex-grow-3">
                            <label className="label">
                                <span className="has-text-danger">*</span>{" "}
                                Highest educational attainment
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select name="education_attained">
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
                                        //value={formData.last_school_attended}
                                        //onChange={handleInputChange}
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
                                <span className="has-text-danger">*</span>{" "}
                                School address
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
                                        //value={formData.school_address}
                                        //onChange={handleInputChange}
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
                                        //value={formData.award_received}
                                        //onChange={handleInputChange}
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
                                        //value={formData.sh_school_strand}
                                        //onChange={handleInputChange}
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
                                <span className="has-text-danger">*</span>{" "}
                                Desired program
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <div className="select is-fullwidth">
                                        <select name="course_id">
                                            <option value="BSIT">BSIT</option>
                                            <option value="BSCpE">BSCpE</option>
                                        </select>
                                    </div>
                                </div>
                                {formError.name && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.name}
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
                                        type="text"
                                        placeholder="Enter email address"
                                        //value={formData.email}
                                        //onChange={handleInputChange}
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
                                <span className="has-text-danger">*</span> Last
                                name
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="name"
                                        className="input"
                                        type="text"
                                        placeholder="Enter last name"
                                        //value={formData.name}
                                        //onChange={handleInputChange}
                                    />
                                </div>
                                {formError.name && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.name}
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
                                name
                            </label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input
                                        name="name"
                                        className="input"
                                        type="text"
                                        placeholder="Enter last name"
                                        //value={formData.name}
                                        //onChange={handleInputChange}
                                    />
                                </div>
                                {formError.name && (
                                    <div>
                                        <span className="has-text-danger">
                                            {formError.name}
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

    return (
        <div style={{ marginTop: 100, marginBottom: 100 }}>
            <div className="container is-max-desktop">
                <form onSubmit={handleFormSubmit}>
                    <div className="box mb-4">
                        <div className="is-size-4 has-text-centered">
                            Register
                        </div>

                        <div className="field">
                            <label className="label">Register as</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        name="userType"
                                        value={formData.userType}
                                        onChange={handleInputChange}
                                    >
                                        <option value={3}>Student</option>
                                        <option value={4}>Teacher</option>
                                        <option value={5}>Non Teaching</option>
                                        <option value={6}>Registrar</option>
                                        <option value={7}>Dean</option>
                                        <option value={8}>
                                            Department Chair
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box">
                        <StudentForm />

                        <hr />

                        <button
                            className={`button is-success is-fullwidth ${
                                isLoading ? "is-loading" : ""
                            }`}
                            type="submit"
                        >
                            Register
                        </button>

                        <div className="has-text-centered mt-3">
                            Already a member ?{" "}
                            <span className="is-underlined">
                                <Link to="/login">Login</Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
