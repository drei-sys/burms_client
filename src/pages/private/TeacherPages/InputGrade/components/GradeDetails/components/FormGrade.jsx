import { useState, useEffect } from "react";

const FormGrade = ({ target, grade, readOnly, onSubmit }) => {
    const [formData, setFormData] = useState({
        attendance: 0,
        quiz1Score: 0,
        quiz2Score: 0,
        quiz3Score: 0,
        quiz4Score: 0,
        quiz1Item: 0,
        quiz2Item: 0,
        quiz3Item: 0,
        quiz4Item: 0,
        quizGrade: 0,
        quizPercentage: 0,
        activity1Score: 0,
        activity2Score: 0,
        activity3Score: 0,
        activity4Score: 0,
        activity1Item: 0,
        activity2Item: 0,
        activity3Item: 0,
        activity4Item: 0,
        activityGrade: 0,
        activityPercentage: 0,
        examScore: 0,
        examItem: 0,
        examGrade: 0,
        examPercentage: 0
    });
    const [computedGrade, setComputedGrade] = useState(0);

    useEffect(() => {
        if (grade) {
            if (target === "Prelim") {
                const { prelim_items, prelim_grade } = grade;
                if (prelim_items !== "{}") {
                    const parsedPrelimItems = JSON.parse(prelim_items);
                    setFormData(parsedPrelimItems);
                    setComputedGrade(prelim_grade);
                }
            } else if (target === "Midterm") {
                const { midterm_items, midterm_grade } = grade;
                if (midterm_items !== "{}") {
                    const parsedMidtermItems = JSON.parse(midterm_items);
                    setFormData(parsedMidtermItems);
                    setComputedGrade(midterm_grade);
                }
            } else if (target === "Final") {
                const { final_items, final_grade } = grade;
                if (final_items !== "{}") {
                    const parsedFinalItems = JSON.parse(final_items);
                    setFormData(parsedFinalItems);
                    setComputedGrade(final_grade);
                }
            }
        }
    }, [grade]);

    function computeGrade(formData) {
        let { attendance, quizPercentage, activityPercentage, examPercentage } =
            formData;

        attendance = Number(attendance.toFixed(2));
        quizPercentage = Number(quizPercentage.toFixed(2));
        activityPercentage = Number(activityPercentage.toFixed(2));
        examPercentage = Number(examPercentage.toFixed(2));

        const computedGrade =
            attendance + quizPercentage + activityPercentage + examPercentage;

        setComputedGrade(Number(computedGrade.toFixed(2)));
    }

    const handleAttendanceInputChange = e => {
        let { value } = e.target;

        if (value === "") {
            value = 0;
        }
        if (isNaN(value)) {
            value = 0;
        }

        value = Number(value);

        setFormData({
            ...formData,
            attendance: value
        });
        computeGrade({
            ...formData,
            attendance: value
        });
    };

    const handleQuizInputChange = e => {
        let { name, value } = e.target;

        if (value === "") {
            value = 0;
        }
        if (isNaN(value)) {
            value = 0;
        }
        value = Number(value);

        const newFormData = { ...formData, [name]: value };

        const {
            quiz1Score,
            quiz2Score,
            quiz3Score,
            quiz4Score,
            quiz1Item,
            quiz2Item,
            quiz3Item,
            quiz4Item
        } = newFormData;

        let totalScore = quiz1Score + quiz2Score + quiz3Score + quiz4Score;
        let totalItem = quiz1Item + quiz2Item + quiz3Item + quiz4Item;
        let quizGrade = 0;
        if (totalItem > 0) {
            quizGrade = (totalScore / totalItem) * 100;
        }
        let quizPercentage = quizGrade * 0.2;

        quizGrade = Number(quizGrade.toFixed(2));
        quizPercentage = Number(quizPercentage.toFixed(2));

        setFormData({
            ...newFormData,
            quizGrade,
            quizPercentage
        });
        computeGrade({
            ...newFormData,
            quizGrade,
            quizPercentage
        });
    };

    const handleActivityInputChange = e => {
        let { name, value } = e.target;

        if (value === "") {
            value = 0;
        }
        if (isNaN(value)) {
            value = 0;
        }
        value = Number(value);

        const newFormData = { ...formData, [name]: value };

        const {
            activity1Score,
            activity2Score,
            activity3Score,
            activity4Score,
            activity1Item,
            activity2Item,
            activity3Item,
            activity4Item
        } = newFormData;

        let totalScore =
            activity1Score + activity2Score + activity3Score + activity4Score;
        let totalItem =
            activity1Item + activity2Item + activity3Item + activity4Item;
        let activityGrade = 0;
        if (totalItem > 0) {
            activityGrade = (totalScore / totalItem) * 100;
        }
        let activityPercentage = activityGrade * 0.2;

        activityGrade = Number(activityGrade.toFixed(2));
        activityPercentage = Number(activityPercentage.toFixed(2));

        setFormData({
            ...newFormData,
            activityGrade,
            activityPercentage
        });
        computeGrade({
            ...newFormData,
            activityGrade,
            activityPercentage
        });
    };

    const handleExamInputChange = e => {
        let { name, value } = e.target;

        if (value === "") {
            value = 0;
        }
        if (isNaN(value)) {
            value = 0;
        }
        value = Number(value);

        const newFormData = { ...formData, [name]: value };

        const { examScore, examItem } = newFormData;

        let examGrade = 0;
        if (examItem > 0) {
            examGrade = (examScore / examItem) * 100;
        }
        let examPercentage = examGrade * 0.5;

        examGrade = Number(examGrade.toFixed(2));
        examPercentage = Number(examPercentage.toFixed(2));

        setFormData({
            ...newFormData,
            examGrade,
            examPercentage
        });
        computeGrade({
            ...newFormData,
            examGrade,
            examPercentage
        });
    };

    const handleSubmit = async () => {
        onSubmit({ target, formData, computedGrade });
    };

    let color = "is-info";
    if (target === "Midterm") {
        color = "is-warning";
    } else if (target === "Final") {
        color = "is-success";
    }

    return (
        <>
            <div className={`notification ${color} mb-4 has-text-centered`}>
                <span className="is-size-5">{target}</span>
            </div>
            <div className="columns">
                <div className="column is-4">
                    <label className="label">Attendance:</label>
                </div>
                <div className="column is-8">
                    <div className="mb-2">
                        <input
                            name="attendance"
                            type="number"
                            min={0}
                            max={10}
                            className="input"
                            placeholder="Enter attendance percentage"
                            value={formData.attendance}
                            onChange={handleAttendanceInputChange}
                        />
                    </div>
                    <div className="is-flex is-justify-content-space-between">
                        <div>
                            <label className="label">Attendance grade:</label>
                        </div>
                        <div>{formData.attendance}</div>
                    </div>
                    <div className="is-flex is-justify-content-space-between">
                        <div>
                            <label className="label">Attendance %:</label>
                        </div>
                        <div>{formData.attendance}</div>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column is-4">
                    <label className="label">Quiz:</label>
                </div>
                <div className="column is-8">
                    <table className="table is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                <th style={{ width: 100 }}></th>
                                <th>Score</th>
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Quiz 1</td>
                                <td>
                                    <input
                                        name="quiz1Score"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.quiz1Score}
                                        onChange={handleQuizInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="quiz1Item"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.quiz1Item}
                                        onChange={handleQuizInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Quiz 2</td>
                                <td>
                                    <input
                                        name="quiz2Score"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.quiz2Score}
                                        onChange={handleQuizInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="quiz2Item"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.quiz2Item}
                                        onChange={handleQuizInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Quiz 3</td>
                                <td>
                                    <input
                                        name="quiz3Score"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.quiz3Score}
                                        onChange={handleQuizInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="quiz3Item"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.quiz3Item}
                                        onChange={handleQuizInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Quiz 4</td>
                                <td>
                                    <input
                                        name="quiz4Score"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.quiz4Score}
                                        onChange={handleQuizInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="quiz4Item"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.quiz4Item}
                                        onChange={handleQuizInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Quiz grade:</td>
                                <td>
                                    <label className="label">
                                        {formData.quizGrade}
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Quiz %:</td>
                                <td>
                                    <label className="label">
                                        {formData.quizPercentage}
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="columns">
                <div className="column is-4">
                    <label className="label">Activities:</label>
                </div>
                <div className="column is-8">
                    <table className="table is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                <th style={{ width: 100 }}></th>
                                <th>Score</th>
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Activity 1</td>
                                <td>
                                    <input
                                        name="activity1Score"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.activity1Score}
                                        onChange={handleActivityInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="activity1Item"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.activity1Item}
                                        onChange={handleActivityInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Activity 2</td>
                                <td>
                                    <input
                                        name="activity2Score"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.activity2Score}
                                        onChange={handleActivityInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="activity2Item"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.activity2Item}
                                        onChange={handleActivityInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Activity 3</td>
                                <td>
                                    <input
                                        name="activity3Score"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.activity3Score}
                                        onChange={handleActivityInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="activity3Item"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.activity3Item}
                                        onChange={handleActivityInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Activity 4</td>
                                <td>
                                    <input
                                        name="activity4Score"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.activity4Score}
                                        onChange={handleActivityInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="activity4Item"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.activity4Item}
                                        onChange={handleActivityInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Activity grade:</td>
                                <td>
                                    <label className="label">
                                        {formData.activityGrade}
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>Activity %:</td>
                                <td>
                                    <label className="label">
                                        {formData.activityPercentage}
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="columns">
                <div className="column is-4">
                    <label className="label">Exam:</label>
                </div>
                <div className="column is-8">
                    <table className="table is-fullwidth is-hoverable">
                        <thead>
                            <tr>
                                <th>Score</th>
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        name="examScore"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.examScore}
                                        onChange={handleExamInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        name="examItem"
                                        type="number"
                                        min={0}
                                        className="input"
                                        value={formData.examItem}
                                        onChange={handleExamInputChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Exam grade:</td>
                                <td>
                                    <label className="label">
                                        {formData.examGrade}
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>Exam %:</td>
                                <td>
                                    <label className="label">
                                        {formData.examPercentage}
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <hr />
            <div className="columns">
                <div className="column is-4">
                    <label className="label">{target} grade:</label>
                </div>
                <div className="column is-8">
                    <div className="is-size-5 has-text-right mb-6">
                        {computedGrade}
                    </div>
                    <div className="is-size-5 has-text-right">
                        <button
                            className="button is-success"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormGrade;
