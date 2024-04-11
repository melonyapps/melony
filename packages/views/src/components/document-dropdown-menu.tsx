"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@melony/ui/dropdown-menu";
import { Button } from "@melony/ui/button";
import { EllipsisVertical, Trash } from "lucide-react";
import { ConfirmDeleteModal } from "./confirm-delete-modal";
import { useCollection } from "@melony/core/react";

export function DocumentDropdownMenu({ docId }: { docId: string }) {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const {
    slug: collectionSlug,
    view,
    deleteDoc,
    isDeletingDoc,
  } = useCollection();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem
            onClick={() => {
              setShowDeleteModal(true);
            }}
          >
            <Trash className="h-4 w-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteModal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        onConfirm={() => {
          deleteDoc(docId, {
            onSuccess: () => {
              setShowDeleteModal(false);
              // navigate(`/c/${collectionSlug}/v/${view?.slug || "base"}`);
            },
          });
        }}
        isConfirming={isDeletingDoc}
      />
    </>
  );
}
