export type Action<T extends string = string, P = undefined> = [P] extends [
  undefined
]
  ? { type: T }
  : {
      type: T;
      payload: P;
    };
