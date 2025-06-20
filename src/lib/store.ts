import { Listener } from "./utils/types";
import { Action } from "./utils/types";

export function createStore<T>(initialState: T) {
  let currentState: T = initialState;
  const listeners = new Set<Listener<T>>();

  return {
    getState() {
      return currentState;
    },

    setState(newState: T) {
      currentState = newState;
      listeners.forEach((listener) => listener(currentState));
    },

    setPartialState(newState: Partial<T>) {
      currentState = { ...currentState, ...newState };
      listeners.forEach((listener) => listener(currentState));
    },

    subscribe(listener: Listener<T>) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    dispatch(action: Action<T>) {
      const state = action(currentState);
      this.setState(state);
    },
  };
}
