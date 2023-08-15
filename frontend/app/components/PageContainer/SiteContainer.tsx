import { PropsWithChildren } from "react";

import SiteHeader from "./SiteHeader";

function SiteContainer({ children }: PropsWithChildren) {
  return (
    <>
      <SiteHeader />
      <div className="min-h-[calc(100vh_-_75px)] bg-nxu-charging-grey">
        {children}
      </div>
    </>
  );
}

export default SiteContainer;
