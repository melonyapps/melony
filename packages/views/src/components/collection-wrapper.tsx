import { CollectionParams, CollectionProvider } from "@melony/core/react";
import { Outlet, useParams } from "react-router-dom";

export function CollectionWrapper(props?: {
  collectionSlug?: string;
  viewSlug?: string;
  children?: any;
  baseParams?: CollectionParams;
}): JSX.Element {
  const params = useParams();

  return (
    <CollectionProvider
      slug={
        props?.collectionSlug || params?.collectionSlug || "unknownCollection"
      }
      viewSlug={props?.viewSlug || params?.viewSlug}
      baseParams={props?.baseParams}
    >
      {props?.children || <Outlet />}
    </CollectionProvider>
  );
}
