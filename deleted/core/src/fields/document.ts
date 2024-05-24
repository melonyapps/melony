import { DocumentFieldProps } from "../config";

export function document(params: DocumentFieldProps): DocumentFieldProps {
  return {
    type: "DOCUMENT",
    ...params,
  };
}
