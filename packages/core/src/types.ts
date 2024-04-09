import { Config } from "./config";
import { CollectionParams } from "./react";

export type AuthProvider = {
  login: (props?: { onSuccess: (user: any) => void }) => Promise<any>;
  logout: (props?: { onSuccess: () => void }) => Promise<any>;
};

export type DataProvider = {
  // signIn: () => Promise<any>;

  // createMember: (data: any) => Promise<any>;
  // deleteMember: (id: string, params: any) => Promise<any>;
  // getMembers: (params: any) => Promise<any>;

  // getProject: (id: string) => Promise<any>;
  // getProjects: () => Promise<any>;

  // upload: (data: FormData, projectId: string) => Promise<any>;

  // createView: (data: any) => Promise<any>;
  // deleteView: (id: string, projectId: string) => Promise<any>;
  // getView: (id: string, projectId: string, params: any) => Promise<any>;
  // getViews: (params: { projectId: string }) => Promise<any>;
  // updateView: (id: string, data: any) => Promise<any>;

  // addField: (collectionSlug: string, data: any) => Promise<any>;
  // createCollection: (data: any) => Promise<any>;
  // deleteCollection: (slug: string, projectId: string) => Promise<any>;
  // getCollection: (slug: string, projectId: string) => Promise<any>;
  // getCollections: (params: { projectId: string }) => Promise<any>;
  // updateCollection: (id: string, data: any) => Promise<any>;

  init: () => Promise<any>;

  createDocument: (collectionSlug: string, data: any) => Promise<any>;
  deleteDocument: (
    collectionSlug: string,
    id: string,
    projectId: string
  ) => Promise<any>;
  getDocument: (
    projectId: string,
    collectionSlug: string,
    id: string,
    params?: any
  ) => Promise<any>;
  getDocuments: (
    projectId: string,
    collectionSlug: string,
    params?: any
  ) => Promise<any>;
  updateDocument: (
    collectionSlug: string,
    id: string,
    data: any
  ) => Promise<any>;
  getSuggestions: (projectId: string, params?: any) => Promise<any>;
};

export type ConfigProvideProps = {
  config: Config;
};

export type Adapter = {
  getSuggestions: ({
    collectionSlug,
  }: {
    collectionSlug: string;
  }) => Promise<{ docs: unknown[]; meta: { total: number } }>;
  getDocument: (params: {
    collectionSlug: string;
    docId: string;
  }) => Promise<{ data: unknown; meta: {} }>;
  getDocuments: (
    params: {
      collectionSlug: string;
    } & CollectionParams
  ) => Promise<{ docs: unknown[]; meta: { total: number } }>;
  createDocument: (params: {
    collectionSlug: string;
    data: any;
    auth: { user: { email: string } } | any;
  }) => Promise<any>;
  updateDocument: (params: {
    collectionSlug: string;
    docId: string;
    data: any;
  }) => Promise<any>;
  deleteDocument: (params: {
    collectionSlug: string;
    docId: string;
  }) => Promise<any>;
};
