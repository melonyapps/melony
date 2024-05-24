import { Sidebar } from "./sidebar";

export function AppShell({
	children,
	title,
	logo,
	nav,
	account,
}: {
	children: JSX.Element | React.ReactNode;
	title: string;
	logo?: any;
	nav: JSX.Element | React.ReactNode;
	account: JSX.Element | React.ReactNode;
}) {
	// const [isCollapsed, setIsCollapsed] = useIsCollapsed();
	const isCollapsed = false;

	return (
		<div className="relative overflow-hidden bg-muted/40 min-h-screen">
			<Sidebar
				logo={logo}
				title={title}
				nav={nav}
				account={account}
				isCollapsed={isCollapsed}
			/>
			<main
				id="content"
				className={`min-h-screen overflow-x-hidden transition-[margin] md:overflow-y-hidden ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
			>
				{children}
			</main>
		</div>
	);
}
