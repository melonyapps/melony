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

export default async function ProductionPage() {
  return (
    <Container>
      <Stack>
        <Stack horizontal gapSize="sm">
          <Heading>წარმოება</Heading>
          <Between />
          <CreateButton />
        </Stack>

        <Stack horizontal gapSize="sm">
          <SearchInput />
          <AdvancedFilter />
          <Sort />
        </Stack>

        <PageContent />
      </Stack>
    </Container>
  );
}
