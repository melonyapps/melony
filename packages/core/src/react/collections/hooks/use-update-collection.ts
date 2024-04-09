import { useMutation, useQueryClient } from "react-query";
import { useProject } from "../../projects/hooks/use-project";
import { useData } from "./use-data";

export const useUpdateCollection = (id: string) => {
  const { updateCollection } = useData();
  const queryClient = useQueryClient();

  const { projectId } = useProject();

  const res = useMutation(
    ["updateCollection", id],
    (data: any) => updateCollection(id, { ...data, projectId }),
    {
      onSettled: () => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["getCollections"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["getCollection", id],
          }),
        ]);
      },
    }
  );

  return res;
};
