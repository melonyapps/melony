"use client";

import * as React from "react";
import { DataProvider } from "../../types";

const defaultProvider: DataProvider = {
  // getCollection: () => Promise.resolve(),
  // getCollections: () => Promise.resolve(),
  // createCollection: () => Promise.resolve(),
  // updateCollection: () => Promise.resolve(),
  // deleteCollection: () => Promise.resolve(),
  createDocument: () => Promise.resolve(),
  getDocument: () => Promise.resolve(),
  getDocuments: () => Promise.resolve(),
  updateDocument: () => Promise.resolve(),
  deleteDocument: () => Promise.resolve(),
  getSuggestions: () => Promise.resolve(),
  init: () => Promise.resolve(),
};

export const DataContext = React.createContext<DataProvider>(defaultProvider);
