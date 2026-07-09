import {
  Activity,
  BarChart2,
  LayoutDashboard,
  LogOut,
  Play,
  ShieldAlert,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "animate.css";
import { useEffect } from "react";

interface SidebarProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isSideBarOpen, setIsSideBarOpen }: SidebarProps) => {
  const location = useLocation();
  const currentLocation = location.pathname.split("/").pop();

  const sideBarItems = [
    { icon: LayoutDashboard, label: "Dashboard", route: "", active: false },
    { icon: User, label: "Profile", route: "profile", active: false },
    { icon: Play, label: "API Playground", route: "playground", active: false },
    { icon: BarChart2, label: "Usage", route: "usage", active: false },
    { icon: ShieldAlert, label: "Rate Limit", route: "rate-limit", active: false },
    { icon: Activity, label: "Activity", route: "activity", active: false },
  ];

  useEffect(() => {
  if (window.innerWidth < 768) {
    setIsSideBarOpen(false);
  }
}, [location.pathname, setIsSideBarOpen]);
  return (
    <div className="h-full">
        <aside
          className={`
            border-r border-[#E5E7EB] bg-white flex flex-col justify-between
            transition-all duration-300 ease-in-out

            fixed top-16 left-0 h-[calc(100vh-4rem)] z-40
            md:relative md:top-0 md:h-full

            ${
              isSideBarOpen
                ? "translate-x-0 w-64 p-4 sm:p-5 md:p-6"
                : "-translate-x-full md:translate-x-0 md:w-16 md:px-2 md:py-3"
            }
          `}
        >
        <nav className="grow space-y-2 overflow-y-auto">
          {sideBarItems.map((item, i) => {
            item.active = item.route === currentLocation;

            return (
              <Link
                key={i}
                to={`/${item.route}`}
                className={`flex items-center gap-3 rounded-xl p-3 text-sm font-medium transition-all whitespace-nowrap ${
                  item.active
                    ? "bg-[#EFEFFF] text-[#4F46E5]"
                    : "text-[#6B7280] hover:bg-gray-50"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />

                {isSideBarOpen && (
                  <span className="truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <button
          className={`mt-4 flex items-center bg-indigo-600 p-3 text-lg font-medium text-white transition-all hover:bg-red-600 ${
            isSideBarOpen
              ? "justify-center gap-3 rounded-xl"
              : "justify-center rounded-xl"
          }`}
        >
          <LogOut className="h-5 w-5 shrink-0" />

          {isSideBarOpen && <span>Logout</span>}
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;