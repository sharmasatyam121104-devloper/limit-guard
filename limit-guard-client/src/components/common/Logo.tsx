import { ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  name?: string;
  icon?: LucideIcon;
  iconOnly?: boolean;
  textOnly?: boolean;
  size?: number;
  textSize?: string;
  to?: string;
  className?: string;
  iconColor?: string;
  textColor?: string;
  iconBgColor?: string;
}

const Logo = ({
  name = "LimitGuard",
  icon: Icon = ShieldCheck,
  iconOnly = false,
  textOnly = false,
  size = 36,
  textSize = "text-2xl",
  to = "/",
  className = "",
  iconColor="white",
  textColor="text-slate-900",
  iconBgColor = "bg-indigo-600"
}: LogoProps) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-1 ${className}`}
    >
      {!textOnly && (
        <div className={`flex items-center justify-center ${iconBgColor}text-white`}>
          <Icon size={size} 
            color={iconColor}
          />
        </div>
      )}

      {!iconOnly && (
        <h1
          className={`${textSize} font-bold tracking-tight ${textColor}`}
        >
          {name}
        </h1>
      )}
    </Link>
  );
};

export default Logo;