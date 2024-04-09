import { useMutation, useQueryClient } from "react-query";
import { useProject } from "../../projects";
import { useData } from "../../collections/hooks/use-data";

export const useLazyDeleteMember = () => {
  const { deleteMember } = useData();
  const { projectId } = useProject();

  const queryClient = useQueryClient();

  const res = useMutation(
    ["deleteMember"],
    ({ id }: { id: string }) => deleteMember(id, { pId: projectId }),
    {
      onSettled: () => {
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["getMembers"],
          }),
        ]);
      },
    }
  );

  return res;
};
