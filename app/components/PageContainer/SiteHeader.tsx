import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as LogoIcon } from "../../assets/logo.svg";
import { ReactComponent as AppIcon } from "../../assets/appTitle.svg";
import { ReactComponent as FlagIcon } from "../../assets/flag.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";
import { validateToken } from "@root/validations";

const SiteHeader: FC = () => {
  const currentLocation = useLocation();

  const shouldShowProfile = () => {
    if (['/', '/auth-sign-up'].includes(currentLocation.pathname))
      return false;
    return true;
  };

  return (
    <div className="w-full h-[75px] bg-nxu-charging-black flex justify-between items-center px-5">
      <Link to="/charging-login" className="cursor-pointer">
        <LogoIcon className="hover:opacity-80" />
      </Link>
      <div className="flex gap-[10px]">
        <FlagIcon className="cursor-pointer" />
        {shouldShowProfile() && (
          <Link to="/dashboard">
            <ProfileIcon className="cursor-pointer hover:opacity-80" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default SiteHeader;
