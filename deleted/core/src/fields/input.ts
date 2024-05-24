import { InputFieldProps } from "../config";

export function input(params: InputFieldProps): InputFieldProps {
  return {
    ...params,
    type: params?.type || "TEXT",
  };
}
