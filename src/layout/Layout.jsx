import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Nav from "./Nav";

const Layout = () => {
    return (
        <div>
            <div style={{ display: "flex", position: "relative" }}>
                <Sidebar />
                <div
                    style={{
                        backgroundColor: "#F9FCFB",
                        width: "100%",
                        minHeight: "100vh"
                    }}
                >
                    <Nav />
                    <div style={{ padding: 24 }}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
