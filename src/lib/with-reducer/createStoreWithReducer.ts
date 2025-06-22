import { createStore } from "../core/createStore";
import { Action, Reducer } from "./types";

export function createStoreWithReducer<T extends object>(options: {
  initialState: T;
  reducer: Reducer<T>;
}) {
  const { initialState, reducer } = options;

  const store = createStore<T>(initialState);

  const dispatch = (action: Action) => {
    const currentState = store.getState();
    const newState = reducer(action, currentState);
    store.setState(newState);
  };

  return {
    getState: store.getState,
    dispatch,
    subscribe: store.subscribe,
  };
}
