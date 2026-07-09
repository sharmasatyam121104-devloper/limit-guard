import { Bell, ChevronDown, PanelLeft } from "lucide-react"
import Logo from "../../components/common/Logo"

const Header = () => {
  return (
    <div className="h-16 w-full bg-indigo-600 flex items-center justify-between px-8 sticky top-0 left-0">
        <div className="flex items-center gap-8">
            <Logo textColor="text-white"/>
            <button className="cursor-pointer"><PanelLeft color="white"/></button>
        </div>
        <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-white" />
            <div className="flex items-center gap-2 border border-[#E5E7EB] rounded-full p-1 pl-3 bg-white">
              <span className="text-sm font-medium">Satyam</span>
              <div className="w-8 h-8 bg-[#4F46E5] rounded-full text-white flex items-center justify-center text-xs">S</div>
              <ChevronDown className="w-4 h-4 text-[#6B7280]" />
            </div>
        </div>
    </div>
  )
}

export default Header