import { useMutation, useQueryClient } from "react-query";
import { useData } from "../../collections/hooks/use-data";

export const useCreateMember = () => {
  const queryClient = useQueryClient();
  const { createMember } = useData();

  return useMutation(["createMember"], createMember, {
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getMembers"] });
    },
  });
};
