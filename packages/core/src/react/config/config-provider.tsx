"use client";

import { ConfigContext, useInit } from ".";

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const { data = { id: "undefined", collections: [] }, isLoading } = useInit();

  if (isLoading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Initializing app...
      </div>
    );

  const value = { config: data };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}
