import { InputFieldProps } from "../config";

export function currency(params: InputFieldProps): InputFieldProps {
  return {
    ...params,
    type: "CURRENCY",
  };
}
