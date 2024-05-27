import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApp } from "..";
import { Model } from "@melony/types";

export function useDelete({
	model,
	onSuccess,
}: {
	model: Model;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();

	const { deleteAction } = useApp();

	return useMutation({
		mutationKey: ["delete"],
		mutationFn: (where: any) => deleteAction({ model, where }),
		onSuccess: () => {
			onSuccess();
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [model.name] });
		},
	});
}
