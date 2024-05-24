"use client";

import React, { useState } from "react";
import { fields as melonyFields } from "@melony/core";
import { Button } from "@melony/ui";
import { Table } from "@melony/views/table";
import { DocumentDetailsModal } from "@melony/views/document-details-modal";
import { DocumentUpdateModal } from "@melony/views/document-update-modal";
import { DocumentCreateModal } from "@melony/views/document-create-modal";
import { createDoc, getDocs, updateDoc } from "../actions/crud";
import { getInitialValuesFromPrismaFields } from "../util/initial-values";
import { parseStringOptions } from "../util/options";

export function CrudTable({
	model,
	fields,
	data: initialData,
}: {
	model: string;
	fields: any;
	data?: any;
}) {
	const [data, setData] = React.useState(initialData);

	console.log("rendered");

	const [activeDoc, setActiveDoc] = React.useState<{
		mode: "show" | "update" | "create";
		data?: any;
	} | null>(null);

	const [isUpdating, setIsUpdating] = useState(false);
	const [isCreating, setIsCreating] = useState(false);

	let generatedFields = fields.map((prismaField: any) => {
		const options = parseStringOptions(prismaField?.documentation || "");

		switch (options.mask) {
			case "image":
				return melonyFields.image({ slug: prismaField.name });

			default:
				return melonyFields.input({ slug: prismaField.name });
		}
	});

	return (
		<>
			<Button
				onClick={() => {
					setActiveDoc({ mode: "create" });
				}}
			>
				Create
			</Button>

			<Table
				fields={generatedFields}
				data={data}
				onRowClick={(doc) => {
					setActiveDoc({
						mode: "update",
						data: doc,
					});
				}}
			/>

			<DocumentDetailsModal
				open={activeDoc?.mode === "show"}
				onClose={() => {
					setActiveDoc(null);
				}}
				fields={generatedFields}
				data={activeDoc?.data}
			/>

			<DocumentUpdateModal
				open={activeDoc?.mode === "update"}
				onClose={() => {
					setActiveDoc(null);
				}}
				fields={generatedFields}
				data={activeDoc?.data}
				isSubmitting={isUpdating}
				onSubmit={(data) => {
					setIsUpdating(true);
					updateDoc({ model, data }).then(async () => {
						await getDocs({ model }).then((data) => {
							setData(data);
						});
						setActiveDoc(null);
						setIsUpdating(false);
					});
				}}
			/>

			<DocumentCreateModal
				open={activeDoc?.mode === "create"}
				onClose={() => {
					setActiveDoc(null);
				}}
				data={getInitialValuesFromPrismaFields(fields)}
				fields={generatedFields}
				isSubmitting={isCreating}
				onSubmit={(data) => {
					setIsCreating(true);
					createDoc({ model, data }).then(async () => {
						await getDocs({ model }).then((data) => {
							setData(data);
						});
						setActiveDoc(null);
						setIsCreating(false);
					});
				}}
			/>
		</>
	);
}
