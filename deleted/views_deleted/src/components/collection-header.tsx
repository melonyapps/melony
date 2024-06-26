import { useCollection } from "@melony/core";
import { Header } from "./header";
import { CreateButton } from "./create-button";

export function CollectionHeader({}: {}): JSX.Element {
	const { data } = useCollection();

	return <Header title={data?.label || ""} toolbar={<CreateButton />} />;
}
