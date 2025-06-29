# Custom State Management Library

A lightweight, vanilla TypeScript state management solution with:

- ✅ Immutable state
- ✅ Subscription system with selectors
- ✅ Core, reducer, and effects-based APIs
- ✅ Typed action creators
- ✅ Clean separation of concerns

---

## 🚀 Features

- 🔹 **Minimal API surface**
- 🔹 **Immutable state updates** using `freeze`
- 🔹 **Subscription with selector support**
- 🔹 **Reducer-based store** for predictable action handling
- 🔹 **Typed async effects system** with cancellation and filtering
- 🔹 **Typed action creators** with or without payloads
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
import { createStore } from "javascript-store";

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
import { createAction, createStoreWithReducer } from "javascript-store";

const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");

type CounterAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>;

const store = createStoreWithReducer<{ count: number }, CounterAction>({
  initialState: { count: 0 },
  reducer: (action, state) => {
    switch (action.type) {
      case "INCREMENT":
        return { ...state, count: state.count + 1 };
      case "DECREMENT":
        return { ...state, count: state.count - 1 };
      default:
        return state;
    }
  },
});

store.dispatch(increment());
store.dispatch(decrement());
```

---

## 🔀 Effects API

Use `createStoreWithReducerAndEffects()` for async workflows, cancellation, and filtering.

### Example with Async Effect:

```ts
import {
  createAction,
  createEffect,
  createStoreWithReducerAndEffects,
} from "javascript-store";

const loadData = createAction("LOAD_DATA");
const setData = createAction("SET_DATA");

type Actions = ReturnType<typeof loadData> | ReturnType<typeof setData>;

const store = createStoreWithReducerAndEffects<
  { loading: boolean; data: any },
  Actions
>({
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
      async (state, action, dispatch, ctx) => {
        const res = await fetch("/api/data", { signal: ctx.signal });
        const data = await res.json();
        dispatch(setData(data));
      },
      {
        filter: (action) => action.type === "LOAD_DATA",
        cancelPrevious: true,
      }
    ),
  ],
});

store.dispatch(loadData());
```

---

## 🔧 Utility APIs

### `createAction`

Typed action creator:

```ts
const simple = createAction("SIMPLE");
simple(); // { type: "SIMPLE" }

const withPayload = createAction("WITH_PAYLOAD")<number>;
withPayload(42); // { type: "WITH_PAYLOAD", payload: 42 }
```

### `createEffect`

Typed effect with options:

```ts
const myEffect = createEffect(
  (state, action, dispatch, ctx) => {
    // logic
  },
  {
    filter: (action) => action.type === "MY_ACTION",
    cancelPrevious: true,
    id: "unique-effect-id",
  }
);
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

| Method                    | Description                                     |
| ------------------------- | ----------------------------------------------- |
| `createEffect()`          | Wraps an effect with optional config and filter |
| `dispatch(action)`        | Dispatches an action and runs matching effects  |
| `subscribe(subscription)` | Subscribes to state changes                     |

---

## 🛡️ State Immutability

All state updates are deep-frozen to ensure **external immutability**. Direct mutations outside the store will throw errors.

---

## 💡 Key Design Principles

- **Separation of Concerns** between state, reducer, and effects
- **Composable** and minimal core
- **Typed APIs** throughout the store
- **Selector-driven Subscriptions**

---

## 🔮 Roadmap

- Devtools support
- Middleware support
- Persistence layer

---

## 👏 Contributions

Feel free to open issues, request features, or submit pull requests.

---

## 📄 License

MIT License
