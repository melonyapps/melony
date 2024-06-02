import { Page, SmartCards, SmartTable } from "@melony/ui";
import { getPathname } from "../lib/url";
import { getModel } from "@/prisma";

export function makePage() {
	return async function TablePage() {
		const pathname = getPathname();
		const pathArr = pathname.split("/");

		const model = getModel(pathArr[pathArr.length - 1] || "unknown");

		if (!model)
			return (
				<div className="flex flex-col gap-4 items-center justify-center h-screen w-full">
					<div className="text-sm">Model not found</div>
				</div>
			);

		if (model?.layout === "Cards") {
			return (
				<Page title={model.name}>
					<SmartCards model={model} />
				</Page>
			);
		}

		return (
			<Page title={model.name}>
				<SmartTable model={model} />
			</Page>
		);
	};
}
