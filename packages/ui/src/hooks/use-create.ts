import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "..";

export function useCreate({
	modelName,
	onSuccess,
}: {
	modelName: string;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();

	const { createAction } = useApp();

	return useMutation({
		mutationKey: ["create"],
		mutationFn: (data: any) => createAction({ modelName: modelName, data }),
		onSuccess: () => {
			onSuccess();
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [modelName] });
		},
	});
}
