import { useUserStore } from "store/userStore";

const Browse = () => {
    const { status: userStatus } = useUserStore(state => state);

    if (userStatus === "For Verification") {
        return (
            <>
                <h1 className="is-size-4 mb-4">Browse</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="is-size-4 mb-4">Browse</h1>
        </>
    );
};

export default Browse;
