import { useQuery } from "react-query";
import { IProject } from "../types";
import { useData } from "../../collections/hooks/use-data";

export const useGetProjects = () => {
  const { getProjects } = useData();

  return useQuery<IProject[]>(["getProjects"], getProjects);
};
