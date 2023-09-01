const express = require("express");
const path = require("path");

import { AwsRum } from "aws-rum-web";

try {
  const config = {
    sessionSampleRate: 0.1,
    endpoint: "https://dataplane.rum.us-west-2.amazonaws.com",
    telemetries: [],
    allowCookies: false,
    enableXRay: false,
  };

  const APPLICATION_ID = "7ee76bc6-276f-4497-834b-1df09ff6313b";
  const APPLICATION_VERSION = "1.0.0";
  const APPLICATION_REGION = "us-west-2";

  const awsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

const app = express();

// Serve the build folder
app.use(express.static(path.join(__dirname, "/build")));

// Handle SPA routing, return the index.html file
app.get("/healthz", (req, res) => {
  res.status(200).send("Alive");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));
