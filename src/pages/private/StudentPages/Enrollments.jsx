import { useUserStore } from "store/userStore";

const Enrollments = () => {
    const { is_verified: userIsVerified } = useUserStore(state => state);

    if (!userIsVerified) {
        return (
            <>
                <h1 className="is-size-4 mb-5">Enrollments</h1>
                <div className="notification is-warning my-4">
                    Your account is pending for admin verification.
                </div>
            </>
        );
    }

    return (
        <>
            <h1 className="is-size-4 mb-5">Enrollments</h1>
        </>
    );
};

export default Enrollments;
