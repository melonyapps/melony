"use client";

import { useQuery } from "react-query";
import { useAuth } from "..";

export const useSession = () => {
	const { session } = useAuth();

	return useQuery(["session"], () => session());
};
