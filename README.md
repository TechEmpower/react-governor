# React Governor

_That typical "HOOKS ARE STILL ALPHA" warning_

Use a governor hook to manage state with actions for, and created by, the people.

## What is `useGovernor`?

`useGovernor` is a hook which can be used in any functional component, just like
`useReducer`, but unlike `useReducer` there is no need for the developer to
build the boilerplate of `actions`, `dispatch`, and `reducer`.

### Let's See it in Action

```JavaScript
const initialState = { count: 1 };

const count_actions = {
  increment(state) {
    return {
      count: state.count + 1
    };
  },
  add(val, state) {
    return {
      count: state.count + val
    }
  }
}

export default function Counter() {
  const [state, actions] = useGovernor(initialState, count_actions);

  return (
    <div>
      <span>Current Count: {state.count}</span>
      <button onClick={() => actions.increment()}>Increment</button>
      <button onClick={() => actions.add(5)}>Add 5</button>
    </div>
  );
}
```

[Test that this works](https://codesandbox.io/s/79477ow96)

This should feel very similar to how `useReducer` works with actions and
reducers.

`useGovernor` expects a collection of actions. These actions are functions
which take in any number of arguments and the current state. These actions are
responsible for returning an object that describes what in the state should be
mutated.

As from our example, the `increment` action returns an object describing that
the state should be mutated such that `count` is `state.count + 1`. Similarly,
the `add` action returns an object describing that the state should be mutated
such that `count` is `state.count + val`, and notice that when we called `add`
that we passed it a value to add.
