import Link from "next/link";
import {
	listAction,
	getModels,
	createAction,
	updateAction,
	deleteAction,
} from "@/prisma";
import {
	AccountPopover,
	AuthProvider,
	AppShell,
	Navigation,
	NavigationItem,
	QueryProvider,
	Protected,
} from "@melony/ui";
import { MelonyApp } from "@melony/types";
import { getPathname } from "../lib/url";
import { getUserAction, loginAction, logoutAction } from "@/prisma/auth";
import { AppProvider } from "@melony/ui";
import { uploadAction } from "@/prisma/storage";

export function makeApp(config?: MelonyApp) {
	return async function App({ children }: { children: React.ReactNode }) {
		const pathname = getPathname();
		const pathArr = pathname.split("/");

		const models = getModels();

		return (
			<QueryProvider>
				<AppProvider
					models={models}
					actions={config?.actions}
					listAction={listAction}
					createAction={createAction}
					updateAction={updateAction}
					deleteAction={deleteAction}
					loginAction={loginAction}
					logoutAction={logoutAction}
					getUserAction={getUserAction}
					uploadAction={uploadAction}
				>
					<AuthProvider>
						<Protected>
							<AppShell
								logo=""
								title="Melony"
								nav={
									<Navigation initialPathname={pathArr[pathArr.length - 1]}>
										{models.map((model) => {
											return (
												<NavigationItem
													key={model.name}
													as={Link}
													icon=""
													title={model.name}
													href={model.name}
												/>
											);
										})}
									</Navigation>
								}
								account={<AccountPopover />}
							>
								{children}
							</AppShell>
						</Protected>
					</AuthProvider>
				</AppProvider>
			</QueryProvider>
		);
	};
}
