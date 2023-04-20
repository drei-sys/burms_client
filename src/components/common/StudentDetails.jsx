import { useState, useEffect } from "react";

import Loader from "components/common/Loader";
import Error from "components/common/Error";

import http from "services/httpService";

const StudentDetails = ({ data }) => {
    const [courses, setCourses] = useState([]);

    const [isContentLoading, setIsContentLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const {
        lastname,
        firstname,
        middlename,
        extname,
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
        course_id,
        email,

        user_type
    } = data;

    const courseName = courses.find(({ id }) => id === course_id)?.name;

    return (
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
                            <td className="has-text-weight-medium">Ext name</td>
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
                            <td className="has-text-weight-medium">Gender</td>
                            <td>{gender}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">Address</td>
                            <td>{address}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Civil status
                            </td>
                            <td>{civil_status}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Contact No.
                            </td>
                            <td>{contact}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">Email</td>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                A Cabuye&ntilde;o?
                            </td>
                            <td>{is_cabuyeno}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Registered voter?
                            </td>
                            <td>{is_registered_voter}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Fully vaccinated?
                            </td>
                            <td>{is_fully_vaccinated}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="column is-6">
                <div className="is-size-5 mb-2 has-text-weight-bold">
                    Family Background
                </div>
                <table className="table" style={{ width: "100%" }}>
                    <tbody>
                        <tr>
                            <td
                                className="has-text-weight-medium"
                                style={{ width: 180 }}
                            >
                                Father's name
                            </td>
                            <td>{father_name}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Occupation
                            </td>
                            <td>{father_occupation}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Contact no.
                            </td>
                            <td>{father_contact}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Registered voter?
                            </td>
                            <td>{is_father_voter_of_cabuyao}</td>
                        </tr>
                        <tr>
                            <td
                                className="has-text-weight-medium"
                                style={{ width: 180 }}
                            >
                                Mother's maided name
                            </td>
                            <td>{mother_name}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Occupation
                            </td>
                            <td>{mother_occupation}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Contact no.
                            </td>
                            <td>{mother_contact}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Registered voter?
                            </td>
                            <td>{is_mother_voter_of_cabuyao}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Living with parents?
                            </td>
                            <td>{is_living_with_parents}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="is-size-5 mb-2 has-text-weight-bold">
                    Educational Background
                </div>
                <table className="table" style={{ width: "100%" }}>
                    <tbody>
                        <tr>
                            <td
                                className="has-text-weight-medium"
                                style={{ width: 180 }}
                            >
                                Highest educational attainment
                            </td>
                            <td>{education_attained}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Last school attended
                            </td>
                            <td>{last_school_attended}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                School address
                            </td>
                            <td>{school_address}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Award received
                            </td>
                            <td>{award_received}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Your taken Senior High School Strand
                            </td>
                            <td>{sh_school_strand}</td>
                        </tr>
                        <tr>
                            <td className="has-text-weight-medium">
                                Desired program
                            </td>
                            <td>{courseName || "-"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentDetails;
