import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Model } from "@melony/types";
import { DialogTitle } from "@radix-ui/react-dialog";

import { DataTable } from "../data-table";
import { useAction } from "../providers/action-provider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { SmartForm } from "./smart-form";

export function SmartTable({ model }: { model: Model }) {
	const [activeDoc, setActiveDoc] = React.useState<{
		mode: "show" | "update" | "create";
		data?: any;
	} | null>(null);

	const { listAction, getModelActions } = useAction();

	const { data = [], isLoading } = useQuery({
		queryKey: [model.name],
		queryFn: () => listAction({ modelName: model.name }),
	});

	const modelActions = getModelActions(model.name);

	console.log(modelActions);

	return (
		<div id="table" className="h-full flex flex-col">
			<div className="flex justify-between items-center p-2">
				<div>
					<Input placeholder="Search..." />
				</div>
				<div>
					<Button
						onClick={() => {
							setActiveDoc({ mode: "create" });
						}}
					>
						Create
					</Button>
				</div>
			</div>
			<div className="flex-1">
				<DataTable
					columns={model.fields.map((field) => ({
						accessorKey: field.name,
					}))}
					data={data}
					isLoading={isLoading}
					onClickRow={(data) => {
						setActiveDoc({ mode: "update", data });
					}}
				/>
			</div>

			<Dialog
				open={activeDoc?.mode === "create"}
				onOpenChange={(open) => !open && setActiveDoc(null)}
			>
				<DialogContent className="max-w-[44rem]">
					<DialogHeader>
						<DialogTitle>Create</DialogTitle>
					</DialogHeader>

					<SmartForm model={model} onSubmit={() => {}} />
				</DialogContent>
			</Dialog>

			<Dialog
				open={activeDoc?.mode === "update"}
				onOpenChange={(open) => !open && setActiveDoc(null)}
			>
				<DialogContent className="max-w-[44rem]">
					<DialogHeader>
						<DialogTitle>Update</DialogTitle>
					</DialogHeader>

					<SmartForm
						model={model}
						values={activeDoc?.data}
						onSubmit={() => {}}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
