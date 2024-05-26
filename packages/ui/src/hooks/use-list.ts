import { useQuery } from "@tanstack/react-query";
import { useApp } from "..";

export function useList({ modelName }: { modelName: string }) {
	const { listAction } = useApp();

	return useQuery({
		queryKey: [modelName],
		queryFn: () => listAction({ modelName: modelName }),
	});
}
