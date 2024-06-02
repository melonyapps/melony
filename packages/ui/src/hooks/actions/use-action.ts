import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Action, CustomActionPayload, Model } from "@melony/types";

export function useAction({ model, action }: { model: Model; action: Action }) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: [`action-${action.name}`],
		mutationFn: (props: CustomActionPayload) => action.handle(props),
		onSuccess: () => {},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [model.name] });
		},
	});
}
