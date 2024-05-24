import { View } from "../config";

export function cards(config: View): View {
  return {
    type: "CARDS",
    ...config,
  };
}
