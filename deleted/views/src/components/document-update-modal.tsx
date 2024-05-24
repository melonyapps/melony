"use client";

import { Field } from "@melony/core";
import { Dialog } from "@melony/ui";
import { DocumentFormForModal } from "./document-form-for-modal";

export function DocumentUpdateModal({
	open,
	onClose,
	fields,
	data,
	onSubmit,
	isSubmitting,
}: {
	open: boolean;
	onClose: () => void;
	fields: Field[];
	data?: any;
	onSubmit: (data: any) => void;
	isSubmitting?: boolean;
}) {
	const handleCloseModal = (open: boolean) => {
		if (!open) onClose();
	};

	return (
		<Dialog open={open} onOpenChange={handleCloseModal}>
			<DocumentFormForModal
				fields={fields}
				data={data}
				onSubmit={onSubmit}
				isSubmitting={isSubmitting}
			/>
		</Dialog>
	);
}
