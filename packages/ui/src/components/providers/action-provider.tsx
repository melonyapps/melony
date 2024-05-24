"use client";

import { Action, LoginActionPayload } from "@melony/types";
import { createContext, useContext } from "react";

type DefaultActions = {
	listAction: ({ modelName }: GetDocsProps) => Promise<any>;
	loginAction: (payload: LoginActionPayload) => Promise<any>;
	logoutAction: () => Promise<any>;
	getUserAction: () => Promise<any>;
};

type GetDocsProps = {
	modelName: string;
};

type ActionProviderProps = {
	children: React.ReactNode;
	actions?: Record<string, Action[]>;
} & DefaultActions;

const ActionContext = createContext<
	{
		getModelActions: (modelName: string) => void;
	} & DefaultActions
>({
	getModelActions: () => {},
	listAction: () => Promise.resolve(),
	loginAction: () => Promise.resolve(),
	logoutAction: () => Promise.resolve(),
	getUserAction: () => Promise.resolve(),
});

export function ActionProvider({
	children,
	actions,
	...rest
}: ActionProviderProps) {
	const getModelActions = (modelName: string) => {
		return actions ? actions[modelName] : [];
	};

	const value = { getModelActions, ...rest };

	return (
		<ActionContext.Provider value={value}>{children}</ActionContext.Provider>
	);
}

export const useAction = () => {
	const context = useContext(ActionContext);

	if (context === undefined)
		throw new Error("useAction must be used within a ActionProvider");

	return context;
};
