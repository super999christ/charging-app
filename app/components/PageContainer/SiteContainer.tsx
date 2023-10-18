import { PropsWithChildren } from "react";

import SiteHeader from "./SiteHeader";
import ToastProvider from "@root/routes/ToastProvider";

function SiteContainer({ children }: PropsWithChildren) {
  return (
    <>
      <SiteHeader />
      <ToastProvider>
        <div className="h-[calc(100dvh_-_75px)] bg-nxu-charging-grey">
          {children}
        </div>
      </ToastProvider>
    </>
  );
}

export default SiteContainer;
