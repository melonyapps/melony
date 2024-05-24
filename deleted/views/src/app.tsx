"use client";

import { useSession } from "@melony/core";
import { AppShell } from "@melony/ui";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { AccountPopover } from "./components/account-popover";
import { LoginPage } from "./pages/login";
import { ListPage } from "./pages/list";
import { ViewPage } from "./pages/view";
import { CreatePage } from "./pages/create";
import { EditPage } from "./pages/edit";

type AppProps = {};

export const App = ({}: AppProps) => {
	useSession();

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<AppShell
							title="Melony"
							nav={<Navigation />}
							account={<AccountPopover />}
						>
							<Outlet />
						</AppShell>
					}
				>
					<Route path="/:collectionSlug" element={<ListPage />} />
					<Route path="/:collectionSlug/:docId" element={<ViewPage />} />
					<Route path="/:collectionSlug/create" element={<CreatePage />} />
					<Route path="/:collectionSlug/edit/:docId" element={<EditPage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
};
