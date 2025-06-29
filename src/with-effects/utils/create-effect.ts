import { Action } from "../../types";
import { Effect, EffectOptions, FilteredEffect } from "../types";

export function createEffect<T>(
  effect: Effect<T>,
  filter?: (action: Action) => boolean,
  options?: EffectOptions
): FilteredEffect<T> {
  return {
    effect,
    filter: filter ?? (() => true),
    options,
  };
}
