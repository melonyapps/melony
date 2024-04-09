import { useProject } from "../../projects";
import { useMutation, useQueryClient } from "react-query";
import { useData } from "../../collections/hooks/use-data";

export const useCreateView = () => {
  const { createView } = useData();
  const { projectId } = useProject();

  const queryClient = useQueryClient();

  return useMutation(
    ["createView"],
    (data: any) =>
      createView({
        ...data,
        projectId,
      }),
    {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["getViews"] });
      },
    }
  );
};
