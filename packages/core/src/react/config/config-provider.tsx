import { ConfigContext, useInit } from ".";

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const { data = { id: "undefined", collections: {} }, isLoading } = useInit();

  if (isLoading) return <>Initializing app...</>;

  const value = { config: data };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}
