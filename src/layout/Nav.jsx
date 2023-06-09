import { useUserStore } from "store/userStore";
import { useAppStore } from "store/appStore";

import http from "services/httpService";

const Nav = () => {
    const { name: userName, type: userType } = useUserStore(state => state);
    const { isSidebarDrawerVisible, setSidebarDrawerVisible } = useAppStore(
        state => state
    );

    const handleLogout = async () => {
        await http.post("/logout");
        window.location.pathname = "/login";
    };

    return (
        <div
            style={{
                backgroundColor: "#fff",
                padding: 16,
                borderBottom: "1px solid #dbdbdb"
            }}
        >
            <div className="is-flex is-justify-content-space-between">
                <div>
                    <button
                        className="button is-light is-hidden-desktop"
                        onClick={() =>
                            setSidebarDrawerVisible(!isSidebarDrawerVisible)
                        }
                    >
                        <span className="icon">
                            <i className="fa-solid fa-bars"></i>
                        </span>
                    </button>
                </div>
                <div>
                    <div className="is-flex is-hidden-mobile">
                        <div>
                            <div className="mt-2">
                                <span>
                                    <span className="icon">
                                        <i className="fa-solid fa-user"></i>
                                    </span>{" "}
                                    {userName}{" "}
                                </span>
                                <span
                                    className="is-size-7 has-background-info has-text-white mr-4"
                                    style={{
                                        marginLeft: 3,
                                        padding: "2px 5px",
                                        borderRadius: 3
                                    }}
                                >
                                    {userType}
                                </span>
                            </div>
                            <div style={{ marginTop: -7 }}></div>
                        </div>
                        <div>
                            <button
                                className="button is-light"
                                onClick={handleLogout}
                            >
                                <span className="icon mr-1">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </span>{" "}
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className="is-flex is-hidden-tablet">
                        <div className="mr-4">
                            {/* <div>{userName.replace(/(.{11})..+/, "$1...")}</div> */}
                            <div>{userName}</div>
                            <div className="has-text-right">
                                <span
                                    className="is-size-7 has-background-info has-text-white "
                                    style={{
                                        marginLeft: 3,
                                        padding: "2px 5px",
                                        borderRadius: 3
                                    }}
                                >
                                    {userType}
                                </span>
                            </div>
                        </div>
                        <div>
                            <button
                                className="button is-light"
                                onClick={handleLogout}
                            >
                                <span className="icon">
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nav;
