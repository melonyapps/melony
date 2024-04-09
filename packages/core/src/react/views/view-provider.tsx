import { ViewContext } from ".";
import { useConfig } from "..";

export function ViewProvider({
  children,
  collectionSlug,
  viewSlug,
}: {
  children: React.ReactNode;
  collectionSlug: string;
  viewSlug: string;
}) {
  const { config } = useConfig();

  const collection = config.collections.find((x) => x.slug === collectionSlug);
  const view = (collection?.views || []).find((x) => x.slug === viewSlug);

  const value = { data: { ...view, slug: viewSlug } };

  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>;
}
