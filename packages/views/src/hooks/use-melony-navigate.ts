import { useRouter } from "next/navigation";

export const useMelonyNavigate = () => {
  const router = useRouter();

  return (path: string) => {
    return router.push(path);
  };
};
