import { AppShell, Navigation, NavigationItem } from "@melony/ui";
import Link from "next/link";

type AdminLayoutProps = {
	children: React.ReactNode;
	resources: { title: string; path: string }[];
	activePath?: string;
};

export const AdminLayout = ({
	children,
	resources,
	activePath,
}: AdminLayoutProps) => {
	// useSession();

	return (
		<AppShell
			title="Melony"
			nav={
				<Navigation>
					{resources.map((resource) => {
						return (
							<NavigationItem
								key={resource.path}
								as={Link}
								title={resource.title}
								href={resource.path}
								active={
									resource.path === (activePath || "").replaceAll("/", "")
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
