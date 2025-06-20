export type Listener<T> = (state: T) => void;
export type Action<T> = (state: T) => T;
