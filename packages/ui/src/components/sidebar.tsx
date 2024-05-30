import { cn } from "../lib";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
	isCollapsed: boolean;
	title: string;
	logo?: any;
	nav: JSX.Element | React.ReactNode;
	account: JSX.Element | React.ReactNode;
}

export function Sidebar({
	className,
	isCollapsed,
	title,
	logo,
	nav,
	account,
}: SidebarProps) {
	return (
		<aside
			className={cn(
				`fixed left-0 right-0 top-0 border-r z-50 w-full flex flex-col transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? "md:w-14" : "md:w-64"}`,
				className,
			)}
		>
			<div className="flex gap-2 h-[52px] items-center justify-between px-4">
				{!isCollapsed && (
					<div className="flex items-center gap-2">
						{logo && <div>{logo}</div>}
						<div className="flex-1 truncate font-semibold">{title}</div>
					</div>
				)}
			</div>

			<div className="flex-1 overflow-y-auto p-2">{nav}</div>

			<div className="p-2">{account}</div>
		</aside>
	);
}
