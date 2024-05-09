"use client";

import * as React from "react";
import { DataProviderProps } from "../types";

const defaultProvider: DataProviderProps = {
	createDocument: () => Promise.resolve(),
	getDocument: () => Promise.resolve(),
	getDocuments: () => Promise.resolve(),
	updateDocument: () => Promise.resolve(),
	deleteDocument: () => Promise.resolve(),
	getSuggestions: () => Promise.resolve(),
	upload: () => Promise.resolve(),
};

export const DataContext =
	React.createContext<DataProviderProps>(defaultProvider);
