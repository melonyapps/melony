"use client";

import { DocContext } from ".";

export function DocumentProvider({
  children,
  data,
}: {
  children: JSX.Element | JSX.Element[];
  data: any;
}) {
  const value = { data };

  return <DocContext.Provider value={value}>{children}</DocContext.Provider>;
}
