# Custom State Management Library

A lightweight, vanilla TypeScript state management solution with:

- ✅ Immutable state
- ✅ Subscription system with selectors
- ✅ Core and reducer-based APIs
- ✅ Built-in effects system with async support
- ✅ Support for effect cancellation using AbortController

---

## 🚀 Features

- 🔹 **Minimal API surface**
- 🔹 **Immutable state updates** using `freeze`
- 🔹 **Subscription with selector support**
- 🔹 **Reducer-based store** for predictable action handling
- 🔹 **Async effects system** with optional filtering and cancellation
- 🔹 **Fully TypeScript-typed**
- 🔹 Clean, composable architecture

---

## 📚 Installation

```bash
# Yet to be published :)
npm install <library-name>
```

---

## 🛠️ Core Store API

The **core store** is a simple state container with direct state setters.

### Example:

```ts
import { createStore } from "./core/createStore";

const store = createStore({
  count: 0,
  name: "Counter",
});

console.log(store.getState());
store.setState({ count: 5, name: "Updated" });
store.setPartialState({ count: 10 });

const unsubscribe = store.subscribe({
  selector: (state) => state.count,
  listener: (count) => {
    console.log("Count changed:", count);
  },
});

unsubscribe();
```

---

## 🛠️ Reducer Store API

The **reducer store** adds a dispatch system similar to Redux.

### Example:

```ts
import { createStoreWithReducer } from "./reducer/createStoreWithReducer";

const counterReducer = (action, state) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const store = createStoreWithReducer({
  initialState: { count: 0 },
  reducer: counterReducer,
});

store.subscribe({
  selector: (state) => state.count,
  listener: (count) => console.log("Count updated:", count),
});

store.dispatch({ type: "INCREMENT" });
```

---

## 🔀 Effects API

Use `createStoreWithReducerAndEffects()` for async workflows with cancellation support.

### Example with Async Effect:

```ts
import {
  createStoreWithReducerAndEffects,
  createEffect,
} from "javascript-store";

const store = createStoreWithReducerAndEffects({
  initialState: { loading: false, data: null },
  reducer: (action, state) => {
    switch (action.type) {
      case "LOAD_DATA":
        return { ...state, loading: true };
      case "SET_DATA":
        return { ...state, loading: false, data: action.payload };
      default:
        return state;
    }
  },
  effects: [
    createEffect(
      async (state, action, dispatch, { signal }) => {
        const res = await fetch("/api/data", { signal });
        const data = await res.json();
        dispatch({ type: "SET_DATA", payload: data });
      },
      (action) => action.type === "LOAD_DATA",
      { cancelPrevious: true }
    ),
  ],
});

store.dispatch({ type: "LOAD_DATA" });
```

---

## 🔍 API Overview

### Core Store

| Method                          | Description                 |
| ------------------------------- | --------------------------- |
| `getState()`                    | Returns the current state   |
| `setState(newState)`            | Replaces the entire state   |
| `setPartialState(partialState)` | Partially updates the state |
| `subscribe(subscription)`       | Subscribes to state changes |

### Reducer Store

| Method                    | Description                         |
| ------------------------- | ----------------------------------- |
| `dispatch(action)`        | Dispatches an action to the reducer |
| `getState()`              | Returns the current state           |
| `subscribe(subscription)` | Subscribes to state changes         |

### With Effects

| Method                    | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `createEffect()`          | Wraps an effect with optional filter and options |
| `dispatch(action)`        | Dispatches an action and runs applicable effects |
| `subscribe(subscription)` | Subscribes to state changes                      |

---

## 🛡️ State Immutability

All state updates are deep-frozen to ensure **external immutability**. Direct mutations outside the store will throw errors.

---

## 💡 Key Design Principles

- **Separation of Concerns** between state, reducer, and effects
- **Composable** and minimal core
- **Typed APIs** throughout the store
- **Selector-driven Subscriptions**
- **Optional and cancellable side-effects** via `AbortController`

---

## 🔮 Roadmap

- Effect middleware/composition
- Built-in devtools integration
- Effect status tracking

---

## 👏 Contributions

Feel free to open issues, request features, or submit pull requests.

---

## 📄 License

MIT License
