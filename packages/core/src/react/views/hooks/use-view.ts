import { useContext } from "react";
import { ViewContext } from "../view-context";

export const useView = () => useContext(ViewContext);
