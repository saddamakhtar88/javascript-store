import { isFunction } from "./type-guards";
import { Action } from "./types";
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

  const dispatch = (action: Action<T>) => {
    if (!isFunction(action)) {
      throw new Error("Action must be a function");
    }
    const _state = action(state);
    setState(_state);
  };

  return {
    getState,
    setState,
    setPartialState,

    dispatch,
    subscribe: notifier.subscribe,
  };
}
