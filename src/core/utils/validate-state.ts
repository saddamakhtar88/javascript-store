import { isObject } from "../type-guards";

export function validateState(state: unknown) {
  if (!isObject(state)) {
    throw new Error("State must be a defined object");
  }
}
