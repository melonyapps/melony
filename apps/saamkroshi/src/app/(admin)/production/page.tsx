import {
  AdvancedFilter,
  Between,
  Container,
  CreateButton,
  Heading,
  SearchInput,
  Sort,
  Stack,
} from "@melony/views";
import PageContent from "./content";

export const metadata = {
  title: "Next Melony",
};

export default async function ProductionPage() {
  return (
    <Container>
      <Stack>
        <Heading>წარმოება</Heading>

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
