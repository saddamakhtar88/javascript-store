import { createStore } from "../core/createStore";
import { Action, Reducer } from "./types";

export function createStoreWithReducer<
  T extends object,
  A extends Action
>(options: { initialState: T; reducer: Reducer<T, A> }) {
  const { initialState, reducer } = options;

  const { setState, getState, subscribe } = createStore<T>(initialState);

  const dispatch = (action: A) => {
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
