import { isPromise } from "util/types";
import { createStoreWithReducer } from "../with-reducer/createStoreWithReducer";
import { Action, Reducer } from "../with-reducer/types";
import { FilteredEffect } from "./types";

export function createStoreWithReducerAndEffects<T extends object>(options: {
  initialState: T;
  reducer: Reducer<T>;
  effects: Array<FilteredEffect<T>>;
}) {
  const { getState, dispatch, subscribe } = createStoreWithReducer(options);
  const { effects } = options;
  const abortControllers = new Map<string, AbortController>();

  function _dispatch(action: Action) {
    dispatch(action);
    const state = getState();
    for (const { filter, effect, options } of effects) {
      if (filter(action)) {
        const effectKey = options?.id ?? action.type;
        const previous = abortControllers.get(effectKey);
        if (previous && options?.cancelPrevious) {
          previous.abort();
        }
        const abortController = new AbortController();
        const result = effect(state, action, _dispatch, {
          signal: abortController.signal,
        });

        abortControllers.set(effectKey, abortController);

        if (isPromise(result)) {
          result
            .catch((error: Error) => {
              if (error.name !== "AbortError") {
                console.error(error);
              }
            })
            .finally(() => abortControllers.delete(effectKey));
        } else {
          abortControllers.delete(effectKey);
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
