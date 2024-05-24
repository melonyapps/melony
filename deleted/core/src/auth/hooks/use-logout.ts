"use client";

import { useMutation } from "react-query";
import { useAuth } from "..";

export const useLogout = () => {
  const { logout } = useAuth();

  return useMutation(["logout"], () => logout());
};
