import {
  AdvancedFilter,
  Between,
  Container,
  Heading,
  SearchInput,
  Sort,
  Stack,
} from "@melony/views";
import PageContent from "./content";
import CreateButton from "./create-button";

export const metadata = {
  title: "Melony",
};

export default async function ProjectsPage() {
  return (
    <Container>
      <Stack>
        <Heading>პროექტები</Heading>

        <Stack horizontal gapSize="sm">
          <SearchInput />
          <AdvancedFilter />
          <Sort />
          <Between />
          <CreateButton />
        </Stack>

        <PageContent />
      </Stack>
    </Container>
  );
}
