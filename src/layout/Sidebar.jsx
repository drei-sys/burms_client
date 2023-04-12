import { Link, useLocation } from "react-router-dom";
import "assets/css/sidebar.css";

import { useUserStore } from "store/userStore";

const Sidebar = () => {
    const location = useLocation();
    const { type: userType } = useUserStore(state => state);

    const adminMenuItems = [
        { name: "Courses", path: "/courses", group: 2 },
        { name: "Subjects", path: "/subjects", group: 2 },
        { name: "Sections", path: "/sections", group: 2 },
        { name: "School Years", path: "/schoolYears", group: 2 },
        { name: "Assigned Teachers", path: "/assignedTeachers", group: 2 },
        { name: "Registrations", path: "/registrations", group: 3 },
        {
            name: "Profile Edit Approvals",
            path: "/profileEditApprovals",
            group: 3
        },
        { name: "Enrollments", path: "/adminViewEnrollments", group: 3 },
        { name: "Blockchain", path: "/blockchain", group: 5 }
    ];
    const studentMenuItems = [
        { name: "Enroll", path: "/enroll" },
        { name: "Enrollments", path: "/studentViewEnrollments" },
        { name: "Grading Sheet", path: "/gradingSheet" },
        { name: "Request TOR", path: "/requestTOR" }
    ];
    const teacherMenuItems = [
        { name: "Browse", path: "/browse" },
        { name: "Input Grade", path: "/inputGrade" }
    ];
    const registrarMenuItems = [{ name: "TOR Requests", path: "/TORRequests" }];

    const deanMenuItems = [
        { name: "Approve Grades", path: "/approveGrades" },
        { name: "Assign Teacher", path: "/assignTeacher" }
    ];

    const deptChainMenuItems = [
        { name: "School Year", path: "/deptChairSchoolYears" }
    ];

    const menuItems = [
        //defaul routes
        { name: "Dashboard", path: "/dashboard", userType: undefined },
        { name: "Profile", path: "/profile", userType: undefined },
        ...studentMenuItems.map(i => ({ ...i, userType: 3 })),
        ...teacherMenuItems.map(i => ({ ...i, userType: 4 })),
        ...registrarMenuItems.map(i => ({ ...i, userType: 6 })),
        ...deanMenuItems.map(i => ({ ...i, userType: 7 })),
        ...deptChainMenuItems.map(i => ({ ...i, userType: 8 }))
    ];

    const AdminMenuItems = () => {
        return (
            <>
                <p className="menu-label has-text-white">Menu</p>
                <ul className="menu-list">
                    <li>
                        <Link
                            to="/dashboard"
                            className={
                                location.pathname === "/dashboard"
                                    ? "is-active"
                                    : ""
                            }
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile"
                            className={
                                location.pathname === "/profile"
                                    ? "is-active"
                                    : ""
                            }
                        >
                            Profile
                        </Link>
                    </li>
                </ul>
                <p className="menu-label has-text-white">Curriculum</p>
                <ul className="menu-list">
                    {adminMenuItems
                        .filter(({ group }) => group === 2)
                        .map(({ name, path }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    className={
                                        path === location.pathname
                                            ? "is-active"
                                            : ""
                                    }
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                </ul>
                <p className="menu-label has-text-white">Verification</p>
                <ul className="menu-list">
                    {adminMenuItems
                        .filter(({ group }) => group === 3)
                        .map(({ name, path }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    className={
                                        path === location.pathname
                                            ? "is-active"
                                            : ""
                                    }
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                </ul>
                <p className="menu-label has-text-white">Users</p>
                <ul className="menu-list">
                    {adminMenuItems
                        .filter(({ group }) => group === 5)
                        .map(({ name, path }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    className={
                                        path === location.pathname
                                            ? "is-active"
                                            : ""
                                    }
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                </ul>
            </>
        );
    };

    return (
        <aside
            style={{
                background: "#21BF73",
                width: 270,
                height: "100vh",
                padding: 16,
                position: "sticky",
                overflow: "auto",
                top: 0
            }}
        >
            {userType === 1 ? (
                <AdminMenuItems />
            ) : (
                <>
                    <p className="menu-label has-text-white">Menu</p>
                    <ul className="menu-list">
                        {menuItems
                            .filter(({ userType }) => userType === undefined)
                            .map(({ name, path }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={
                                            path === location.pathname
                                                ? "is-active"
                                                : ""
                                        }
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        {menuItems
                            .filter(props => props.userType === userType)
                            .map(({ name, path }) => (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={
                                            path === location.pathname
                                                ? "is-active"
                                                : ""
                                        }
                                    >
                                        {name}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </>
            )}
        </aside>
    );
};

export default Sidebar;
