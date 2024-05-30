import { useMutation } from "@tanstack/react-query";
import { useApp } from "../..";

export function useUpload() {
	const { uploadAction } = useApp();

	return useMutation({
		mutationKey: ["upload"],
		mutationFn: (formData: FormData) => uploadAction({ formData }),
		onSuccess: () => {},
		onSettled: () => {},
	});
}
