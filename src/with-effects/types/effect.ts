import { Action } from "../../with-reducer/types";
import { EffectContext } from "./effect-context";

export type Effect<T, A> = (
  state: T,
  action: A,
  dispatch: (action: A) => void,
  context: EffectContext
) => void | Promise<void>;
