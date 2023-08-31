import { setRequestHeader } from "../../utils";
import GlobalRouter from "../../routes/Router";
import PageContainer from "../PageContainer";
import "./App.css";
import { validateToken } from "../../validations";
import ToastProvider from "@root/routes/ToastProvider";

function App() {
  const appToken = localStorage.getItem("appToken");
  const isAppTokenValid = validateToken();
  if (isAppTokenValid) setRequestHeader(appToken!);

  return (
    <div className="h-screen">
      <ToastProvider>
        <PageContainer>
          <GlobalRouter />
        </PageContainer>
      </ToastProvider>
    </div>
  );
}

export default App;
