import { Prisma, PrismaClient } from "@prisma/client";
import { Page } from "@melony/views/page";
import { CrudTable } from "./crud-table";
import { getDocs } from "../actions/crud";
import { getPathname } from "../util/get-pathname";

type ModelNames = keyof {
	[P in keyof PrismaClient as P extends `$${string}` ? never : P]: null;
};

export function makeTablePage() {
	return async function TablePage() {
		const pathname = getPathname();
		const model = pathname.replaceAll("/", "");

		const data = await getDocs({ model: model as string });

		const prismaFields =
			Prisma.dmmf.datamodel.models.find((x) => x.name === model)?.fields || [];

		return (
			<Page title={(model as string) || "unknown"}>
				<CrudTable model={model as string} fields={prismaFields} data={data} />
			</Page>
		);
	};
}
