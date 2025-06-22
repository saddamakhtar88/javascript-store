export type Action<T = unknown> = {
  type: string;
  payload?: T;
};
