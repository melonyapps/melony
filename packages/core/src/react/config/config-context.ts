"use client";

import React from "react";
import { ConfigProvideProps } from "../../types";

export const ConfigContext = React.createContext<ConfigProvideProps>({
  config: {
    id: "undefined",
    collections: [],
  },
});

export const useConfig = () => React.useContext(ConfigContext);
