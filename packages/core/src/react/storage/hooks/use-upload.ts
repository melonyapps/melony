import { useMutation } from "react-query";
import { useProject } from "../../projects";
import { useData } from "../../collections/hooks/use-data";

export const useUpload = () => {
  const { upload } = useData();
  const { projectId } = useProject();

  return useMutation(
    ["upload", projectId],
    (data: FormData) => {
      data.append("projectId", projectId); // this is for folder name in bucker like {projectId}/{file}

      return upload(data, projectId);
    },
    {
      onSettled: () => {},
    }
  );
};
