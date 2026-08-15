import { Outlet } from "react-router-dom";
import Header from "../pages/dashboard/Header";
import Sidebar from "../pages/dashboard/Sidebar";
import { useState } from "react";

const UserDashboardLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col bg-[#F8FAFC]">
      <Header
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <Outlet />

          <footer className="mt-8 border-t pt-4 text-center text-xs sm:text-sm text-[#6B7280]">
            © 2025 LimitGuard. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;