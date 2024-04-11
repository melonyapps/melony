import { Container, Heading, Stack, Table } from "@melony/views";

export const metadata = {
  title: "Next Melony",
};

export default async function ProductionPage() {
  return (
    <Container>
      <Stack>
        <Heading>წარმოება</Heading>
        <Table />
      </Stack>
    </Container>
  );
}
