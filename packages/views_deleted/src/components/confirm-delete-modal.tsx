import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@melony/ui";

export function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  isConfirming,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isConfirming?: boolean;
}) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {/* <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
            }}
            disabled={isConfirming}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
