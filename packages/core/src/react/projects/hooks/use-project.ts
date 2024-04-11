"use client";

import { useContext } from "react";
import { ProjectContext } from "../project-context";

export const useProject = () => useContext(ProjectContext);
