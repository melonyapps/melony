import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "..";
import { Model } from "@melony/types";

export function useUpdate({
	model,
	onSuccess,
}: {
	model: Model;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();

	const { updateAction } = useApp();

	return useMutation({
		mutationKey: ["update"],
		mutationFn: (data: any) => updateAction({ model, data }),
		onSuccess: () => {
			onSuccess();
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [model.name] });
		},
	});
}
