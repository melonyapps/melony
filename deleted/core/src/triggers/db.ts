import { DbTrigger } from "../config";

export function db(config: DbTrigger): DbTrigger {
  return { ...config };
}
