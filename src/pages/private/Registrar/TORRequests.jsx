import { useUserStore } from "store/userStore";

const TORRequests = () => {
    const { is_verified: userIsVerified } = useUserStore(state => state);

    if (!userIsVerified) {
        return (
            <>
                <h1 className="is-size-4 mb-5">TOR Requests</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="is-size-4 mb-5">TOR Requests</h1>
        </>
    );
};

export default TORRequests;