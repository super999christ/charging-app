import { setRequestHeader } from "../../utils";
import GlobalRouter from "../../routes/Router";
import "./App.css";
import { validateToken } from "../../validations";
import SiteContainer from "../PageContainer/SiteContainer";
import { AwsRum, AwsRumConfig } from "aws-rum-web";

try {
  const config: AwsRumConfig = {
    sessionSampleRate: 1,
    guestRoleArn: import.meta.env.VITE_AWS_RUM_GUEST_ROLE_ARN,
    identityPoolId: import.meta.env.VITE_AWS_RUM_IDENTITY_POOL_ID,
    endpoint: "https://dataplane.rum.us-west-2.amazonaws.com",
    telemetries: ["performance", "errors", "http"],
    allowCookies: false,
    enableXRay: false,
  };

  const APPLICATION_ID: string = import.meta.env.VITE_AWS_RUM_APPLICATION_ID;
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
    <SiteContainer>
      <GlobalRouter />
    </SiteContainer>
  );
}

export default App;
