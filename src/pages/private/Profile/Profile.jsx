import { useUserStore } from "store/userStore";
import ChangePassword from "./components/ChangePassword";

const Profile = () => {
    const { name: userName } = useUserStore(state => state);

    return (
        <>
            <h1 className="is-size-4 mb-5">Profile</h1>
            <div className="box mb-4">Welcome {userName}</div>

            <div className="columns">
                <div className="column">
                    <div className="box mb-4">
                        <div className="mb-4">Change password</div>
                        <div className="box">
                            <ChangePassword />
                        </div>
                    </div>
                </div>
                <div className="column"></div>
            </div>
        </>
    );
};

export default Profile;
