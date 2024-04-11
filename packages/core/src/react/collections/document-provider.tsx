"use client";

import { DocContext, useCollection, useGetDocument } from ".";

export function DocumentProvider({
  children,
  id,
}: {
  children: JSX.Element | JSX.Element[];
  id: any;
}) {
  const { slug } = useCollection();

  const { data: docRes, isLoading } = useGetDocument(slug, id);

  const value = { data: docRes?.data || {} };

  return <DocContext.Provider value={value}>{children}</DocContext.Provider>;
}
