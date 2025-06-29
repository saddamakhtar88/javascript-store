import { Action } from "./action";

export type Reducer<T, A extends Action> = (action: A, state: T) => T;
