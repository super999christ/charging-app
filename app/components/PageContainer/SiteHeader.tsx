import { FC } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as LogoIcon } from "../../assets/logo.svg";
import { ReactComponent as AppIcon } from "../../assets/appTitle.svg";
import { ReactComponent as FlagIcon } from "../../assets/flag.svg";

const SiteHeader: FC = () => {
  return (
    <div className="w-full h-[75px] bg-nxu-charging-black flex justify-between items-center px-5">
      <Link to="/" className="cursor-pointer">
        <LogoIcon className="hover:opacity-80" />
      </Link>
      <Link to="/charging-login" className="cursor-pointer">
        <AppIcon />
      </Link>
      <FlagIcon />
    </div>
  );
};

export default SiteHeader;
