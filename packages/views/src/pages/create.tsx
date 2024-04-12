import { useCollection } from "@melony/core/react";
import { DocumentForm } from "../components/document-form";
import { useNavigate } from "react-router-dom";

export function CreatePage() {
  const navigate = useNavigate();
  const { slug, view } = useCollection();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-4 px-4 h-[52px] border-b">
        <div className="text-lg">Create doc</div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <DocumentForm
          onSuccess={() => {
            navigate(`/c/${slug}/v/${view?.slug || "base"}`);
          }}
        />
      </div>
    </div>
  );
}
