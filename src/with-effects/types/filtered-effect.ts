import { Action } from "../../types";
import { Effect } from "./effect";
import { EffectOptions } from "./effect-options";

export type FilteredEffect<T> = {
  effect: Effect<T>;
  filter: (action: Action) => boolean;
  options?: EffectOptions;
};
