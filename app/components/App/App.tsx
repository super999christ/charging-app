import { setRequestHeader } from "../../utils";
import GlobalRouter from "../../routes/Router";
import PageContainer from "../PageContainer";
import "./App.css";
import { validateToken } from "../../validations";

function App() {
  const appToken = localStorage.getItem("appToken");
  const isAppTokenValid = validateToken();
  if (isAppTokenValid) setRequestHeader(appToken!);

  return (
    <div className="h-screen">
      <PageContainer>
        <GlobalRouter />
      </PageContainer>
    </div>
  );
}

export default App;
