import { Action } from "../../types";
import { Effect } from "./effect";

export type FilteredEffect<T> = {
  effect: Effect<T>;
  filter: (action: Action) => boolean;
};
