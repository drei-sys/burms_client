import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Nav from "./Nav";

const Layout = () => {
    return (
        <div>
            <div style={{ display: "flex" }}>
                <Sidebar />
                <div style={{ backgroundColor: "#F9FCFB", width: "100%" }}>
                    <Nav />
                    <div style={{ padding: 24 }}>
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* <div>
                <Link to="/dashboard">Dashboard</Link>{" "}
                <Link to="/admin">Admin</Link>{" "}
                <Link to="/student">Student</Link>{" "}
                <Link to="/teacher">Teacher</Link>
            </div>
            <div>
                <Outlet />
            </div> */}
        </div>
    );
};

export default Layout;
