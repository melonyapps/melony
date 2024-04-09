export enum FilterOperator {
  Is = "is",
  Contains = "contains",
  DoesNotContain = "does not contain",
  IsAnyOf = "is any of",
  GeoWithinBox = "geo within box",
}

export type FilterItem = {
  field: string;
  operator: FilterOperator;
  value: any;
};
