import { Activity, BarChart2, LayoutDashboard, LogOut, Play, Settings, ShieldAlert, User } from "lucide-react"

const Sidebar = () => {
  return (
    <div className="h-full">
        <aside className="w-64 border-r border-[#E5E7EB] bg-white p-6 flex flex-col h-160">
        <nav className="space-y-2 grow">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: true },
            { icon: User, label: 'Profile', active: false },
            { icon: Play, label: 'API Playground', active: false },
            { icon: BarChart2, label: 'Usage', active: false },
            { icon: ShieldAlert, label: 'Rate Limit', active: false },
            { icon: Activity, label: 'Activity', active: false },
            { icon: Settings, label: 'Settings', active: false },
          ].map((item, i) => (
            <button key={i} className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium transition-all ${item.active ? 'bg-[#EFEFFF] text-[#4F46E5]' : 'text-[#6B7280] hover:bg-gray-50'}`}>
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          ))}
        </nav>

        <button className="flex justify-center items-center gap-3 text-white p-3 text-lg font-medium hover:bg-red-600 rounded-t-xl bg-indigo-600" >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>
    </div>
  )
}

export default Sidebar