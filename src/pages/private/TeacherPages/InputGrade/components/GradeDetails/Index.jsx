import { useState } from "react";

import FormGrade from "./components/FormGrade";
import UserName from "components/common/UserName";

import http from "services/httpService";

const GradingSheet = ({ teacherId, enrollmentItem, onRefetch }) => {
    //if no records then all values will become zero

    const [activeTab, setActiveTab] = useState(1);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async ({ target, formData, computedGrade }) => {
        try {
            const {
                sy_id,
                course_id,
                section_id,
                subject_id,
                student_id,

                grade: g
            } = enrollmentItem;

            let {
                prelim_items,
                midterm_items,
                final_items,
                prelim_grade,
                midterm_grade,
                final_grade
            } = g || {};
            prelim_grade = prelim_grade || 0;
            midterm_grade = midterm_grade || 0;
            final_grade = final_grade || 0;

            const gradeEquivalents = [
                { start: 0, end: 59, value: 5.0 },
                { start: 60, end: 64, value: 3.0 },
                { start: 65, end: 69, value: 2.75 },
                { start: 70, end: 74, value: 2.5 },
                { start: 79, end: 79, value: 2.25 },
                { start: 80, end: 83, value: 2.0 },
                { start: 84, end: 87, value: 1.75 },
                { start: 88, end: 91, value: 1.5 },
                { start: 92, end: 95, value: 1.25 },
                { start: 96, end: 100, value: 1.0 }
            ];

            if (target === "Prelim") {
                const prelimGradePercentage = computedGrade * 0.3;
                const midtermGradePercentage = midterm_grade * 0.3;
                const finalGradePercentage = final_grade * 0.3;

                let newGrade =
                    prelimGradePercentage +
                    midtermGradePercentage +
                    finalGradePercentage;

                newGrade = Number(newGrade.toFixed(2));

                const gradeEquivalent =
                    gradeEquivalents.find(({ start, end }) => {
                        return newGrade >= start && newGrade <= end;
                    })?.value || 4.0;

                const data = {
                    sy_id,
                    course_id,
                    section_id,
                    subject_id,
                    student_id,
                    teacher_id: teacherId,
                    prelim_items: JSON.stringify(formData),
                    midterm_items: midterm_items || "{}",
                    final_items: final_items || "{}",
                    prelim_grade: computedGrade,
                    midterm_grade,
                    final_grade,
                    grade: newGrade,
                    equivalent: Number(gradeEquivalent.toFixed(2)),
                    remarks: newGrade < 60 ? "FAILED" : "PASSED",
                    status: "Pending"
                };

                setIsLoading(true);

                if (g) {
                    await http.put(`/api/grade/${g.id}`, data);
                } else {
                    await http.post("/api/grade", data);
                }
                onRefetch();
            } else if (target === "Midterm") {
                const prelimGradePercentage = prelim_grade * 0.3;
                const midtermGradePercentage = computedGrade * 0.3;
                const finalGradePercentage = final_grade * 0.3;

                let newGrade =
                    prelimGradePercentage +
                    midtermGradePercentage +
                    finalGradePercentage;

                newGrade = Number(newGrade.toFixed(2));

                const gradeEquivalent =
                    gradeEquivalents.find(({ start, end }) => {
                        return newGrade >= start && newGrade <= end;
                    })?.value || 4.0;

                const data = {
                    sy_id,
                    course_id,
                    section_id,
                    subject_id,
                    student_id,
                    teacher_id: teacherId,
                    prelim_items: prelim_items || "{}",
                    midterm_items: JSON.stringify(formData),
                    final_items: final_items || "{}",
                    prelim_grade,
                    midterm_grade: computedGrade,
                    final_grade,
                    grade: newGrade,
                    equivalent: Number(gradeEquivalent.toFixed(2)),
                    remarks: newGrade < 60 ? "FAILED" : "PASSED",
                    status: "Pending"
                };

                setIsLoading(true);
                if (g) {
                    await http.put(`/api/grade/${g.id}`, data);
                } else {
                    await http.post("/api/grade", data);
                }
                onRefetch();
            } else if (target === "Final") {
                const prelimGradePercentage = prelim_grade * 0.3;
                const midtermGradePercentage = midterm_grade * 0.3;
                const finalGradePercentage = computedGrade * 0.3;

                let newGrade =
                    prelimGradePercentage +
                    midtermGradePercentage +
                    finalGradePercentage;

                newGrade = Number(newGrade.toFixed(2));

                const gradeEquivalent =
                    gradeEquivalents.find(({ start, end }) => {
                        return newGrade >= start && newGrade <= end;
                    })?.value || 4.0;

                const data = {
                    sy_id,
                    course_id,
                    section_id,
                    subject_id,
                    student_id,
                    teacher_id: teacherId,
                    prelim_items: prelim_items || "{}",
                    midterm_items: midterm_items || "{}",
                    final_items: JSON.stringify(formData),
                    prelim_grade,
                    midterm_grade,
                    final_grade: computedGrade,
                    grade: newGrade,
                    equivalent: Number(gradeEquivalent.toFixed(2)),
                    remarks: newGrade < 60 ? "FAILED" : "PASSED",
                    status: "Pending"
                };

                setIsLoading(true);
                if (g) {
                    await http.put(`/api/grade/${g.id}`, data);
                } else {
                    await http.post("/api/grade", data);
                }
                onRefetch();
            }
        } catch (error) {
            console.log(error);
            setIsError(error);
        } finally {
            setIsLoading(false);
        }

        //onRefetch();
    };

    let TabContent = () => null;
    if (activeTab === 1) {
        TabContent = () => (
            <FormGrade
                target="Prelim"
                readOnly={false}
                grade={enrollmentItem.grade}
                onSubmit={handleSubmit}
            />
        );
    } else if (activeTab === 2) {
        TabContent = () => (
            <FormGrade
                target="Midterm"
                readOnly={false}
                grade={enrollmentItem.grade}
                onSubmit={handleSubmit}
            />
        );
    } else if (activeTab === 3) {
        TabContent = () => (
            <FormGrade
                target="Final"
                readOnly={false}
                grade={enrollmentItem.grade}
                onSubmit={handleSubmit}
            />
        );
    }

    const {
        lastname,
        firstname,
        middlename,
        extname,
        student_course_name,
        subject_code,
        subject_name,
        course_name,
        section_name,

        grade
    } = enrollmentItem || {};

    let { prelim_grade, midterm_grade, final_grade, grade: g } = grade || {};

    prelim_grade = prelim_grade || 0;
    midterm_grade = midterm_grade || 0;
    final_grade = final_grade || 0;
    g = g || 0;

    return (
        <>
            <div className="box">
                <div className="columns">
                    <div className="column is-5">
                        <label className="label">Student name</label>
                        <div>
                            <UserName
                                user={{
                                    lastname,
                                    firstname,
                                    middlename,
                                    extname
                                }}
                            />
                        </div>
                    </div>
                    <div className="column is-4">
                        <label className="label">Course</label>
                        <div>{student_course_name}</div>
                    </div>
                    <div className="column is-3">
                        <label className="label">Subject</label>
                        <div>
                            {subject_code}: {subject_name}
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-5"></div>
                    <div className="column is-4">
                        <label className="label">Enrolled on course</label>
                        <div>{course_name}</div>
                    </div>
                    <div className="column is-3">
                        <label className="label">Section</label>
                        <div>{section_name}</div>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="box">
                    <div className="has-text-centered">
                        <div>
                            <i className="fa-solid fa-spinner fa-spin"></i>
                        </div>
                        <div>saving grade ...</div>
                    </div>
                </div>
            ) : isError ? (
                <div className="box">
                    <div className="has-text-centered">
                        Something went wrong. Please try again.
                    </div>
                </div>
            ) : (
                <div className="box">
                    <div className="tabs">
                        <ul>
                            <li
                                className={activeTab === 1 ? "is-active" : ""}
                                onClick={() => setActiveTab(1)}
                            >
                                <a>Prelim ({prelim_grade})</a>
                            </li>
                            <li
                                className={activeTab === 2 ? "is-active" : ""}
                                onClick={() => setActiveTab(2)}
                            >
                                <a>Midterm ({midterm_grade})</a>
                            </li>
                            <li
                                className={activeTab === 3 ? "is-active" : ""}
                                onClick={() => setActiveTab(3)}
                            >
                                <a>Final ({final_grade})</a>
                            </li>
                        </ul>
                    </div>

                    <div className="px-4">
                        <TabContent />
                    </div>
                </div>
            )}

            {/* <div className="box">
                <div className="columns">
                    <div className="column is-4">
                        <label className="label">Final Grade</label>
                        <div>0.00</div>
                    </div>
                    <div className="column is-4">
                        <label className="label">Equivalent</label>
                        <div>0.00</div>
                    </div>
                    <div className="column is-4">
                        <label className="label">Status</label>
                        <div>Pending</div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default GradingSheet;
