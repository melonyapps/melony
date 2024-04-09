import { config } from "@melony/core";
import { authProvider as firebaseAuthProvider } from "@melony/firebase";
import { dataProvider as melonyDataProvider } from "melony-data-provider";
import visits from "./collections/visits";
import patients from "./collections/patients";

const authProvider = firebaseAuthProvider({
  apiKey: "AIzaSyD7bgrl9nUKyWBvmklN4QBPcT-0bJegz6w",
  authDomain: `${"melonify-app"}.firebaseapp.com`,
  projectId: "melonify-app",
});

const dataProvider = melonyDataProvider({
  apiUrl: "http://localhost:3030/api/v1",
});

export default config({
  id: "65940c17c7036bb7592a6161",
  collections: [visits, patients],
  authProvider,
  dataProvider,
});
