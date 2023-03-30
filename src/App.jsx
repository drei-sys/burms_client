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

//admin routes
import Courses from "pages/private/AdminPages/Courses/Index";
import Subject from "pages/private/AdminPages/Subjects/Index";
import CreateSubject from "pages/private/AdminPages/Subjects/CreateSubject";
import UpdateSubject from "pages/private/AdminPages/Subjects/UpdateSubject";
import Section from "pages/private/AdminPages/Sections/Index";
import SchoolYear from "pages/private/AdminPages/SchoolYears/Index";
import Registrations from "pages/private/AdminPages/Registrations/Index";
import AdminViewEnrollments from "pages/private/AdminPages/Enrollments/Index";
import EditInfoApproval from "pages/private/AdminPages/EditInfoApproval/Index";

//student routes
import Enroll from "pages/private/StudentPages/Enroll";
import StudentViewEnrollments from "pages/private/StudentPages/Enrollments";

import GradingSheet from "pages/private/StudentPages/GradingSheet";
import RequestTOR from "pages/private/StudentPages/RequestTOR";

//teacher
import Browse from "pages/private/TeacherPages/Browse";
import InputGrade from "pages/private/TeacherPages/InputGrade";

function App() {
    const publicRoutes = [
        { path: "/login", element: Login },
        { path: "/register", element: Register },
        { path: "/forgotPassword", element: ForgotPassword },
        { path: "/resetPassword", element: ResetPassword }
    ];

    const privateRoutes = [
        //default routes
        { path: "/dashboard", element: Dashboard },
        { path: "/profile", element: Profile },

        //admin routes
        { path: "/courses", element: Courses, userType: 1 },
        { path: "/subjects", element: Subject, userType: 1 },
        { path: "/createSubject", element: CreateSubject, userType: 1 },
        { path: "/updateSubject/:id", element: UpdateSubject, userType: 1 },
        { path: "/sections", element: Section, userType: 1 },
        { path: "/schoolYears", element: SchoolYear, userType: 1 },
        { path: "/registrations", element: Registrations, userType: 1 },
        {
            path: "/adminViewEnrollments",
            element: AdminViewEnrollments,
            userType: 1
        },
        { path: "/editInfoApproval", element: EditInfoApproval, userType: 1 },

        //student routes
        { path: "/enroll", element: Enroll, userType: 3 },
        {
            path: "/studentViewEnrollments",
            element: StudentViewEnrollments,
            userType: 3
        },
        { path: "/gradingSheet", element: GradingSheet, userType: 3 },
        { path: "/requestTOR", element: RequestTOR, userType: 3 },

        //teacher routes
        { path: "/browse", element: Browse, userType: 4 },
        { path: "/inputGrade", element: InputGrade, userType: 4 }
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
                    </Route>
                </Route>
            </Route>
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    );
}

export default App;
