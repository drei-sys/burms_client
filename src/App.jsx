import { Routes, Route, Navigate } from "react-router-dom";

import AuthWrapper from "components/AuthWrapper";
import PublicRoutes from "components/PublicRoutes";
import ProtectedRoutes from "components/ProtectedRoutes";
import RoleRoutes from "components/RoleRoutes";

import LandingPage from "pages/public/LandingPAge/Index";
import Login from "pages/public/Login";
import Register from "pages/public/Register";
import ForgotPassword from "pages/public/ForgotPassword";
import ResetPassword from "pages/public/ResetPassword";
import NotFound from "pages/public/NotFound";

import Layout from "layout/Layout";
import Dashboard from "pages/private/Dashboard";
import Profile from "pages/private/Profile/Index";
import UpdateProfile from "pages/private/Profile/UpdateProfile";

//admin routes
import Announcements from "pages/private/Annoucements/Index";
import CreateAnnouncement from "pages/private/Annoucements/CreateAnnouncement";
import UpdateAnnouncement from "pages/private/Annoucements/UpdateAnnouncement";
import Courses from "pages/private/AdminPages/Courses/Index";
import CreateCourse from "pages/private/AdminPages/Courses/CreateCourse";
import UpdateCourse from "pages/private/AdminPages/Courses/UpdateCourse";
import Subjects from "pages/private/AdminPages/Subjects/Index";
import CreateSubject from "pages/private/AdminPages/Subjects/CreateSubject";
import UpdateSubject from "pages/private/AdminPages/Subjects/UpdateSubject";
import Sections from "pages/private/AdminPages/Sections/Index";
import CreateSection from "pages/private/AdminPages/Sections/CreateSection";
import UpdateSection from "pages/private/AdminPages/Sections/UpdateSection";

import TeacherSubjects from "pages/private/AdminPages/TeacherSubjects/Index";
import CreateTeacherSubject from "pages/private/AdminPages/TeacherSubjects/CreateTeacherSubject";
import UpdateTeacherSubject from "pages/private/AdminPages/TeacherSubjects/UpdateTeacherSubject";
import ViewTeacherSubject from "pages/private/AdminPages/TeacherSubjects/ViewTeacherSubject";

import SchoolYear from "pages/private/AdminPages/SchoolYears/Index";
import CreateSchoolYear from "pages/private/AdminPages/SchoolYears/CreateSchoolYear";
import UpdateSchoolYear from "pages/private/AdminPages/SchoolYears/UpdateSchoolYear";
import SchoolYearSections from "pages/private/AdminPages/SchoolYears/SchoolYearSections";
import SchoolYearAddSection from "pages/private/AdminPages/SchoolYears/SchoolYearAddSection";
import Registrations from "pages/private/AdminPages/Registrations/Index";
import ViewRegistration from "pages/private/AdminPages/Registrations/ViewRegistrations";
import ProfileEditApprovals from "pages/private/AdminPages/ProfileEditApprovals/Index";
import ViewEnrollments from "pages/private/AdminPages/Enrollments/Index";
import ViewEnrollment from "pages/private/AdminPages/Enrollments/ViewEnrollment";
import BlockchainUsers from "pages/private/AdminPages/BlockChain/BlockchainUsers";
import BlockchainGrades from "pages/private/AdminPages/BlockChain/BlockchainGrade/Index";
//import BlockchainRead from "pages/private/AdminPages/BlockChain/BlockchainRead";

//student routes
import Enroll from "pages/private/StudentPages/Enroll/Index";
import StudentViewEnrollments from "pages/private/StudentPages/Enrollment/Index";
import StudentViewEnrollment from "pages/private/StudentPages/Enrollment/ViewEnrollment";
import MyGrades from "pages/private/StudentPages/MyGrades/Index";
import TORRequests from "pages/private/StudentPages/TORRequests/Index";
import CreateTORRequest from "pages/private/StudentPages/TORRequests/CreateTORRequest";
import UpdateTORRequest from "pages/private/StudentPages/TORRequests/UpdateTORRequest";

//teacher
import MyStudents from "pages/private/TeacherPages/MyStudents/Index";
import InputGrade from "pages/private/TeacherPages/InputGrade/Index";

//registrar
import Students from "pages/private/Registrar/Students/Students";
import ViewStudentDetails from "pages/private/Registrar/Students/ViewStudentDetails";
import ViewStudentGrades from "pages/private/Registrar/Students/ViewStudentGrades";
import RegistrarTORRequests from "pages/private/Registrar/TORRequests/Index";
import ViewTOR from "pages/private/Registrar/TORRequests/ViewTOR";

//dean routes
//import ApproveGrade from "pages/private/Dean/ApproveGrade";
//import AssignTeacher from "pages/private/Dean/AssignTeacher";

//dept chair routes
import DeptChairSchoolYear from "pages/private/DeptChairPages/SchoolYear/Index";

function App() {
    const publicRoutes = [
        { path: "/", element: LandingPage },
        { path: "/login", element: Login },
        { path: "/register", element: Register },
        { path: "/forgotPassword", element: ForgotPassword },
        { path: "/resetPassword", element: ResetPassword }
    ];

    const adminRoutes = [
        { path: "/announcements", element: Announcements },
        { path: "/createAnnouncement", element: CreateAnnouncement },
        { path: "/updateAnnouncement/:id", element: UpdateAnnouncement },

        { path: "/courses", element: Courses },
        { path: "/createCourse", element: CreateCourse },
        { path: "/updateCourse/:id", element: UpdateCourse },
        { path: "/subjects", element: Subjects },
        { path: "/createSubject", element: CreateSubject },
        { path: "/updateSubject/:id", element: UpdateSubject },
        { path: "/sections", element: Sections },
        { path: "/createSection", element: CreateSection },
        { path: "/updateSection/:id", element: UpdateSection },
        { path: "/teacherSubjects", element: TeacherSubjects },
        { path: "/teacherSubject/:id", element: ViewTeacherSubject },
        { path: "/createTeacherSubject", element: CreateTeacherSubject },
        { path: "/updateTeacherSubject/:id", element: UpdateTeacherSubject },
        { path: "/schoolYears", element: SchoolYear },
        { path: "/createSchoolYear", element: CreateSchoolYear },
        { path: "/updateSchoolYear/:id", element: UpdateSchoolYear },
        { path: "/schoolYearSections/:id", element: SchoolYearSections },
        { path: "/schoolYearAddSection/:id", element: SchoolYearAddSection },
        { path: "/registrations", element: Registrations },
        { path: "/registration/:id", element: ViewRegistration },
        { path: "/profileEditApprovals", element: ProfileEditApprovals },
        { path: "/viewEnrollments", element: ViewEnrollments },
        { path: "/viewEnrollment/:id", element: ViewEnrollment },
        { path: "/blockchainUsers", element: BlockchainUsers },
        { path: "/blockchainGrades", element: BlockchainGrades }
        //{ path: "/blockchainRead", element: BlockchainRead }
    ];

    const studentRoutes = [
        { path: "/enroll", element: Enroll },
        { path: "/studentViewEnrollments", element: StudentViewEnrollments },
        { path: "/studentViewEnrollment/:id", element: StudentViewEnrollment },
        { path: "/myGrades", element: MyGrades },
        { path: "/torRequests", element: TORRequests },
        { path: "/createTORRequest", element: CreateTORRequest },
        { path: "/updateTORRequest/:id", element: UpdateTORRequest }
    ];

    const teacherRoutes = [
        { path: "/myStudents", element: MyStudents },
        { path: "/inputGrade", element: InputGrade }
    ];

    const registrarRoutes = [
        { path: "/students", element: Students },
        { path: "/student/:id", element: ViewStudentDetails },
        { path: "/studentGrades/:id", element: ViewStudentGrades },
        { path: "/registrarTORRequests", element: RegistrarTORRequests },
        { path: "/tor/:id/", element: ViewTOR }
    ];

    const deanRoutes = [
        { path: "/deanTeacherSubjects", element: TeacherSubjects },
        { path: "/deanTeacherSubject/:id", element: ViewTeacherSubject },
        { path: "/deanCreateTeacherSubject", element: CreateTeacherSubject },
        {
            path: "/deanUpdateTeacherSubject/:id",
            element: UpdateTeacherSubject
        }
        //{ path: "/approveGrades", element: ApproveGrade }
        //{ path: "/assignTeacher", element: AssignTeacher }
    ];

    const deptChairRoutes = [
        { path: "/deptChairSections", element: Sections },
        { path: "/deptChairCreateSection", element: CreateSection },
        { path: "/deptChairUpdateSection/:id", element: UpdateSection },
        { path: "/deptChairSchoolYears", element: DeptChairSchoolYear },
        {
            path: "/deptChairSchoolYearSections/:id",
            element: SchoolYearSections
        },
        {
            path: "/deptChairSchoolYearAddSection/:id",
            element: SchoolYearAddSection
        }
    ];

    const privateRoutes = [
        //default routes
        { path: "/dashboard", element: Dashboard },
        { path: "/profile", element: Profile },
        { path: "/updateProfile", element: UpdateProfile },

        ...adminRoutes.map(i => ({ ...i, userType: "Admin" })),
        ...studentRoutes.map(i => ({ ...i, userType: "Student" })),
        ...teacherRoutes.map(i => ({ ...i, userType: "Teacher" })),
        ...registrarRoutes.map(i => ({ ...i, userType: "Registrar" })),
        ...deanRoutes.map(i => ({ ...i, userType: "Dean" })),
        ...deptChairRoutes.map(i => ({ ...i, userType: "DeptChair" }))
    ];

    return (
        <Routes>
            {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
            <Route path="/" element={<AuthWrapper />}>
                <Route path="/" element={<PublicRoutes />}>
                    {publicRoutes.map(({ path, element: Element }) => (
                        <Route key={path} path={path} element={<Element />} />
                    ))}
                </Route>
                <Route path="/" element={<ProtectedRoutes />}>
                    <Route path="/" element={<Layout />}>
                        {privateRoutes
                            .filter(({ userType }) => userType === undefined)
                            .map(({ path, element: Element }) => (
                                <Route
                                    key={path}
                                    path={path}
                                    element={<Element />}
                                />
                            ))}
                        <Route
                            path="/"
                            element={<RoleRoutes userType="Admin" />}
                        >
                            {privateRoutes
                                .filter(({ userType }) => userType === "Admin")
                                .map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                        </Route>
                        <Route
                            path="/"
                            element={<RoleRoutes userType="Student" />}
                        >
                            {privateRoutes
                                .filter(
                                    ({ userType }) => userType === "Student"
                                )
                                .map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                        </Route>
                        <Route
                            path="/"
                            element={<RoleRoutes userType="Teacher" />}
                        >
                            {privateRoutes
                                .filter(
                                    ({ userType }) => userType === "Teacher"
                                )
                                .map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                        </Route>
                        <Route
                            path="/"
                            element={<RoleRoutes userType="Registrar" />}
                        >
                            {privateRoutes
                                .filter(
                                    ({ userType }) => userType === "Registrar"
                                )
                                .map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                        </Route>
                        <Route
                            path="/"
                            element={<RoleRoutes userType="Dean" />}
                        >
                            {privateRoutes
                                .filter(({ userType }) => userType === "Dean")
                                .map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                        </Route>
                        <Route
                            path="/"
                            element={<RoleRoutes userType="DeptChair" />}
                        >
                            {privateRoutes
                                .filter(
                                    ({ userType }) => userType === "DeptChair"
                                )
                                .map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                        </Route>
                    </Route>
                </Route>
            </Route>
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    );
}

export default App;
