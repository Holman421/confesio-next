import React from "react";

import DashboardIcon from "./icons/DashboardIcon";
import FileIcon from "./icons/FileIcon";
import ProfileIcon from "./icons/ProfileIcon";
import SettingsIcon from "./icons/SettingsIcon";
import SignInIcon from "./icons/SignInIcon";
import SignUpIcon from "./icons/SignUpIcon";
import TablesIcon from "./icons/TablesIcon";

type NavButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  iconType?:
    | "dashboard"
    | "files"
    | "profile"
    | "settings"
    | "sign-in"
    | "sign-up"
    | "tables";
    isActive?: boolean;
};

const NavButton = ({
  label,
  variant = "primary",
  onClick,
  iconType,
    isActive = false,
}: NavButtonProps) => {
  const getIconComponent = (type: NavButtonProps["iconType"]) => {
    const iconMap = {
      dashboard: DashboardIcon,
      files: FileIcon,
      profile: ProfileIcon,
      settings: SettingsIcon,
      "sign-in": SignInIcon,
      "sign-up": SignUpIcon,
      tables: TablesIcon,
    };
    return type ? iconMap[type] : null;
  };

  const isPrimary = variant === "primary";
const mainBackground = isActive
    ? "bg-gradient-to-tr from-[#0052CC] to-[#582CFF]"
    : "hover:bg-white/10 transition-colors duration-300";
  const iconColor =  isActive ? "text-white" : isPrimary ? "text-[#582CFF]" : "text-[#0075FF]";
  const iconBackground = isActive ? "bg-gradient-to-tr from-[#0052CC] to-[#582CFF]" : "bg-[#1A1F37]";





  return (
    <button
      className={`${mainBackground} flex w-full cursor-pointer items-center rounded-2xl gap-15  py-12 px-16`}
      onClick={onClick}
    >
      {iconType && (
        <div className={`size-30 rounded-xl flex items-center justify-center ${iconBackground}`}>
          {(() => {
            const Icon = getIconComponent(iconType);
            return Icon ? <Icon className={`size-15 ${iconColor}`} /> : null;
          })()}
        </div>
      )}
      <span className="text-white font-bold text-[14px]/[100%]">{label}</span>
    </button>
  );
};

export default NavButton;
