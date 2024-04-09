import * as React from "react";

export const ProjectContext = React.createContext<{
  projectId: string;
}>({
  projectId: "",
});
