import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import httpRequest from "../utils/httpRequest";
import clientCatchError from "../utils/clientCatchError";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./common/LoadingPage";

const ProtectedRoute = () => {
  const {
    user,
    isLoading,
    setUser,
    setLoading,
  } = useAuthStore();

    const getMyData = async () => {
        setLoading(true);

        try {
            const { data } = await httpRequest.get("/user/getMe");

            setUser(data);
        } 
        catch (error) {
            setUser(null);

            if (error instanceof Error) {
            clientCatchError(error);
            }
        } 
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            getMyData();
        } 
        else {
            setLoading(false);
        }
    }, []);

    if (isLoading) {
        return <LoadingPage/>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;