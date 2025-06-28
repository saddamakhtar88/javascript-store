import { Action } from "../../with-reducer/types";

export type Effect<T> = (
  state: T,
  action: Action,
  dispatch: (action: Action) => void
) => void | Promise<void>;
