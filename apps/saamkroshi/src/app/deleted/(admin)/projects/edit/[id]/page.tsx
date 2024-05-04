import { Container, Heading, Stack } from "@melony/views";
import PageContent from "./content";

export const metadata = {
	title: "Melony",
};

export default async function ProjectEditPage() {
	return (
		<Container>
			<Stack>
				<Heading>პროექტის რედაქტირება</Heading>
				<PageContent />
			</Stack>
		</Container>
	);
}
