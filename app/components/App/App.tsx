import { setRequestHeader } from "../../utils";
import GlobalRouter from "../../routes/Router";
import PageContainer from "../PageContainer";
import "./App.css";
import { validateToken } from "../../validations";
import ToastProvider from "@root/routes/ToastProvider";
import { AwsRum, AwsRumConfig } from "aws-rum-web";

try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    guestRoleArn:
      "arn:aws:iam::101265448075:role/stage-charging-cognito_unauthenticated",
    identityPoolId: "us-west-2:de501351-32cb-442d-a8a9-8743ade67f09",
    endpoint: "https://dataplane.rum.us-west-2.amazonaws.com",
    telemetries: ["performance", "errors", "http"],
    allowCookies: true,
    enableXRay: false,
  };

  const APPLICATION_ID: string = "9df9af97-ea9a-431d-9d9d-602956ee56dd";
  const APPLICATION_VERSION: string = "1.0.0";
  const APPLICATION_REGION: string = "us-west-2";

  const awsRum: AwsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

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
