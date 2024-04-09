import { useProject } from "../../projects/hooks/use-project";
import { useData } from "./use-data";
import { useInfiniteQuery } from "react-query";

export const useInfiniteDocs = (collectionSlug: string, params?: any) => {
  const { getDocuments } = useData();
  const { projectId } = useProject();

  return useInfiniteQuery({
    queryKey: ["getInfiniteDocuments", collectionSlug, params],
    queryFn: ({ pageParam }) =>
      getDocuments(projectId, collectionSlug, { ...params, page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      const lastPageCount = pages[pages.length - 1]?.docs
        ? pages[pages.length - 1]?.docs.length
        : 0;

      const hasNextPage = params?.perPage === lastPageCount;

      return hasNextPage ? pages.length : null;
    },
  });
};
