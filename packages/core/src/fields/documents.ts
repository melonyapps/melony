import { DocumentFieldProps } from "../config";

export function documents(params: DocumentFieldProps): DocumentFieldProps {
  return {
    type: "DOCUMENTS",
    ...params,
  };
}
