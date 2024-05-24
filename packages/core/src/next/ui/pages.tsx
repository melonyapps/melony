import { Page, SmartTable } from "@melony/ui";
import { getPathname } from "../lib/url";
import { getModel } from "@/prisma";

export function makePage() {
	return async function TablePage() {
		const pathname = getPathname();
		const pathArr = pathname.split("/");

		const model = getModel(pathArr[pathArr.length - 1] || "unknown");

		return (
			<Page title={model?.name}>
				<SmartTable model={model} />
			</Page>
		);
	};
}
