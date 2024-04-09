import { useNavigate, useParams } from "react-router-dom";
import {
  DocumentProvider,
  useCollection,
  useGetDocument,
} from "@melony/core/react";
import { DocumentForm } from "../components/document-form";
import { Header } from "../components/header";

export function EditPage({}: {}): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  const documentId = params?.documentId || "";

  const {
    slug: collectionSlug,
    updateDoc,
    isUpdatingDoc,
    view,
  } = useCollection();

  const { data: docRes, isLoading } = useGetDocument(
    collectionSlug,
    documentId
  );

  if (isLoading) return <>Loading doc...</>;

  return (
    <DocumentProvider data={docRes?.data}>
      <div className="flex flex-col h-full">
        <Header title={docRes?.data?.title || ""} />

        <div className="p-4 flex flex-col gap-4">
          <DocumentForm
            onSubmit={(data) => {
              updateDoc(
                { id: documentId, data },
                {
                  onSuccess: () => {
                    navigate(`/c/${collectionSlug}/v/${view?.slug || "base"}`);
                  },
                }
              );
            }}
            isSubmitting={isUpdatingDoc}
          />
        </div>
      </div>
    </DocumentProvider>
  );
}
