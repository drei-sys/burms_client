import { Link, useLocation } from "react-router-dom";
import "assets/css/sidebar.css";

import Logo from "assets/images/logo.png";

import { useUserStore } from "store/userStore";
import { useAppStore } from "store/appStore";

const Sidebar = () => {
    const location = useLocation();
    const { type: userType } = useUserStore(state => state);
    const { isSidebarDrawerVisible, setSidebarDrawerVisible } = useAppStore(
        state => state
    );

    const adminMenuItems = [
        {
            name: "Courses",
            path: "/courses",
            icon: "fa-solid fa-user",
            group: 2
        },
        {
            name: "Subjects",
            path: "/subjects",
            icon: "fa-solid fa-user",
            group: 2
        },
        {
            name: "Sections",
            path: "/sections",
            icon: "fa-solid fa-user",
            group: 2
        },
        {
            name: "School Years",
            icon: "fa-solid fa-user",
            path: "/schoolYears",
            group: 2
        },
        {
            name: "Teacher Subjects",
            icon: "fa-solid fa-user",
            path: "/teacherSubjects",
            group: 2
        },
        {
            name: "Registrations",
            icon: "fa-solid fa-user",
            path: "/registrations",
            group: 3
        },
        {
            name: "Profile Edit Approvals",
            icon: "fa-solid fa-user",
            path: "/profileEditApprovals",
            group: 3
        },
        {
            name: "Enrollments",
            icon: "fa-solid fa-user",
            path: "/viewEnrollments",
            group: 3
        },
        {
            name: "Users",
            icon: "fa-solid fa-user",
            path: "/blockchainUsers",
            group: 5
        },
        {
            name: "Grades",
            icon: "fa-solid fa-user",
            path: "/blockchainGrades",
            group: 5
        }
        // {
        //     name: "Blockchain Read",
        //     icon: "fa-solid fa-user",
        //     path: "/blockchainRead",
        //     group: 5
        // }
    ];
    const studentMenuItems = [
        { name: "Enroll", icon: "fa-solid fa-user", path: "/enroll" },
        {
            name: "Enrollments",
            icon: "fa-solid fa-user",
            path: "/studentViewEnrollments"
        },
        { name: "My Grades", icon: "fa-solid fa-user", path: "/myGrades" },
        { name: "TOR Requests", icon: "fa-solid fa-user", path: "/TORRequests" }
    ];
    const teacherMenuItems = [
        { name: "My Students", icon: "fa-solid fa-user", path: "/myStudents" },
        { name: "Input Grade", icon: "fa-solid fa-user", path: "/inputGrade" }
    ];
    const registrarMenuItems = [
        {
            name: "Students",
            icon: "fa-solid fa-user",
            path: "/registrarStudents"
        },
        {
            name: "TOR Requests",
            icon: "fa-solid fa-user",
            path: "/registrarTORRequests"
        },
        {
            name: "Released Docs",
            icon: "fa-solid fa-user",
            path: "/releasedDocs"
        },
        {
            name: "Digitalized Files",
            icon: "fa-solid fa-user",
            path: "/digitalizedFiles"
        }
    ];
    const deanMenuItems = [
        {
            name: "Teacher Subjects",
            icon: "fa-solid fa-user",
            path: "/deanTeacherSubjects"
        }
        //{ name: "Approve Grades", path: "/approveGrades" }
    ];
    const deptChainMenuItems = [
        {
            name: "Students",
            icon: "fa-solid fa-user",
            path: "/deptChairStudents"
        },
        {
            name: "Sections",
            icon: "fa-solid fa-user",
            path: "/deptChairSections"
        },
        {
            name: "School Years",
            icon: "fa-solid fa-user",
            path: "/deptChairSchoolYears"
        }
    ];

    const menuItems = [
        //defaul routes
        {
            name: "Dashboard",
            icon: "fa-solid fa-user",
            path: "/dashboard",
            userType: undefined
        },
        {
            name: "Profile",
            icon: "fa-solid fa-user",
            path: "/profile",
            userType: undefined
        },
        ...studentMenuItems.map(i => ({ ...i, userType: "Student" })),
        ...teacherMenuItems.map(i => ({ ...i, userType: "Teacher" })),
        ...registrarMenuItems.map(i => ({ ...i, userType: "Registrar" })),
        ...deanMenuItems.map(i => ({ ...i, userType: "Dean" })),
        ...deptChainMenuItems.map(i => ({ ...i, userType: "DeptChair" }))
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
                            onClick={() => setSidebarDrawerVisible(false)}
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
                            onClick={() => setSidebarDrawerVisible(false)}
                        >
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/announcements"
                            className={
                                location.pathname === "/announcements"
                                    ? "is-active"
                                    : ""
                            }
                            onClick={() => setSidebarDrawerVisible(false)}
                        >
                            Announcement
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
                                    onClick={() =>
                                        setSidebarDrawerVisible(false)
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
                                    onClick={() =>
                                        setSidebarDrawerVisible(false)
                                    }
                                >
                                    {name}
                                </Link>
                            </li>
                        ))}
                </ul>
                <p className="menu-label has-text-white">Blockchain</p>
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
                                    onClick={() =>
                                        setSidebarDrawerVisible(false)
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

    const SidebarMenuItems = () => {
        return userType === "Admin" ? (
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
                                    onClick={() =>
                                        setSidebarDrawerVisible(false)
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
                                    onClick={() =>
                                        setSidebarDrawerVisible(false)
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
        <div>
            <aside
                className="is-hidden-touch"
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
                <div
                    style={{
                        backgroundColor: "#20aa68",
                        borderRadius: 5,
                        padding: "5px 10px"
                    }}
                    className="is-flex is-align-items-center"
                >
                    <div className="mr-2">
                        <img
                            src={Logo}
                            alt="logo"
                            width={32}
                            height={32}
                            style={{ marginTop: 5 }}
                        />
                    </div>
                    <div className="mr-2">
                        <h1
                            className="is-size-4 has-text-weight-bold has-text-white"
                            style={{ marginTop: -2 }}
                        >
                            BURMS
                        </h1>
                    </div>
                    <div>
                        <span className="has-text-white is-size-7">v1.0</span>
                    </div>
                </div>

                <SidebarMenuItems />
            </aside>

            <div className={`modal ${isSidebarDrawerVisible && "is-active"}`}>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "relative"
                    }}
                >
                    <div
                        className="modal-background"
                        style={{ zIndex: 5 }}
                        onClick={() => setSidebarDrawerVisible(false)}
                    ></div>
                    <div
                        className="box"
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: 300,
                            zIndex: 6,
                            height: "100%",
                            overflow: "auto",
                            borderRadius: 0,
                            background: "#21BF73"
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#20aa68",
                                borderRadius: 5,
                                padding: "5px 10px"
                            }}
                            className="is-flex is-align-items-center"
                        >
                            <div className="mr-2">
                                <img
                                    src={Logo}
                                    alt="logo"
                                    width={32}
                                    height={32}
                                    style={{ marginTop: 5 }}
                                />
                            </div>
                            <div className="mr-2">
                                <h1
                                    className="is-size-4 has-text-weight-bold has-text-white"
                                    style={{ marginTop: -2 }}
                                >
                                    BURMS
                                </h1>
                            </div>
                            <div>
                                <span className="has-text-white is-size-7">
                                    v1.0
                                </span>
                            </div>
                            <div>
                                <button
                                    className="button ml-6 is-small"
                                    onClick={() =>
                                        setSidebarDrawerVisible(false)
                                    }
                                >
                                    <span className="icon">
                                        <i className="fa-solid fa-xmark"></i>
                                    </span>
                                </button>
                            </div>
                        </div>

                        <SidebarMenuItems />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
