"use client";

import {
	Action,
	CreateActionPayload,
	DeleteActionPayload,
	ListActionPayload,
	LoginActionPayload,
	UpdateActionPayload,
} from "@melony/types";
import { createContext, useContext } from "react";

type DefaultActions = {
	listAction: ({ modelName }: ListActionPayload) => Promise<any>;
	createAction: ({ modelName, data }: CreateActionPayload) => Promise<any>;
	updateAction: ({ modelName, data }: UpdateActionPayload) => Promise<any>;
	deleteAction: ({ modelName, where }: DeleteActionPayload) => Promise<any>;

	loginAction: (payload: LoginActionPayload) => Promise<any>;
	logoutAction: () => Promise<any>;
	getUserAction: () => Promise<any>;
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
	createAction: () => Promise.resolve(),
	updateAction: () => Promise.resolve(),
	deleteAction: () => Promise.resolve(),

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
