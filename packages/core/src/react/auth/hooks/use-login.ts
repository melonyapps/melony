"use client";

import { useMutation } from "react-query";
import { useAuth } from "..";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation(["login"], (data: any) => login(data));
};
