import { isPromise } from "util/types";
import { createStoreWithReducer } from "../with-reducer/createStoreWithReducer";
import { Action, Reducer } from "../with-reducer/types";
import { FilteredEffect } from "./types";
import { isFunction } from "../core/type-guards";

export function createStoreWithReducerAndEffects<
  T extends object,
  A extends Action
>(options: {
  initialState: T;
  reducer: Reducer<T, A>;
  effects: Array<FilteredEffect<T, A>>;
}) {
  const { getState, dispatch, subscribe } = createStoreWithReducer(options);
  const { effects } = options;
  const abortControllers = new Map<string, AbortController>();

  function _dispatch(action: A) {
    dispatch(action);
    const state = getState();
    for (const { effect, options } of effects) {
      if (isFunction(options?.filter) && options.filter(action)) {
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
