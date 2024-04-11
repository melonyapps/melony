"use client";

import React from "react";

export const DocContext = React.createContext<{
  data: any;
  isLoading?: boolean;
}>({ data: {} });
