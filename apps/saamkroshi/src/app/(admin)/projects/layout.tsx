import { CollectionProvider } from "@melony/core/react";

export const metadata = {
  title: "Next Melony",
};

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CollectionProvider slug="65a307eab68869084c9faa3d">
      {children}
    </CollectionProvider>
  );
}
