import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./main.css";
import App from "../App";
import { setRequestHeader } from "../../utils";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const token = localStorage.getItem("appToken");
if (token) {
  setRequestHeader(token);
}

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
