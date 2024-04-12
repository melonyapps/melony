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

export const metadata = {
  title: "Melony",
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
        </Stack>

        <PageContent />
      </Stack>
    </Container>
  );
}
