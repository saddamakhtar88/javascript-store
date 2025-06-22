import { isFunction } from "./type-guards";
import { Action } from "./types";
import { createNotifier, deepFreeze, validateState } from "./utils";
import { Subscription } from "./types";

export function createStore<T extends object>(initialState: T) {
  validateState(initialState);

  let state: T = initialState;
  const notifier = createNotifier<T>();

  const getState = () => state;
  const setState = (newState: T) => {
    validateState(newState);
    state = deepFreeze(newState);
    notifier.notify(state);
  };

  const setPartialState = (partialState: Partial<T>) => {
    validateState(partialState);
    state = deepFreeze({ ...state, ...partialState });
    notifier.notify(state);
  };

  const dispatch = (action: Action<T>) => {
    if (!isFunction(action)) {
      throw new Error("Action must be a function");
    }
    const _state = action(state);
    setState(_state);
  };

  const subscribe = (subscription: Subscription<T, unknown>) => {
    if (!isFunction(subscription.listener)) {
      throw new Error("Listener must be a function");
    }

    if (subscription.selector && !isFunction(subscription.selector)) {
      throw new Error("Selector must be a function");
    }

    return notifier.subscribe(subscription);
  };

  return {
    getState,
    setState,
    setPartialState,

    dispatch,
    subscribe,
  };
}
