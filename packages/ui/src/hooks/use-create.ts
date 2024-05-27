import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "..";
import { Model } from "@melony/types";

export function useCreate({
	model,
	onSuccess,
}: {
	model: Model;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();

	const { createAction } = useApp();

	return useMutation({
		mutationKey: ["create"],
		mutationFn: (data: any) => createAction({ model, data }),
		onSuccess: () => {
			onSuccess();
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [model.name] });
		},
	});
}
