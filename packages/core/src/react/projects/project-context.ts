"use client";

import * as React from "react";
import { IProject } from "./types";

export const ProjectContext = React.createContext<{
  projectId: string;
  project?: IProject | null;
  isLoading?: boolean;
}>({
  projectId: "",
});
