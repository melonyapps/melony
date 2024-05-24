import { Container } from "./container";
import { PageContent } from "./page-content";
import { Header } from "./header";

export function Page({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<Container>
			<Header title={title} />
			<PageContent>
				<>{children}</>
			</PageContent>
		</Container>
	);
}
