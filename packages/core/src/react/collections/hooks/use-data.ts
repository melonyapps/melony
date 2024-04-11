"use client";

import React from "react";
import { DataContext } from "..";

export const useData = () => React.useContext(DataContext);
