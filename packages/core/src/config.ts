import { Adapter } from "./types";

// config
export type NavigationItemProps = { to: string; title?: string; icon?: any };

type Ui = {
  title?: string;
  logo?: any;
  navigation?: Record<string, NavigationItemProps[]>;
};

export type InputFieldProps = {
  slug: string;
  label?: string;
  type?: string;
  isRequired?: boolean;
  symbol?: string;
};

export type DocumentFieldProps = {
  slug: string;
  label?: string;
  type?: string;
  validation?: any;
  collectionSlug: string;
  creatable?: string;
  isRequired?: boolean;
  defaultViewSlug?: string;
  foreignField?: string;
  colorField?: string;
};

export type Field = InputFieldProps | DocumentFieldProps;

export type Collection = {
  slug: string;
  schema: Field[];
  label?: string;
  views?: View[];
};

export type View = {
  slug: string;
  label?: string;
  type?: string;
  icon?: any;
};

export type DbTrigger = {
  slug: string;
  collectionSlug: string;
  label?: string;
  on?: string[];
  func: any;
};

export type Trigger = DbTrigger;

export type Config = {
  id: string;
  ui?: Ui;
  adapter: ({
    id,
    collections,
  }: {
    id: string;
    collections: Collection[];
  }) => Adapter & { auth: any };
  collections: Collection[];
  triggers: Trigger[];
};

export function config(config: Config) {
  return config;
}

export function collection(collection: Collection) {
  return collection;
}

export * as fields from "./fields";
export * as views from "./views";
export * as triggers from "./triggers";
