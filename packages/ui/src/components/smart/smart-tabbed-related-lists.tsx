import { Model } from "@melony/types";

import { getRelatedListFields } from "./helpers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useApp } from "../providers/app-provider";
import { SmartTable } from "./smart-table";

export function SmartTabbedRelatedLists({
	model,
	doc,
}: {
	model: Model;
	doc: any;
}) {
	const { models = [] } = useApp();
	const relatedListFields = getRelatedListFields({ model });

	if (relatedListFields.length === 0) return <></>;

	return (
		<Tabs
			defaultValue={relatedListFields?.[0]?.name}
			className="flex flex-col h-full overflow-hidden"
		>
			<TabsList>
				{relatedListFields.map((relatedListField) => (
					<TabsTrigger
						key={relatedListField.name}
						value={relatedListField.name}
					>
						{relatedListField.name}
					</TabsTrigger>
				))}
			</TabsList>

			{relatedListFields.map((relatedListField) => {
				const relatedModel = models.find(
					(x) => x.name === relatedListField.type,
				);

				const relationFromFields = relatedModel?.fields.find(
					(x) => x.type === model.name,
				)?.relationFromFields;

				return (
					<TabsContent
						key={relatedListField.name}
						value={relatedListField.name}
						className="overflow-auto"
					>
						{relatedModel && (
							<SmartTable
								model={relatedModel}
								initialFilter={[
									{
										field: relationFromFields?.[0] || "unknown",
										operator: "Is",
										value: doc?.id,
									},
								]}
							/>
						)}
					</TabsContent>
				);
			})}
		</Tabs>
	);
}
