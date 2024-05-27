import { useQuery } from "@tanstack/react-query";
import { useApp } from "..";
import { Model } from "@melony/types";

export function useList({ model }: { model: Model }) {
	const { listAction } = useApp();

	return useQuery({
		queryKey: [model.name],
		queryFn: () => listAction({ model }),
	});
}
