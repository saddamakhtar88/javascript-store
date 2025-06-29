import { Action } from "../../types";
import { Effect } from "./effect";
import { EffectOptions } from "./effect-options";

export type FilteredEffect<T, A> = {
  effect: Effect<T, A>;
  options?: EffectOptions<A>;
};
