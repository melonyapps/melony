"use client";

import { Field } from "@melony/core";
import { Dialog, DialogContent } from "@melony/ui";
import { DocumentDetails } from "./document-details";

export function DocumentDetailsModal({
	open,
	onClose,
	fields,
	data,
}: {
	open: boolean;
	onClose: () => void;
	fields: Field[];
	data?: any;
}) {
	const handleCloseModal = (open: boolean) => {
		if (!open) onClose();
	};

	return (
		<Dialog open={open} onOpenChange={handleCloseModal}>
			<DialogContent className="max-w-[44rem]">
				<DocumentDetails fields={fields} data={data} />
			</DialogContent>
		</Dialog>
	);
}
