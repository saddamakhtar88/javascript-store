import { Action, Listener } from "./types";
import { deepFreeze } from "./utils/deep-freeze";
import { validateState } from "./utils/validate-state";

export function createStore<T extends object>(initialState: T) {
  validateState(initialState);

  let state: T = initialState;
  const listeners = new Set<Listener<T>>();

  return {
    getState() {
      return state;
    },

    setState(newState: T) {
      validateState(newState);
      state = deepFreeze(newState);
      listeners.forEach((listener) => listener(state));
    },

    setPartialState(partialState: Partial<T>) {
      validateState(partialState);
      state = deepFreeze({ ...state, ...partialState });
      listeners.forEach((listener) => listener(state));
    },

    subscribe(listener: Listener<T>) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    dispatch(action: Action<T>) {
      const _state = action(state);
      this.setState(_state);
    },
  };
}
