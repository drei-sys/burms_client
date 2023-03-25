import { Outlet, Navigate } from "react-router-dom";

import { useUserStore } from "store/userStore";

const ProtectedRoutes = () => {
    const { id: userId } = useUserStore(state => state);

    return userId ? <Outlet /> : <Navigate replace to="/login" />;
};

export default ProtectedRoutes;
