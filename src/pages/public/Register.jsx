import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loader from "components/common/Loader";
import Error from "components/common/Error";
import StudentForm from "components/common/StudentForm";
import NonTeachingForm from "components/common/NonTeachingForm";

import http from "services/httpService";

const Register = () => {
    const [userType, setUserType] = useState("Student");

    const [courses, setCourses] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

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
        year_level: "1st",
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

    const [isLoading, setIsLoading] = useState(false);

    const [isOpenDisclaimer, setIsOpenDisclaimer] = useState(false);

    useEffect(() => {
        const getCourses = async () => {
            try {
                setIsContentLoading(true);
                const { data } = await http.get("/api/courses");
                setCourses(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsContentLoading(false);
            }
        };

        getCourses();
    }, []);

    if (isContentLoading) {
        return <Loader />;
    }

    if (error) {
        return <Error error={error} />;
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
                course_id,
                email,
                password,
                password_confirmation
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
                course_id: "",
                email: "",
                password: "",
                password_confirmation: ""
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
            if (email.trim() === "") {
                studentFormError.email = "This is required";
                hasError = true;
            }
            if (password.trim() === "") {
                studentFormError.password = "This is required";
                hasError = true;
            }
            if (password_confirmation.trim() === "") {
                studentFormError.password_confirmation = "This is required";
                hasError = true;
            }
            if (password !== password_confirmation) {
                studentFormError.password_confirmation = "Password not match";
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

                setIsOpenDisclaimer(true);
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
                email,
                password,
                password_confirmation,

                elementary_school,
                elementary_remarks,
                secondary_school,
                secondary_remarks,
                vocational_school,
                vocational_remarks,
                college_school,
                college_remarks,
                graduate_studies_school,
                graduate_studies_remarks
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
                tin: "",
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
                graduate_studies_remarks: ""
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
            if (email.trim() === "") {
                nonTeachingFormError.email = "This is required";
                hasError = true;
            }
            if (password.trim() === "") {
                nonTeachingFormError.password = "This is required";
                hasError = true;
            }
            if (password_confirmation.trim() === "") {
                nonTeachingFormError.password_confirmation = "This is required";
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
                    tin: "",
                    email: "",
                    password: "",
                    password_confirmation: ""
                });

                setIsOpenDisclaimer(true);
            }
        }
    };

    const handleDisclaimerOK = async () => {
        setIsOpenDisclaimer(false);
        if (userType === "Student") {
            try {
                setIsLoading(true);
                await http.get("/sanctum/csrf-cookie");
                await http.post("/register", {
                    ...studentFormData,
                    user_type: userType
                });

                window.location = "/login";
            } catch (error) {
                setStudentFormError({
                    ...studentFormError,
                    ...(error?.response?.data?.errors || {
                        password_confirmation: "Something went wrong!"
                    })
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            try {
                const {
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

                await http.get("/sanctum/csrf-cookie");
                await http.post("/register", {
                    ...nonTeachingFormData,
                    work_experiences: JSON.stringify(work_experiences),
                    user_type: userType
                });

                window.location = "/login";
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
    };

    return (
        <>
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
                                            value={userType}
                                            onChange={e =>
                                                setUserType(e.target.value)
                                            }
                                        >
                                            <option value="Student">
                                                Student
                                            </option>
                                            <option value="Teacher">
                                                Teacher
                                            </option>
                                            <option value="Non Teaching">
                                                Non Teaching
                                            </option>
                                            <option value="Registrar">
                                                Registrar
                                            </option>
                                            <option value="Dean">Dean</option>
                                            <option value="DeptChair">
                                                Department Chair
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box">
                            {userType === "Student" ? (
                                <StudentForm
                                    formData={studentFormData}
                                    formError={studentFormError}
                                    courses={courses}
                                    onInputChange={handleStudentInputChange}
                                />
                            ) : (
                                <NonTeachingForm
                                    formData={nonTeachingFormData}
                                    formError={nonTeachingFormError}
                                    onInputChange={handleNonTeachingInputChange}
                                />
                            )}

                            {/* <NonTeachingForm /> */}

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

            <div className={`modal ${isOpenDisclaimer ? "is-active" : ""}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Disclaimer Message</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={() => setIsOpenDisclaimer(false)}
                        ></button>
                    </header>
                    <section className="modal-card-body">
                        <p>
                            While blockchain technology provides a high level of
                            security and immutability, it is important to note
                            that personal information stored on the blockchain
                            is not completely private. The blockchain is a
                            public ledger and all transactions on the blockchain
                            are visible to anyone who has access to it. While
                            personal information can be encrypted on the
                            blockchain, it is still vulnerable to attack or
                            theft by hackers or other malicious actors. It is
                            important to carefully consider the sensitivity of
                            any personal information before deciding to store it
                            on the blockchain, and to take appropriate security
                            measures to protect it. As with any other type of
                            technology, there are potential risks and benefits
                            associated with using blockchain technology to store
                            personal information, and it is important to weigh
                            these carefully before making any decisions.
                        </p>
                    </section>
                    <footer className="modal-card-foot">
                        <button
                            className="button is-success"
                            onClick={handleDisclaimerOK}
                        >
                            OK
                        </button>
                        <button
                            className="button"
                            onClick={() => setIsOpenDisclaimer(false)}
                        >
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Register;
