import { Action } from "../types";

export function createAction<T extends string>(
  type: T
): () => Action<T, undefined>;
export function createAction<T extends string, P>(
  type: T
): (payload: P) => Action<T, P>;
export function createAction<T extends string, P>(
  type: T
): (payload?: P) => Action<T> | Action<T, P> {
  return (...args: [P?]) =>
    args.length === 0 ? { type } : { type, payload: args[0] };
}
