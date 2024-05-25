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
	ActionProvider,
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

export function makeApp(config?: MelonyApp) {
	return async function App({ children }: { children: React.ReactNode }) {
		const pathname = getPathname();
		const pathArr = pathname.split("/");

		const models = getModels();

		return (
			<QueryProvider>
				<ActionProvider
					actions={config?.actions}
					listAction={listAction}
					createAction={createAction}
					updateAction={updateAction}
					deleteAction={deleteAction}
					loginAction={loginAction}
					logoutAction={logoutAction}
					getUserAction={getUserAction}
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
				</ActionProvider>
			</QueryProvider>
		);
	};
}
