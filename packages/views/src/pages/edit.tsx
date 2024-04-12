import { useNavigate, useParams } from "react-router-dom";
import { DocumentProvider, useCollection } from "@melony/core/react";
import { DocumentForm } from "../components/document-form";
import { Header } from "../components/header";

export function EditPage({}: {}): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  const documentId = params?.documentId || "";

  const { slug: collectionSlug, view } = useCollection();

  return (
    <DocumentProvider id={documentId}>
      <div className="flex flex-col h-full">
        <Header title={documentId || ""} />

        <div className="p-4 flex flex-col gap-4">
          <DocumentForm
            onSuccess={() => {
              navigate(`/c/${collectionSlug}/v/${view?.slug || "base"}`);
            }}
          />
        </div>
      </div>
    </DocumentProvider>
  );
}
