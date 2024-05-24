"use client";

import { useContext } from "react";
import { CollectionContext } from "../collection-context";

export const useCollection = () => useContext(CollectionContext);
