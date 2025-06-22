# Custom State Management Library

A lightweight, vanilla TypeScript state management solution with:

- ✅ Immutable state
- ✅ Subscription system with selectors
- ✅ Core and reducer-based APIs
- ✅ Clean separation of concerns

---

## 🚀 Features

- 🔹 **Minimal API surface**
- 🔹 **Immutable state updates** using `freeze`
- 🔹 **Subscription with selector support**
- 🔹 **Reducer-based store** for predictable action handling
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

// Get current state
console.log(store.getState()); // { count: 0, name: 'Counter' }

// Update entire state
store.setState({ count: 5, name: "Updated" });

// Update part of the state
store.setPartialState({ count: 10 });

// Subscribe to state changes
const unsubscribe = store.subscribe({
  selector: (state) => state.count,
  listener: (count) => {
    console.log("Count changed:", count);
  },
});

// Later, unsubscribe
unsubscribe();
```

---

## 🛠️ Reducer Store API

The **reducer store** adds a dispatch system similar to Redux.

### Example:

```ts
import { createStoreWithReducer } from "./reducer/createStoreWithReducer";
import { Action } from "./types";

// Action type
type CounterAction = Action<number>;

// Reducer function
const counterReducer = (action: CounterAction, state: { count: number }) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Create reducer-based store
const store = createStoreWithReducer({
  initialState: { count: 0 },
  reducer: counterReducer,
});

// Subscribe to a slice of the state
const unsubscribe = store.subscribe({
  selector: (state) => state.count,
  listener: (count) => console.log("Count updated:", count),
});

// Dispatch actions
store.dispatch({ type: "INCREMENT" }); // Count updated: 1
store.dispatch({ type: "INCREMENT" }); // Count updated: 2
store.dispatch({ type: "DECREMENT" }); // Count updated: 1

// Unsubscribe when done
unsubscribe();
```

---

## 🔍 API Overview

### Core Store

| Method                          | Description                                              |
| ------------------------------- | -------------------------------------------------------- |
| `getState()`                    | Returns the current state                                |
| `setState(newState)`            | Replaces the entire state                                |
| `setPartialState(partialState)` | Partially updates the state                              |
| `subscribe(subscription)`       | Subscribe to state changes, returns unsubscribe function |

---

### Reducer Store

| Method                    | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `getState()`              | Returns the current state                                |
| `dispatch(action)`        | Dispatches an action to the reducer                      |
| `subscribe(subscription)` | Subscribe to state changes, returns unsubscribe function |

---

## 🛡️ State Immutability

All state updates are deep-frozen to ensure **external immutability.**
Any direct mutations to the state object outside the store will throw an error.

---

## 💡 Key Design Principles

- **Separation of Concerns:** Core store handles state only, reducer store handles actions.
- **Composable:** Easy to build effects, middleware, or other extensions later.
- **Type Safety:** Full TypeScript support across all APIs.
- **Selector-Based Subscription:** Efficient updates for slices of the state.

---

## 🔮 Roadmap

- ***

## 👏 Contributions

If you'd like to contribute, feel free to submit an issue or a pull request.
This project is designed to be simple, scalable, and extensible.

---

## 📄 License

MIT License
