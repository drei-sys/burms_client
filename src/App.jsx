import { Routes, Route, Navigate } from "react-router-dom";

import AuthWrapper from "components/AuthWrapper";
import PublicRoutes from "components/PublicRoutes";
import ProtectedRoutes from "components/ProtectedRoutes";
import RoleRoutes from "components/RoleRoutes";

import Login from "pages/public/Login";
import Register from "pages/public/Register";
import ForgotPassword from "pages/public/ForgotPassword";
import ResetPassword from "pages/public/ResetPassword";
import NotFound from "pages/public/NotFound";

import Layout from "layout/Layout";
import Dashboard from "pages/private/Dashboard";
import Profile from "pages/private/Profile/Profile";
import UpdateProfile from "pages/private/Profile/UpdateProfile";

//admin routes
import Courses from "pages/private/AdminPages/Courses/Index";
import CreateCourse from "pages/private/AdminPages/Courses/CreateCourse";
import UpdateCourse from "pages/private/AdminPages/Courses/UpdateCourse";
import Subjects from "pages/private/AdminPages/Subjects/Index";
import CreateSubject from "pages/private/AdminPages/Subjects/CreateSubject";
import UpdateSubject from "pages/private/AdminPages/Subjects/UpdateSubject";
import Sections from "pages/private/AdminPages/Sections/Index";
import CreateSection from "pages/private/AdminPages/Sections/CreateSection";
import UpdateSection from "pages/private/AdminPages/Sections/UpdateSection";
import AssignedTeachers from "pages/private/AdminPages/AssignedTeachers/Index";
import AssignTeacher from "pages/private/AdminPages/AssignedTeachers/AssignTeacher";
import UpdateAssignedTeacher from "pages/private/AdminPages/AssignedTeachers/UpdateAssignedTeacher";
import ViewAssignedTeacher from "pages/private/AdminPages/AssignedTeachers/ViewAssignedTeacher";
import SchoolYear from "pages/private/AdminPages/SchoolYears/Index";
import CreateSchoolYear from "pages/private/AdminPages/SchoolYears/CreateSchoolYear";
import UpdateSchoolYear from "pages/private/AdminPages/SchoolYears/UpdateSchoolYear";
import SchoolYearSections from "pages/private/AdminPages/SchoolYears/SchoolYearSections";
import SchoolYearAddSection from "pages/private/AdminPages/SchoolYears/SchoolYearAddSection";
import Registrations from "pages/private/AdminPages/Registrations/Index";
import ViewRegistration from "pages/private/AdminPages/Registrations/ViewRegistrations";
import ProfileEditApprovals from "pages/private/AdminPages/ProfileEditApprovals/Index";
import AdminViewEnrollments from "pages/private/AdminPages/Enrollments/Index";
import AdminViewEnrollment from "pages/private/AdminPages/Enrollments/ViewEnrollment";
import BlockChain from "pages/private/AdminPages/BlockChain/Index";

//student routes
import Enroll from "pages/private/StudentPages/Enroll/Index";
import StudentViewEnrollments from "pages/private/StudentPages/Enrollment/Index";
import StudentViewEnrollment from "pages/private/StudentPages/Enrollment/ViewEnrollment";

import GradingSheet from "pages/private/StudentPages/GradingSheet";
import RequestTOR from "pages/private/StudentPages/RequestTOR";

//teacher
import Browse from "pages/private/TeacherPages/Browse";
import InputGrade from "pages/private/TeacherPages/InputGrade";

//registrar
import TORRequests from "pages/private/Registrar/TORRequests";

//dean routes
import ApproveGrade from "pages/private/Dean/ApproveGrade";
//import AssignTeacher from "pages/private/Dean/AssignTeacher";

//dept chair routes
import DeptChairSchoolYear from "pages/private/DeptChairPages/SchoolYear/Index";

function App() {
    const publicRoutes = [
        { path: "/login", element: Login },
        { path: "/register", element: Register },
        { path: "/forgotPassword", element: ForgotPassword },
        { path: "/resetPassword", element: ResetPassword }
    ];

    const adminRoutes = [
        { path: "/courses", element: Courses },
        { path: "/createCourse", element: CreateCourse },
        { path: "/updateCourse/:id", element: UpdateCourse },
        { path: "/subjects", element: Subjects },
        { path: "/createSubject", element: CreateSubject },
        { path: "/updateSubject/:id", element: UpdateSubject },
        { path: "/sections", element: Sections },
        { path: "/createSection", element: CreateSection },
        { path: "/updateSection/:id", element: UpdateSection },
        { path: "/assignedTeachers", element: AssignedTeachers },
        { path: "/assignTeacher", element: AssignTeacher },
        { path: "/updateAssignedTeacher/:id", element: UpdateAssignedTeacher },
        { path: "/assignedTeacher/:id", element: ViewAssignedTeacher },
        { path: "/schoolYears", element: SchoolYear },
        { path: "/createSchoolYear", element: CreateSchoolYear },
        { path: "/updateSchoolYear/:id", element: UpdateSchoolYear },
        { path: "/schoolYearSections/:id", element: SchoolYearSections },
        { path: "/schoolYearAddSection/:id", element: SchoolYearAddSection },
        { path: "/registrations", element: Registrations },
        { path: "/registration/:id", element: ViewRegistration },
        { path: "/profileEditApprovals", element: ProfileEditApprovals },
        { path: "/adminViewEnrollments", element: AdminViewEnrollments },
        { path: "/adminViewEnrollment/:id", element: AdminViewEnrollment },
        { path: "/blockchain", element: BlockChain }
    ];

    const studentRoutes = [
        { path: "/enroll", element: Enroll },
        { path: "/studentViewEnrollments", element: StudentViewEnrollments },
        { path: "/studentViewEnrollment/:id", element: StudentViewEnrollment },
        { path: "/gradingSheet", element: GradingSheet },
        { path: "/requestTOR", element: RequestTOR }
    ];

    const teacherRoutes = [
        { path: "/browse", element: Browse },
        { path: "/inputGrade", element: InputGrade }
    ];

    const registrarRoutes = [{ path: "/TORRequests", element: TORRequests }];

    const deanRoutes = [
        { path: "/approveGrades", element: ApproveGrade },
        { path: "/assignTeacher", element: AssignTeacher }
    ];

    const deptChairRoutes = [
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

        ...adminRoutes.map(i => ({ ...i, userType: 1 })),
        ...studentRoutes.map(i => ({ ...i, userType: 3 })),
        ...teacherRoutes.map(i => ({ ...i, userType: 4 })),
        ...registrarRoutes.map(i => ({ ...i, userType: 6 })),
        ...deanRoutes.map(i => ({ ...i, userType: 7 })),
        ...deptChairRoutes.map(i => ({ ...i, userType: 8 }))
    ];

    return (
        <Routes>
            {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
            <Route path="/" element={<AuthWrapper />}>
                <Route path="/" element={<PublicRoutes />}>
                    <Route
                        path="/"
                        element={<Navigate replace to="/login" />}
                    />

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
                        <Route path="/" element={<RoleRoutes userType={1} />}>
                            {privateRoutes
                                .filter(({ userType }) => userType === 1)
                                .map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                        </Route>
                        <Route path="/" element={<RoleRoutes userType={3} />}>
                            {privateRoutes
                                .filter(({ userType }) => userType === 3)
                                .map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                        </Route>
                        <Route path="/" element={<RoleRoutes userType={4} />}>
                            {privateRoutes
                                .filter(({ userType }) => userType === 4)
                                .map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                        </Route>
                        <Route path="/" element={<RoleRoutes userType={6} />}>
                            {privateRoutes
                                .filter(({ userType }) => userType === 6)
                                .map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                        </Route>
                        <Route path="/" element={<RoleRoutes userType={7} />}>
                            {privateRoutes
                                .filter(({ userType }) => userType === 7)
                                .map(({ path, element: Element }) => (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Element />}
                                    />
                                ))}
                        </Route>
                        <Route path="/" element={<RoleRoutes userType={8} />}>
                            {privateRoutes
                                .filter(({ userType }) => userType === 8)
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
