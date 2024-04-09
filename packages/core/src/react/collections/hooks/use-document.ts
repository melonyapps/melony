import { useContext } from "react";
import { DocContext } from "../document-context";

export const useDocument = () => useContext(DocContext);
