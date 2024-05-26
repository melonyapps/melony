"use client";

import {
	Action,
	CreateActionPayload,
	DeleteActionPayload,
	ListActionPayload,
	LoginActionPayload,
	Model,
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

type AppProviderProps = {
	children: React.ReactNode;
	actions?: Record<string, Action[]>;
	models?: Model[];
} & DefaultActions;

const AppContext = createContext<
	{
		models?: Model[];
		actions?: Record<string, Action[]>;
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

export function AppProvider({
	children,
	actions,
	models,
	...rest
}: AppProviderProps) {
	const getModelActions = (modelName: string) => {
		return actions ? actions[modelName] : [];
	};

	const value = { getModelActions, actions, models, ...rest };

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
	const context = useContext(AppContext);

	if (context === undefined)
		throw new Error("useApp must be used within a AppProvider");

	return context;
};
