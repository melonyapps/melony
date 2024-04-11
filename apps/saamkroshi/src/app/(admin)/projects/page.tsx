import {
  AdvancedFilter,
  Between,
  Container,
  CreateButton,
  Heading,
  SearchInput,
  Sort,
  Stack,
  Table,
} from "@melony/views";
import PageContent from "./content";

export const metadata = {
  title: "Next Melony",
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
