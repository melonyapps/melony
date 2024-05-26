import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "..";

export function useDelete({
	modelName,
	onSuccess,
}: {
	modelName: string;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();

	const { deleteAction } = useApp();

	return useMutation({
		mutationKey: ["delete"],
		mutationFn: (where: any) => deleteAction({ modelName: modelName, where }),
		onSuccess: () => {
			onSuccess();
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [modelName] });
		},
	});
}
