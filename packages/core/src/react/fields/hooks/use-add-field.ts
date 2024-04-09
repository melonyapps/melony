import { useMutation, useQueryClient } from "react-query";
import { useProject } from "../..";
import { useData } from "../../collections/hooks/use-data";

export const useAddField = (collectionSlug: string) => {
  const queryClient = useQueryClient();
  const { addField } = useData();

  const { projectId } = useProject();

  return useMutation(
    ["addField"],
    (data: any) => addField(collectionSlug, { ...data, projectId }),
    {
      onSettled: () => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["getCollection", collectionSlug],
          }),
        ]);
      },
    }
  );
};
