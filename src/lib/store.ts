import { isFunction } from "./type-guards";
import { Action, Listener } from "./types";
import { deepFreeze } from "./utils/deep-freeze";
import { validateState } from "./utils/validate-state";

export function createStore<T extends object>(initialState: T) {
  validateState(initialState);

  let state: T = initialState;
  const listeners = new Set<Listener<T>>();

  const getState = () => state;
  const setState = (newState: T) => {
    validateState(newState);
    state = deepFreeze(newState);
    notify();
  };

  const setPartialState = (partialState: Partial<T>) => {
    validateState(partialState);
    state = deepFreeze({ ...state, ...partialState });
    notify();
  };

  const notify = () => {
    listeners.forEach((listener) => listener(state));
  };

  const dispatch = (action: Action<T>) => {
    if (!isFunction(action)) {
      throw new Error("Action must be a function");
    }
    const _state = action(state);
    setState(_state);
  };

  const subscribe = (listener: Listener<T>) => {
    if (!isFunction(listener)) {
      throw new Error("Listener must be a function");
    }
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return {
    getState,
    setState,
    setPartialState,

    dispatch,
    subscribe,
  };
}
