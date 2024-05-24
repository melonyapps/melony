import { View } from "../config";

export function table(config: View): View {
  return {
    type: "TABLE",
    ...config,
  };
}
