import { createNotifier, freeze, validateState } from "./utils";

export function createStore<T extends object>(initialState: T) {
  validateState(initialState);

  let state: T = initialState;
  const notifier = createNotifier<T>();

  const getState = () => state;
  const setState = (newState: T) => {
    validateState(newState);
    state = freeze(newState);
    notifier.notify(state);
  };

  const setPartialState = (partialState: Partial<T>) => {
    validateState(partialState);
    state = freeze({ ...state, ...partialState });
    notifier.notify(state);
  };

  return {
    getState,
    setState,
    setPartialState,
    subscribe: notifier.subscribe,
  };
}
