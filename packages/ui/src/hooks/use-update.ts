import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAction } from "..";

export function useUpdate({
	modelName,
	onSuccess,
}: {
	modelName: string;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();

	const { updateAction } = useAction();

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
