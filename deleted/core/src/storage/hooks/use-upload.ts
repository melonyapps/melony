"use client";

import { useMutation } from "react-query";
import { useData } from "../../collections/hooks/use-data";

export const useUpload = () => {
  const { upload } = useData();

  return useMutation(
    ["upload"],
    (data: FormData) => {
      data.append("projectId", ""); // this is for folder name in bucker like {projectId}/{file}

      return upload(data, "");
    },
    {
      onSettled: () => {},
    }
  );
};
