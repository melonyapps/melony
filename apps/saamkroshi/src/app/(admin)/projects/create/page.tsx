import { Container, Heading, Stack } from "@melony/views";
import PageContent from "./content";

export const metadata = {
  title: "Melony",
};

export default async function ProjectsCreatePage() {
  return (
    <Container>
      <Stack>
        <Heading>Create document</Heading>
        <PageContent />
      </Stack>
    </Container>
  );
}
