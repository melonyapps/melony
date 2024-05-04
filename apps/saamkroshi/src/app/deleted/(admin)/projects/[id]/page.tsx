import { Container, Stack } from "@melony/views";
import PageContent from "./content";

export const metadata = {
	title: "Melony",
};

export default async function ProjectsPage() {
	return (
		<Container>
			<Stack>
				<PageContent />
			</Stack>
		</Container>
	);
}
