import { Action } from "../../types";
import { Effect, FilteredEffect } from "../types";

export function createEffect<T>(
  effect: Effect<T>,
  filter?: (action: Action) => boolean
): FilteredEffect<T> {
  return {
    effect,
    filter: filter ?? (() => true),
  };
}
