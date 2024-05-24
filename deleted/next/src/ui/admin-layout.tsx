import { AppShell, Navigation, NavigationItem } from "@melony/ui";
import { getPathname } from "../util/get-pathname";
// import fs from "fs";
// import path from "path";
import Link from "next/link";
import { Prisma } from "@prisma/client";

// function getDirectories(path: string) {
// 	return fs.readdirSync(path).filter(function (file) {
// 		return fs.statSync(path + "/" + file).isDirectory();
// 	});
// }

export function makeAdminLayout() {
	return function Page({ children }: { children: React.ReactNode }) {
		// const dir = path.resolve("./src/app/(melony)");
		const pathname = getPathname();

		const prismaModels = Prisma.dmmf.datamodel.models;

		return (
			<AppShell
				title="Melony"
				nav={
					<Navigation>
						{prismaModels.map((prismaModel) => {
							return (
								<NavigationItem
									key={prismaModel.name}
									as={Link}
									title={prismaModel.name}
									href={prismaModel.name}
									active={
										prismaModel.name === (pathname || "").replaceAll("/", "")
									}
								/>
							);
						})}
					</Navigation>
				}
				account={<>account</>}
			>
				{children}
			</AppShell>
		);
	};
}
