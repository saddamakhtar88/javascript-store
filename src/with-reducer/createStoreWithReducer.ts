import { createStore } from "../core/createStore";
import { Action, Reducer } from "./types";

export function createStoreWithReducer<T extends object>(options: {
  initialState: T;
  reducer: Reducer<T>;
}) {
  const { initialState, reducer } = options;

  const { setState, getState, subscribe } = createStore<T>(initialState);

  const dispatch = (action: Action) => {
    const currentState = getState();
    const newState = reducer(action, currentState);
    setState(newState);
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
