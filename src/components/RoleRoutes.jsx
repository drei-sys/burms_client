import { Outlet, Navigate } from "react-router-dom";

import { useUserStore } from "store/userStore";

const RoleRoutes = props => {
    const { type: userType } = useUserStore(state => state);

    return props.userType === userType ? (
        <Outlet />
    ) : (
        <Navigate replace to="/404" />
    );
};

export default RoleRoutes;
