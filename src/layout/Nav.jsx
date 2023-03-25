import http from "services/httpService";

const Nav = () => {
    const handleLogout = async () => {
        await http.post("/logout");
        window.location.pathname = "/login";
    };

    return (
        <div style={{ backgroundColor: "#fff", padding: 16 }}>
            <div className="is-flex is-justify-content-space-between">
                <div></div>
                <div>
                    <button className="button is-light" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Nav;
