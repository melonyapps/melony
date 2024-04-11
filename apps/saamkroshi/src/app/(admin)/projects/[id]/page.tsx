import { Container, Heading, Stack } from "@melony/views";
import PageContent from "./content";

export const metadata = {
  title: "Next Melony",
};

export default async function ProjectsPage() {
  return (
    <Container>
      <Stack>
        <Heading>doc</Heading>

        <PageContent />
      </Stack>
    </Container>
  );
}
