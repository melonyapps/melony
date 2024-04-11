import React from "react";
import { DocumentProvider, useCollection } from "@melony/core/react";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentFieldProps } from "@melony/core/config";
import { DocumentHeader } from "../components/document-header";
import { DocumentDetails } from "../components/document-details";
import { DocumentSubcollections } from "../components/document-subcollections";

export function ShowPage({}: {}): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();

  const documentId = params?.documentId || "";

  const { schema } = useCollection();

  // TODO: we need to auto-detect the type
  const subcollectionFields: DocumentFieldProps[] = schema.filter(
    (x) => x.type === "DOCUMENTS"
  );

  return (
    <DocumentProvider id={documentId}>
      <DocumentHeader />

      <div className="flex flex-col gap-4 h-full">
        <div className="p-4 flex flex-col gap-4">
          <DocumentDetails />
        </div>

        {subcollectionFields.length > 0 && <DocumentSubcollections />}
      </div>
    </DocumentProvider>
  );
}
