import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import StudentForm from "components/common/StudentForm";
import NonTeachingForm from "components/common/NonTeachingForm";

import { useUserStore } from "store/userStore";

import http from "services/httpService";

const UpdateProfile = () => {
    const [user, setUser] = useState(null);

    const [courses, setCourses] = useState([]);

    const [studentFormData, setStudentFormData] = useState({
        lastname: "",
        firstname: "",
        middlename: "",
        extname: "",
        birth_date: "",
        birth_place: "",
        gender: "",
        address: "",
        civil_status: "Single",
        contact: "",
        is_cabuyeno: "",
        is_registered_voter: "",
        is_fully_vaccinated: "",
        father_name: "",
        father_occupation: "",
        father_contact: "",
        is_father_voter_of_cabuyao: "",
        mother_name: "",
        mother_occupation: "",
        mother_contact: "",
        is_mother_voter_of_cabuyao: "",
        is_living_with_parents: "",
        education_attained: "Graduate",
        last_school_attended: "",
        school_address: "",
        award_received: "",
        sh_school_strand: "",
        course_id: 0,
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [studentFormError, setStudentFormError] = useState({
        lastname: "",
        firstname: "",
        middlename: "",
        extname: "",
        birth_date: "",
        birth_place: "",
        gender: "",
        address: "",
        civil_status: "",
        contact: "",
        is_cabuyeno: "",
        is_registered_voter: "",
        is_fully_vaccinated: "",
        father_name: "",
        father_occupation: "",
        father_contact: "",
        is_father_voter_of_cabuyao: "",
        mother_name: "",
        mother_occupation: "",
        mother_contact: "",
        is_mother_voter_of_cabuyao: "",
        is_living_with_parents: "",
        education_attained: "",
        last_school_attended: "",
        school_address: "",
        award_received: "",
        sh_school_strand: "",
        course_id: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [nonTeachingFormData, setNonTeachingFormData] = useState({
        lastname: "",
        firstname: "",
        middlename: "",
        extname: "",
        birth_date: "",
        birth_place: "",
        gender: "",
        civil_status: "Single",
        citizenship: "Filipino",
        house_number: "",
        street: "",
        subdivision: "",
        barangay: "",
        city: "",
        province: "",
        zipcode: "",
        gsis: "",
        pagibig: "",
        philhealth: "",
        sss: "",
        tin: "",
        agency_employee_no: "",
        email: "",
        password: "",
        password_confirmation: "",

        elementary_school: "",
        elementary_remarks: "",
        secondary_school: "",
        secondary_remarks: "",
        vocational_school: "",
        vocational_remarks: "",
        college_school: "",
        college_remarks: "",
        graduate_studies_school: "",
        graduate_studies_remarks: "",
        we_from_1: "",
        we_to_1: "",
        we_position_1: "",
        we_designation_1: "",
        we_monthly_salary_1: "",
        we_from_2: "",
        we_to_2: "",
        we_position_2: "",
        we_designation_2: "",
        we_monthly_salary_2: "",
        we_from_3: "",
        we_to_3: "",
        we_position_3: "",
        we_designation_3: "",
        we_monthly_salary_3: "",
        we_from_4: "",
        we_to_4: "",
        we_position_4: "",
        we_designation_4: "",
        we_monthly_salary_4: "",
        we_from_5: "",
        we_to_5: "",
        we_position_5: "",
        we_designation_5: "",
        we_monthly_salary_5: ""
    });

    const [nonTeachingFormError, setNonTeachingFormError] = useState({
        lastname: "",
        firstname: "",
        middlename: "",
        extname: "",
        birth_date: "",
        birth_place: "",
        gender: "",
        civil_status: "",
        citizenship: "",
        house_number: "",
        street: "",
        subdivision: "",
        barangay: "",
        city: "",
        province: "",
        zipcode: "",
        gsis: "",
        pagibig: "",
        philhealth: "",
        sss: "",
        tin: "",
        agency_employee_no: "",
        email: "",
        password: "",
        password_confirmation: "",

        elementary_school: "",
        elementary_remarks: "",
        secondary_school: "",
        secondary_remarks: "",
        vocational_school: "",
        vocational_remarks: "",
        college_school: "",
        college_remarks: "",
        graduate_studies_school: "",
        graduate_studies_remarks: "",
        we_from_1: "",
        we_to_1: "",
        we_position_1: "",
        we_designation_1: "",
        we_monthly_salary_1: "",
        we_from_2: "",
        we_to_2: "",
        we_position_2: "",
        we_designation_2: "",
        we_monthly_salary_2: "",
        we_from_3: "",
        we_to_3: "",
        we_position_3: "",
        we_designation_3: "",
        we_monthly_salary_3: "",
        we_from_4: "",
        we_to_4: "",
        we_position_4: "",
        we_designation_4: "",
        we_monthly_salary_4: "",
        we_from_5: "",
        we_to_5: "",
        we_position_5: "",
        we_designation_5: "",
        we_monthly_salary_5: ""
    });

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNotEditable, setIsNotEditable] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { status: userStatus, type: userType } = useUserStore(state => state);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: user } = await http.get(`/api/userDetails`);
                const { data: courses } = await http.get("/api/courses");
                if (user.status !== "Editable") {
                    setIsNotEditable(true);
                } else {
                    setUser(user);

                    if (userType === "Student") {
                        setStudentFormData({
                            ...user
                        });
                    } else {
                        const { work_experiences } = user;

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

                        setNonTeachingFormData({
                            ...user,
                            we_from_1,
                            we_to_1,
                            we_position_1,
                            we_designation_1,
                            we_monthly_salary_1,
                            we_from_2,
                            we_to_2,
                            we_position_2,
                            we_designation_2,
                            we_monthly_salary_2,
                            we_from_3,
                            we_to_3,
                            we_position_3,
                            we_designation_3,
                            we_monthly_salary_3,
                            we_from_4,
                            we_to_4,
                            we_position_4,
                            we_designation_4,
                            we_monthly_salary_4,
                            we_from_5,
                            we_to_5,
                            we_position_5,
                            we_designation_5,
                            we_monthly_salary_5
                        });
                    }

                    //setFormData({ name: data.name });
                    setCourses(courses);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getUser();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (isNotEditable) {
        return (
            <div className="notification is-warning my-4">
                Your profile is prohibited from editing.
            </div>
        );
    }

    if (userStatus === "For Verification") {
        return (
            <div className="notification is-warning my-4">
                Your account is pending for admin verification.
            </div>
        );
    }

    const handleStudentInputChange = e => {
        let { name, value } = e.target;
        setStudentFormData({ ...studentFormData, [name]: value });
        setStudentFormError({ ...studentFormError, [name]: "" });
    };

    const handleNonTeachingInputChange = e => {
        let { name, value } = e.target;
        setNonTeachingFormData({ ...nonTeachingFormData, [name]: value });
        setNonTeachingFormError({ ...nonTeachingFormError, [name]: "" });
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        if (userType === "Student") {
            const {
                lastname,
                firstname,
                birth_date,
                birth_place,
                gender,
                address,
                civil_status,
                contact,
                is_cabuyeno,
                is_registered_voter,
                is_fully_vaccinated,
                father_name,
                father_occupation,
                father_contact,
                is_father_voter_of_cabuyao,
                mother_name,
                mother_occupation,
                mother_contact,
                is_mother_voter_of_cabuyao,
                is_living_with_parents,
                education_attained,
                last_school_attended,
                school_address,
                award_received,
                sh_school_strand,
                course_id
            } = studentFormData;

            let hasError = false;
            const studentFormError = {
                lastname: "",
                firstname: "",
                birth_date: "",
                birth_place: "",
                gender: "",
                address: "",
                civil_status: "",
                contact: "",
                is_cabuyeno: "",
                is_registered_voter: "",
                is_fully_vaccinated: "",
                father_name: "",
                father_occupation: "",
                father_contact: "",
                is_father_voter_of_cabuyao: "",
                mother_name: "",
                mother_occupation: "",
                mother_contact: "",
                is_mother_voter_of_cabuyao: "",
                is_living_with_parents: "",
                education_attained: "",
                last_school_attended: "",
                school_address: "",
                award_received: "",
                sh_school_strand: "",
                course_id: ""
            };

            if (lastname.trim() === "") {
                studentFormError.lastname = "This is required";
                hasError = true;
            }
            if (firstname.trim() === "") {
                studentFormError.firstname = "This is required";
                hasError = true;
            }
            if (birth_date.trim() === "") {
                studentFormError.birth_date = "This is required";
                hasError = true;
            }
            if (birth_place.trim() === "") {
                studentFormError.birth_place = "This is required";
                hasError = true;
            }
            if (gender.trim() === "") {
                studentFormError.gender = "This is required";
                hasError = true;
            }
            if (address.trim() === "") {
                studentFormError.address = "This is required";
                hasError = true;
            }
            if (civil_status.trim() === "") {
                studentFormError.civil_status = "This is required";
                hasError = true;
            }
            if (contact.trim() === "") {
                studentFormError.contact = "This is required";
                hasError = true;
            }
            if (is_cabuyeno.trim() === "") {
                studentFormError.is_cabuyeno = "This is required";
                hasError = true;
            }
            if (is_registered_voter.trim() === "") {
                studentFormError.is_registered_voter = "This is required";
                hasError = true;
            }
            if (is_fully_vaccinated.trim() === "") {
                studentFormError.is_fully_vaccinated = "This is required";
                hasError = true;
            }
            if (father_name.trim() === "") {
                studentFormError.father_name = "This is required";
                hasError = true;
            }
            if (father_occupation.trim() === "") {
                studentFormError.father_occupation = "This is required";
                hasError = true;
            }
            if (father_contact.trim() === "") {
                studentFormError.father_contact = "This is required";
                hasError = true;
            }
            if (is_father_voter_of_cabuyao.trim() === "") {
                studentFormError.is_father_voter_of_cabuyao =
                    "This is required";
                hasError = true;
            }
            if (mother_name.trim() === "") {
                studentFormError.mother_name = "This is required";
                hasError = true;
            }
            if (mother_occupation.trim() === "") {
                studentFormError.mother_occupation = "This is required";
                hasError = true;
            }
            if (mother_contact.trim() === "") {
                studentFormError.mother_contact = "This is required";
                hasError = true;
            }
            if (is_mother_voter_of_cabuyao.trim() === "") {
                studentFormError.is_mother_voter_of_cabuyao =
                    "This is required";
                hasError = true;
            }
            if (is_living_with_parents.trim() === "") {
                studentFormError.is_living_with_parents = "This is required";
                hasError = true;
            }
            if (education_attained.trim() === "") {
                studentFormError.education_attained = "This is required";
                hasError = true;
            }
            if (last_school_attended.trim() === "") {
                studentFormError.last_school_attended = "This is required";
                hasError = true;
            }
            if (school_address.trim() === "") {
                studentFormError.school_address = "This is required";
                hasError = true;
            }
            if (award_received.trim() === "") {
                studentFormError.award_received = "This is required";
                hasError = true;
            }
            if (sh_school_strand.trim() === "") {
                studentFormError.sh_school_strand = "This is required";
                hasError = true;
            }
            if (Number(course_id) === 0) {
                studentFormError.course_id = "This is required";
                hasError = true;
            }

            if (hasError) {
                setStudentFormError(studentFormError);
                alert("There's an error in the form. Please check.");
            } else {
                try {
                    setStudentFormError({
                        lastname: "",
                        firstname: "",
                        birth_date: "",
                        birth_place: "",
                        gender: "",
                        address: "",
                        civil_status: "",
                        contact: "",
                        is_cabuyeno: "",
                        is_registered_voter: "",
                        is_fully_vaccinated: "",
                        father_name: "",
                        father_occupation: "",
                        father_contact: "",
                        is_father_voter_of_cabuyao: "",
                        mother_name: "",
                        mother_occupation: "",
                        mother_contact: "",
                        is_mother_voter_of_cabuyao: "",
                        is_living_with_parents: "",
                        education_attained: "",
                        last_school_attended: "",
                        school_address: "",
                        award_received: "",
                        sh_school_strand: "",
                        course_id: "",
                        email: "",
                        password: "",
                        password_confirmation: ""
                    });

                    setIsLoading(true);

                    await http.put(`/api/userDetails/${user.id}`, {
                        ...studentFormData
                    });

                    navigate("/profile");
                } catch (error) {
                    setStudentFormError({
                        ...studentFormError,
                        ...(error?.response?.data?.errors || {
                            course_id: "Something went wrong!"
                        })
                    });
                } finally {
                    setIsLoading(false);
                }
            }
        } else {
            const {
                lastname,
                firstname,
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

                we_from_1,
                we_to_1,
                we_position_1,
                we_designation_1,
                we_monthly_salary_1,
                we_from_2,
                we_to_2,
                we_position_2,
                we_designation_2,
                we_monthly_salary_2,
                we_from_3,
                we_to_3,
                we_position_3,
                we_designation_3,
                we_monthly_salary_3,
                we_from_4,
                we_to_4,
                we_position_4,
                we_designation_4,
                we_monthly_salary_4,
                we_from_5,
                we_to_5,
                we_position_5,
                we_designation_5,
                we_monthly_salary_5
            } = nonTeachingFormData;

            let hasError = false;
            const nonTeachingFormError = {
                lastname: "",
                firstname: "",
                birth_date: "",
                birth_place: "",
                gender: "",
                civil_status: "",
                citizenship: "",
                house_number: "",
                street: "",
                subdivision: "",
                barangay: "",
                city: "",
                province: "",
                zipcode: "",
                gsis: "",
                pagibig: "",
                philhealth: "",
                sss: "",
                tin: ""
            };

            if (lastname.trim() === "") {
                nonTeachingFormError.lastname = "This is required";
                hasError = true;
            }
            if (firstname.trim() === "") {
                nonTeachingFormError.firstname = "This is required";
                hasError = true;
            }
            if (birth_date.trim() === "") {
                nonTeachingFormError.birth_date = "This is required";
                hasError = true;
            }
            if (birth_place.trim() === "") {
                nonTeachingFormError.birth_place = "This is required";
                hasError = true;
            }
            if (gender.trim() === "") {
                nonTeachingFormError.gender = "This is required";
                hasError = true;
            }
            if (civil_status.trim() === "") {
                nonTeachingFormError.civil_status = "This is required";
                hasError = true;
            }
            if (citizenship.trim() === "") {
                nonTeachingFormError.citizenship = "This is required";
                hasError = true;
            }
            if (house_number.trim() === "") {
                nonTeachingFormError.house_number = "This is required";
                hasError = true;
            }
            if (street.trim() === "") {
                nonTeachingFormError.street = "This is required";
                hasError = true;
            }
            if (subdivision.trim() === "") {
                nonTeachingFormError.subdivision = "This is required";
                hasError = true;
            }
            if (barangay.trim() === "") {
                nonTeachingFormError.barangay = "This is required";
                hasError = true;
            }
            if (city.trim() === "") {
                nonTeachingFormError.city = "This is required";
                hasError = true;
            }
            if (province.trim() === "") {
                nonTeachingFormError.province = "This is required";
                hasError = true;
            }
            if (zipcode.trim() === "") {
                nonTeachingFormError.zipcode = "This is required";
                hasError = true;
            }
            if (gsis.trim() === "") {
                nonTeachingFormError.gsis = "This is required";
                hasError = true;
            }
            if (pagibig.trim() === "") {
                nonTeachingFormError.pagibig = "This is required";
                hasError = true;
            }
            if (philhealth.trim() === "") {
                nonTeachingFormError.philhealth = "This is required";
                hasError = true;
            }
            if (sss.trim() === "") {
                nonTeachingFormError.sss = "This is required";
                hasError = true;
            }
            if (tin.trim() === "") {
                nonTeachingFormError.tin = "This is required";
                hasError = true;
            }

            if (hasError) {
                setNonTeachingFormError(nonTeachingFormError);
                alert("There's an error in the form. Please check.");
            } else {
                try {
                    setNonTeachingFormError({
                        lastname: "",
                        firstname: "",
                        birth_date: "",
                        birth_place: "",
                        gender: "",
                        civil_status: "",
                        citizenship: "",
                        house_number: "",
                        street: "",
                        subdivision: "",
                        barangay: "",
                        city: "",
                        province: "",
                        zipcode: "",
                        gsis: "",
                        pagibig: "",
                        philhealth: "",
                        sss: "",
                        tin: ""
                    });

                    setIsLoading(true);

                    const work_experiences = [
                        {
                            we_from_1,
                            we_to_1,
                            we_position_1,
                            we_designation_1,
                            we_monthly_salary_1
                        },
                        {
                            we_from_2,
                            we_to_2,
                            we_position_2,
                            we_designation_2,
                            we_monthly_salary_2
                        },
                        {
                            we_from_3,
                            we_to_3,
                            we_position_3,
                            we_designation_3,
                            we_monthly_salary_3
                        },
                        {
                            we_from_4,
                            we_to_4,
                            we_position_4,
                            we_designation_4,
                            we_monthly_salary_4
                        },
                        {
                            we_from_5,
                            we_to_5,
                            we_position_5,
                            we_designation_5,
                            we_monthly_salary_5
                        }
                    ];

                    await http.put(`/api/userDetails/${user.id}`, {
                        ...nonTeachingFormData,
                        work_experiences: JSON.stringify(work_experiences)
                    });

                    navigate("/profile");
                } catch (error) {
                    setNonTeachingFormError({
                        ...nonTeachingFormError,
                        ...(error?.response?.data?.errors || {
                            password_confirmation: "Something went wrong!"
                        })
                    });
                } finally {
                    setIsLoading(false);
                }
            }
        }
    };

    return (
        <>
            <h1 className="is-size-4 mb-4">
                <button
                    className="button is-ghost"
                    onClick={() => navigate("/profile")}
                >
                    <i className="fa-solid fa-arrow-left"></i>
                </button>{" "}
                Update Profile
            </h1>

            <div className="box">
                <form onSubmit={handleFormSubmit}>
                    {userType === "Student" ? (
                        <StudentForm
                            formData={studentFormData}
                            formError={studentFormError}
                            courses={courses}
                            mode="update"
                            onInputChange={handleStudentInputChange}
                        />
                    ) : (
                        <NonTeachingForm
                            formData={nonTeachingFormData}
                            formError={nonTeachingFormError}
                            mode="update"
                            onInputChange={handleNonTeachingInputChange}
                        />
                    )}
                    <hr />
                    <button
                        className={`button is-success  ${
                            isLoading ? "is-loading" : ""
                        }`}
                        type="submit"
                    >
                        Update profile
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateProfile;
