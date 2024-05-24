import { InputFieldProps } from "../config";

export function password(params: InputFieldProps): InputFieldProps {
  return {
    ...params,
    type: "PASSWORD",
  };
}
