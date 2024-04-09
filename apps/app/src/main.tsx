import React from "react";
import ReactDOM from "react-dom/client";
import { MelonyApp } from "@melony/views";
import config from "./config";

import "@melony/ui/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MelonyApp config={config} />
  </React.StrictMode>
);
