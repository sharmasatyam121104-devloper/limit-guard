import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../pages/auth/Login";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import Signup from "../pages/auth/Signup";
import UserDashboardLayout from "../layouts/UserDashboardLayout";
import Profile from "../pages/dashboard/Profile";
import ApiPlayground from "../pages/dashboard/ApiPlayground";
import Usage from "../pages/dashboard/Usage";
import RateLimit from "../pages/dashboard/RateLimit";
import Activity from "../pages/dashboard/Activity";
import PublicRoutes from "../components/PublicRoutes";
import ProtectedRoute from "../components/ProtectedRoute";
import Notification from "../pages/dashboard/Notification";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/",
        element: <UserDashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: '/profile',
            element: <Profile/>
          },
          {
            path: '/playground',
            element: <ApiPlayground/>
          },
          {
            path: '/usage',
            element: <Usage/>
          },
          {
            path: '/rate-limit',
            element: <RateLimit/>
          },
          {
            path: '/activity',
            element: <Activity/>
          },
          {
            path: "/notification",
            element: <Notification />,
          }

        ]
    }
    ],  
  }
,
  {
    path: "*",
    element: <NotFound />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;