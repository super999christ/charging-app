import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as LogoIcon } from "../../assets/newLogo.svg";
import { ReactComponent as FlagIcon } from "../../assets/flag.svg";
import { ReactComponent as ProfileIcon } from "../../assets/profile.svg";

const SiteHeader: FC = () => {
  const currentLocation = useLocation();

  const shouldShowProfile = () => {
    if (["/", "/auth-sign-up"].includes(currentLocation.pathname)) return false;
    return true;
  };

  return (
    <nav className="w-full h-[75px] bg-nxu-charging-black flex justify-between items-center px-5">
      <FlagIcon />
      <Link to="/charging-station" className="cursor-pointer">
        <LogoIcon style={{ height: "45px" }} className="hover:opacity-80" />
      </Link>
      <div style={{ visibility: shouldShowProfile() ? "visible" : "hidden" }}>
        <Link to="/dashboard">
          <ProfileIcon className="cursor-pointer hover:opacity-80" />
        </Link>
      </div>
    </nav>
  );
};

export default SiteHeader;
