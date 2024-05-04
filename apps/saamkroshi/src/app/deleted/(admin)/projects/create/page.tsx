import { Container, Heading, Stack } from "@melony/views";
import PageContent from "./content";

export const metadata = {
	title: "Melony",
};

export default async function ProjectCreatePage() {
	return (
		<Container>
			<Stack>
				<Heading>ახალი პროექტის დამატება</Heading>
				<PageContent />
			</Stack>
		</Container>
	);
}
