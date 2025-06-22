import { Action } from "./action";

export type Reducer<T, P = unknown> = (action: Action<P>, state: T) => T;
