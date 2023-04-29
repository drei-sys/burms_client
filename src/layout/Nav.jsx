import { useUserStore } from "store/userStore";

import http from "services/httpService";

const Nav = () => {
    const { name: userName } = useUserStore(state => state);

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
                    <button className="button is-light">
                        <span className="icon">
                            <i className="fa-solid fa-bars"></i>
                        </span>
                    </button>
                </div>
                <div>
                    <div className="is-flex">
                        <div className="mt-2">
                            <span className="mr-4">
                                <span className="icon">
                                    <i className="fa-solid fa-user"></i>
                                </span>{" "}
                                {userName}
                            </span>
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
                </div>
            </div>
        </div>
    );
};

export default Nav;
