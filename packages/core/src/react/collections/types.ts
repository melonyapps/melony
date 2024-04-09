import { FieldProps } from "../fields";

export type Collection = {
  _id?: string;
  title?: string;
  icon?: any;
  slug: string;
  projectId?: string;
  created?: string;
  owner?: string;
  fields?: FieldProps[];
  foreignField?: FieldProps;
  isHidden?: boolean;
  relatedCollections?: {
    _id: string;
    title: string;
    fields?: FieldProps[];
    foreignField: any;
  }[];
};
