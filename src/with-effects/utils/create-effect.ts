import { Action } from "../../types";
import { Effect, EffectOptions, FilteredEffect } from "../types";

export function createEffect<T, A>(
  effect: Effect<T, A>,
  options?: EffectOptions<A>
): FilteredEffect<T, A> {
  return {
    effect,
    options,
  };
}
