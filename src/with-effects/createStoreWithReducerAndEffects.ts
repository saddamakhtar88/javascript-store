import { isPromise } from "util/types";
import { createStoreWithReducer } from "../with-reducer/createStoreWithReducer";
import { Action, Reducer } from "../with-reducer/types";
import { Effect, FilteredEffect } from "./types";

export function createStoreWithReducerAndEffects<T extends object>(options: {
  initialState: T;
  reducer: Reducer<T>;
  effects: Array<FilteredEffect<T>>;
}) {
  const { getState, dispatch, subscribe } = createStoreWithReducer(options);
  const { effects } = options;

  function _dispatch(action: Action) {
    dispatch(action);
    const state = getState();
    for (const { filter, effect } of effects) {
      if (filter(action)) {
        const result = effect(state, action, _dispatch);
        if (isPromise(result)) {
          result.catch(console.error);
        }
      }
    }
  }

  return {
    getState,
    dispatch: _dispatch,
    subscribe,
  };
}
