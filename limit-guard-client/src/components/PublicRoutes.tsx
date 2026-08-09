import { useAuthStore } from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./common/LoadingPage";

const PublicRoutes = () => {
    const { user, isLoading } = useAuthStore();

    if (isLoading) {
        return <LoadingPage/>;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PublicRoutes;