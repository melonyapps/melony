import React from "react";
import { View } from "../../config";

export const ViewContext = React.createContext<{
  data?: View;
}>({});
