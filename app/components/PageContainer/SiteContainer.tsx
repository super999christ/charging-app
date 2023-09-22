import { PropsWithChildren } from "react";

import SiteHeader from "./SiteHeader";

function SiteContainer({ children }: PropsWithChildren) {
  return (
    <>
      <SiteHeader />
      <div className="portrait:h-[calc(100dvh_-_75px)] bg-nxu-charging-grey">
        {children}
      </div>
    </>
  );
}

export default SiteContainer;
