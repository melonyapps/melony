import { useQuery } from "@tanstack/react-query";
import { useAction } from "..";

export function useList({ modelName }: { modelName: string }) {
	const { listAction } = useAction();

	return useQuery({
		queryKey: [modelName],
		queryFn: () => listAction({ modelName: modelName }),
	});
}
