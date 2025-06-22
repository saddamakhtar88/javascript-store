import { isFunction } from "../type-guards";
import { Listener, Subscription } from "../types";
import { deepEqual } from "./deep-equal";

export function createNotifier<T>() {
  let latestState: T;
  const subscriptions = new Set<Subscription<T, unknown>>();

  const subscribe = (
    subscription: Subscription<T, unknown> | Listener<unknown>
  ) => {
    let _subscription = subscription as Subscription<T, unknown>;

    if (isFunction(subscription)) {
      _subscription = { listener: subscription };
    }

    if (!isFunction(_subscription.listener)) {
      throw new Error("Listener must be a function");
    }

    if (_subscription.selector && !isFunction(_subscription.selector)) {
      throw new Error("Selector must be a function");
    }

    subscriptions.add(_subscription);
    return () => unsubscribe(_subscription as Subscription<T, unknown>);
  };

  const unsubscribe = (subscription: Subscription<T, unknown>) => {
    subscriptions.delete(subscription);
  };

  const notify = (state: T) => {
    subscriptions.forEach((subscription) => {
      if (isFunction(subscription.selector)) {
        const lastvalue = latestState
          ? subscription.selector(latestState)
          : undefined;
        const value = subscription.selector(state);
        if (!deepEqual(lastvalue, value)) {
          subscription.listener(value);
        }
      } else if (state !== latestState) {
        subscription.listener(state);
      }
    });
    latestState = state;
  };

  return {
    subscribe,
    unsubscribe,
    notify,
  };
}
