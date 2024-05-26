import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "..";

export function useUpdate({
	modelName,
	onSuccess,
}: {
	modelName: string;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();

	const { updateAction } = useApp();

	return useMutation({
		mutationKey: ["update"],
		mutationFn: (data: any) => updateAction({ modelName, data }),
		onSuccess: () => {
			onSuccess();
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [modelName] });
		},
	});
}
