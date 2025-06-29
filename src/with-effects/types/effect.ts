import { Action } from "../../with-reducer/types";
import { EffectContext } from "./effect-context";

export type Effect<T> = (
  state: T,
  action: Action,
  dispatch: (action: Action) => void,
  context: EffectContext
) => void | Promise<void>;
