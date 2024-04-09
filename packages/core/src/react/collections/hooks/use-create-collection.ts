import { useMutation, useQueryClient } from "react-query";
import { useData } from "./use-data";
import { useProject } from "../../projects/hooks/use-project";

export const useCreateCollection = () => {
  const { createCollection } = useData();
  const { projectId } = useProject();

  const queryClient = useQueryClient();

  return useMutation(
    ["createCollection"],
    (data: any) =>
      createCollection({
        ...data,
        projectId,
        fields: [{ key: "title", title: "Title", type: "TEXT" }],
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["getCollections"] });
      },
    }
  );
};
