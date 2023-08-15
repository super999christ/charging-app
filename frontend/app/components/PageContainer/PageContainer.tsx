import { PropsWithChildren } from "react";
import SiteContainer from "./SiteContainer";

function PageContainer({ children }: PropsWithChildren) {
  return <SiteContainer>{children}</SiteContainer>;
}

export default PageContainer;
