import { useAuthStore } from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    const { user, isLoading } = useAuthStore();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PublicRoutes;