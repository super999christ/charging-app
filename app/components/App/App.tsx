import { setRequestHeader } from "../../utils";
import GlobalRouter from "../../routes/Router";
import "./App.css";
import { validateToken } from "../../validations";
import SiteContainer from "../PageContainer/SiteContainer";

function App() {
  const appToken = localStorage.getItem("appToken");
  const isAppTokenValid = validateToken();
  if (isAppTokenValid) setRequestHeader(appToken!);

  return (
    <SiteContainer>
      <GlobalRouter />
    </SiteContainer>
  );
}

export default App;
