import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        house_number: "",
        street: "",
        subdivision: "",
        barangay: "",
        city: "",
        province: "",
        zipcode: "",
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
        house_number: "",
        street: "",
        subdivision: "",
        barangay: "",
        city: "",
        province: "",
        zipcode: "",
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
    const {
        id: userId,
        status: userStatus,
        type: userType,
        setUser: setUserStore
    } = useUserStore(state => state);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: user } = await http.get(`/api/user/${userId}`);
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

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Update Profile</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    if (userStatus === "Rejected") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Update Profile</h1>
                <div className="notification is-danger my-4">
                    Your account has been rejected.
                </div>
            </>
        );
    }

    if (isNotEditable) {
        return (
            <div className="notification is-warning my-4">
                Your profile is prohibited from editing.
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
                middlename,
                extname,
                birth_date,
                birth_place,
                gender,
                house_number,
                street,
                subdivision,
                barangay,
                city,
                province,
                zipcode,
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
                middlename: "",
                extname: "",
                birth_date: "",
                birth_place: "",
                gender: "",
                house_number: "",
                street: "",
                subdivision: "",
                barangay: "",
                city: "",
                province: "",
                zipcode: "",
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

            //#region Required
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
            if (house_number.trim() === "") {
                studentFormError.house_number = "This is required";
                hasError = true;
            }
            if (street.trim() === "") {
                studentFormError.street = "This is required";
                hasError = true;
            }
            if (subdivision.trim() === "") {
                studentFormError.subdivision = "This is required";
                hasError = true;
            }
            if (barangay.trim() === "") {
                studentFormError.barangay = "This is required";
                hasError = true;
            }
            if (city.trim() === "") {
                studentFormError.city = "This is required";
                hasError = true;
            }
            if (province.trim() === "") {
                studentFormError.province = "This is required";
                hasError = true;
            }
            if (zipcode.trim() === "") {
                studentFormError.zipcode = "This is required";
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
            //#endregion

            //#region Input Checking
            const hasLetters = /[A-Za-z]/;
            const hasNumber = /\d/;
            if (hasNumber.test(lastname)) {
                studentFormError.lastname = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(firstname)) {
                studentFormError.firstname = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(middlename)) {
                studentFormError.middlename = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(extname)) {
                studentFormError.extname = "Must not contain numbers";
                hasError = true;
            }

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const birthDate = new Date(birth_date);
            const birthDateYear = birthDate.getFullYear();
            const yearDiff = currentYear - birthDateYear;

            if (yearDiff < 16) {
                studentFormError.birth_date =
                    "You must be 16 years old and above";
                hasError = true;
            }

            if (hasNumber.test(birth_place)) {
                studentFormError.birth_place = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(barangay)) {
                studentFormError.barangay = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(city)) {
                studentFormError.city = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(province)) {
                studentFormError.province = "Must not contain numbers";
                hasError = true;
            }
            if (hasLetters.test(zipcode)) {
                studentFormError.zipcode = "Must not contain letters";
                hasError = true;
            }
            if (hasLetters.test(contact)) {
                studentFormError.contact = "Must not contain letters";
                hasError = true;
            }
            if (hasNumber.test(father_name)) {
                studentFormError.father_name = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(father_occupation)) {
                studentFormError.father_occupation = "Must not contain numbers";
                hasError = true;
            }
            if (hasLetters.test(father_contact)) {
                studentFormError.father_contact = "Must not contain letters";
                hasError = true;
            }
            if (hasNumber.test(mother_name)) {
                studentFormError.mother_name = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(mother_occupation)) {
                studentFormError.mother_occupation = "Must not contain numbers";
                hasError = true;
            }
            if (hasLetters.test(mother_contact)) {
                studentFormError.mother_contact = "Must not contain letters";
                hasError = true;
            }
            if (hasNumber.test(last_school_attended)) {
                studentFormError.last_school_attended =
                    "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(award_received)) {
                studentFormError.award_received = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(sh_school_strand)) {
                studentFormError.sh_school_strand = "Must not contain numbers";
                hasError = true;
            }
            //#endregion

            if (hasError) {
                setStudentFormError(studentFormError);
                alert("There's an error in the form. Please check.");
            } else {
                try {
                    setStudentFormError({
                        lastname: "",
                        firstname: "",
                        middlename: "",
                        extname: "",
                        birth_date: "",
                        birth_place: "",
                        gender: "",
                        house_number: "",
                        street: "",
                        subdivision: "",
                        barangay: "",
                        city: "",
                        province: "",
                        zipcode: "",
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

                    await http.put(`/api/user/${user.id}`, {
                        ...studentFormData
                    });

                    setUserStore({
                        name: `${lastname}, ${firstname}`
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
                tin: ""
            };

            //#region Required
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
            //#endregion

            //#region Input checking
            const hasLetters = /[A-Za-z]/;
            const hasNumber = /\d/;
            if (hasNumber.test(lastname)) {
                nonTeachingFormError.lastname = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(firstname)) {
                nonTeachingFormError.firstname = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(middlename)) {
                nonTeachingFormError.middlename = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(extname)) {
                nonTeachingFormError.extname = "Must not contain numbers";
                hasError = true;
            }

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const birthDate = new Date(birth_date);
            const birthDateYear = birthDate.getFullYear();
            const yearDiff = currentYear - birthDateYear;

            if (yearDiff < 16) {
                nonTeachingFormError.birth_date =
                    "You must be 16 years old and above";
                hasError = true;
            }

            if (hasNumber.test(birth_place)) {
                nonTeachingFormError.birth_place = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(citizenship)) {
                nonTeachingFormError.citizenship = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(barangay)) {
                nonTeachingFormError.barangay = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(city)) {
                nonTeachingFormError.city = "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(province)) {
                nonTeachingFormError.province = "Must not contain numbers";
                hasError = true;
            }
            if (hasLetters.test(zipcode)) {
                nonTeachingFormError.zipcode = "Must not contain letters";
                hasError = true;
            }
            if (hasLetters.test(gsis)) {
                nonTeachingFormError.gsis = "Numbers only";
                hasError = true;
            }
            if (hasLetters.test(pagibig)) {
                nonTeachingFormError.pagibig = "Numbers only";
                hasError = true;
            }
            if (hasLetters.test(philhealth)) {
                nonTeachingFormError.philhealth = "Numbers only";
                hasError = true;
            }
            if (hasLetters.test(sss)) {
                nonTeachingFormError.sss = "Numbers only";
                hasError = true;
            }
            if (hasLetters.test(tin)) {
                nonTeachingFormError.tin = "Numbers only";
                hasError = true;
            }

            if (hasNumber.test(elementary_school)) {
                nonTeachingFormError.elementary_school =
                    "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(elementary_remarks)) {
                nonTeachingFormError.elementary_remarks =
                    "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(secondary_school)) {
                nonTeachingFormError.secondary_school =
                    "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(secondary_remarks)) {
                nonTeachingFormError.secondary_remarks =
                    "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(vocational_school)) {
                nonTeachingFormError.vocational_school =
                    "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(vocational_remarks)) {
                nonTeachingFormError.vocational_remarks =
                    "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(college_school)) {
                nonTeachingFormError.college_school =
                    "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(college_remarks)) {
                nonTeachingFormError.college_remarks =
                    "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(graduate_studies_school)) {
                nonTeachingFormError.graduate_studies_school =
                    "Must not contain numbers";
                hasError = true;
            }
            if (hasNumber.test(graduate_studies_remarks)) {
                nonTeachingFormError.graduate_studies_remarks =
                    "Must not contain numbers";
                hasError = true;
            }
            //#endregion

            if (hasError) {
                setNonTeachingFormError(nonTeachingFormError);
                alert("There's an error in the form. Please check.");
            } else {
                try {
                    setNonTeachingFormError({
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

                    await http.put(`/api/user/${user.id}`, {
                        ...nonTeachingFormData,
                        work_experiences: JSON.stringify(work_experiences)
                    });

                    setUserStore({
                        name: `${lastname}, ${firstname}`
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
