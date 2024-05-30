import { useQuery } from "@tanstack/react-query";
import { useApp } from "..";
import { ListActionPayload } from "@melony/types";

export function useList({ model, filter }: ListActionPayload) {
	const { listAction } = useApp();

	return useQuery({
		queryKey: [model.name, filter],
		queryFn: () => listAction({ model, filter }),
	});
}
