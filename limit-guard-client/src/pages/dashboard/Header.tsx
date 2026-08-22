import { Bell, ChevronDown, LogOut, PanelLeft, User } from "lucide-react";
import Logo from "../../components/common/Logo";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import httpRequest from "../../utils/httpRequest";
import { toast } from "sonner";
import clientCatchError from "../../utils/clientCatchError";

interface HeaderProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ isSideBarOpen, setIsSideBarOpen }: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { user,  setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      setLogoutLoading(true);
      const { data } = await httpRequest.get("/user/logout");
      toast.success(data.message);
      setUser(null);
      navigate("/");
    } 
    catch (error) {
      clientCatchError(error);
    }
    finally{
      setLogoutLoading(false);
    }
  };

  return (
    <div
      className={`sticky top-0 left-0 z-40 h-16 w-full bg-indigo-600 flex items-center justify-between transition-all duration-300 ${
        isSideBarOpen
          ? "px-3 sm:px-4 md:px-6 lg:px-8"
          : "pl-2 pr-3 sm:pr-4 md:pr-6 lg:pr-8"
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-5 md:gap-8">
        <Logo textColor="text-white" iconOnly={!isSideBarOpen} />

        <button
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          className="cursor-pointer rounded-md p-1 hover:bg-white/10 transition"
        >
          <PanelLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <Link to="/notification" className="rounded-full p-2 hover:bg-white/10 transition">
          <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1 hover:shadow-md transition"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
              {user?.fullname?.charAt(0).toUpperCase()}
            </div>

            {/* Hide name on mobile */}
            <span className="hidden sm:block text-sm font-medium whitespace-nowrap capitalize">
              {user?.fullname}
            </span>

            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 sm:w-60 rounded-xl border border-gray-200 bg-white shadow-xl overflow-hidden z-50">
              <div className="border-b px-4 py-3">
                <p className="truncate text-sm font-semibold text-gray-800 capitalize">
                  {user?.fullname}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {user?.email}
                </p>
              </div>

              <Link to={'/profile'} className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-50">
                <User className="h-4 w-4 text-gray-500" />
                Profile
              </Link>

              <button  onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 transition hover:bg-red-50">
                <LogOut className="h-4 w-4"/>
                {logoutLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;