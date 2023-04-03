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
import SchoolYear from "pages/private/AdminPages/SchoolYears/Index";
import Registrations from "pages/private/AdminPages/Registrations/Index";
import ViewRegistration from "pages/private/AdminPages/Registrations/ViewRegistrations";
import ProfileEditApprovals from "pages/private/AdminPages/ProfileEditApprovals/Index";
import AdminViewEnrollments from "pages/private/AdminPages/Enrollments/Index";

//student routes
import Enroll from "pages/private/StudentPages/Enroll";
import StudentViewEnrollments from "pages/private/StudentPages/Enrollments";

import GradingSheet from "pages/private/StudentPages/GradingSheet";
import RequestTOR from "pages/private/StudentPages/RequestTOR";

//teacher
import Browse from "pages/private/TeacherPages/Browse";
import InputGrade from "pages/private/TeacherPages/InputGrade";

//registrar
import TORRequests from "pages/private/Registrar/TORRequests";

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
        { path: "/schoolYears", element: SchoolYear },
        { path: "/registrations", element: Registrations },
        { path: "/registration/:id", element: ViewRegistration },
        { path: "/profileEditApprovals", element: ProfileEditApprovals },
        { path: "/adminViewEnrollments", element: AdminViewEnrollments }
    ];

    const studentRoutes = [
        { path: "/enroll", element: Enroll },
        { path: "/studentViewEnrollments", element: StudentViewEnrollments },
        { path: "/gradingSheet", element: GradingSheet },
        { path: "/requestTOR", element: RequestTOR }
    ];

    const teacherRoutes = [
        { path: "/browse", element: Browse },
        { path: "/inputGrade", element: InputGrade }
    ];

    const registrarRoutes = [{ path: "/TORRequests", element: TORRequests }];

    const privateRoutes = [
        //default routes
        { path: "/dashboard", element: Dashboard },
        { path: "/profile", element: Profile },
        { path: "/updateProfile", element: UpdateProfile },

        ...adminRoutes.map(i => ({ ...i, userType: 1 })),
        ...studentRoutes.map(i => ({ ...i, userType: 3 })),
        ...teacherRoutes.map(i => ({ ...i, userType: 4 })),
        ...registrarRoutes.map(i => ({ ...i, userType: 6 }))
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
                    </Route>
                </Route>
            </Route>
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    );
}

export default App;
