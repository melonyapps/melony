import { authProvider } from "@melony/firebase";
import { MelonyStudio } from "@melony/studio";
import { dataProvider } from "@melony/core";
import React from "react";
import ReactDOM from "react-dom/client";
import "@melony/ui/globals.css";

const auth = authProvider({
  apiKey: "AIzaSyD7bgrl9nUKyWBvmklN4QBPcT-0bJegz6w",
  authDomain: `${"melonify-app"}.firebaseapp.com`,
  projectId: "melonify-app",
});

const data = dataProvider({ apiUrl: "http://localhost:3030/api/v1" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MelonyStudio authProvider={auth} dataProvider={data} />
  </React.StrictMode>
);
