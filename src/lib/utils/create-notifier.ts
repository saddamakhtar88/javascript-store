import { isFunction } from "../type-guards";
import { Subscription } from "../types";
import { deepEqual } from "./deep-equal";

export function createNotifier<T>() {
  let latestState: T;
  const subscriptions = new Set<Subscription<T, unknown>>();

  const subscribe = (subscription: Subscription<T, unknown>) => {
    subscriptions.add(subscription);
    return () => unsubscribe(subscription);
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
      } else {
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
