import { Link, useLocation } from "react-router-dom";
import "assets/css/sidebar.css";

import { useUserStore } from "store/userStore";

const Sidebar = () => {
    const location = useLocation();
    const { type: userType } = useUserStore(state => state);

    const menuItems = [
        //defaul routes
        { name: "Dashboard", path: "/dashboard", userType: undefined },
        { name: "Profile", path: "/profile", userType: undefined },

        //admin routes
        { name: "Courses", path: "/courses", userType: 1 },
        { name: "Subjects", path: "/subjects", userType: 1 },
        { name: "Sections", path: "/sections", userType: 1 },
        { name: "School Years", path: "/schoolYears", userType: 1 },
        { name: "Registrations", path: "/registrations", userType: 1 },
        { name: "Enrollments", path: "/adminViewEnrollments", userType: 1 },
        {
            name: "Edit Info Approval",
            path: "/editInfoApproval",
            userType: 1
        },

        //student routes
        { name: "Enroll", path: "/enroll", userType: 3 },
        { name: "Enrollments", path: "/studentViewEnrollments", userType: 3 },
        { name: "Grading Sheet", path: "/gradingSheet", userType: 3 },
        { name: "Request TOR", path: "/requestTOR", userType: 3 },

        //teacher routes
        { name: "Browse", path: "/browse", userType: 4 },
        { name: "Input Grade", path: "/inputGrade", userType: 4 }
    ];

    return (
        <aside
            style={{
                background: "#21BF73",
                width: 250,
                height: "100vh",
                padding: 16,
                position: "sticky",
                top: 0
            }}
        >
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
        </aside>
    );
};

export default Sidebar;
