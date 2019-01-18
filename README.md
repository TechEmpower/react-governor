# React Governor

_That typical "HOOKS ARE STILL ALPHA" warning_

Create a governor hook to manage state with actions for, and created by, the people.

## What is a "Governor Hook"?

A governor hook is like any other hook to manage state. You get a governor hook from `createGovernor`

## What is `createGovernor`?

`createGovernor` is a function which creates a governor hook. It takes an intitial
state and an actions object, and returns a governor hook which can be used in
any functional component, just like `useReducer`, but unlike `useReducer` there
is no need for the developer to build the boilerplate of `actions`, `dispatch`,
and `reducer`.

### Let's See it in Action

```JavaScript
const initialState = { count: 1 };

const actions = {
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

const useCountGovernor = createGovernor(initialState, actions);

export default function Counter() {
  const [state, actions] = useCountGovernor();

  return (
    <div>
      <span>Current Count: {state.count}</span>
      <button onClick={() => actions.increment()}>Increment</button>
      <button onClick={() => actions.add(5)}>Add 5</button>
    </div>
  );
}
```

[Test that this works](https://codesandbox.io/s/ry34v8xyq)

This should feel very similar to how `useReducer` works with actions and
reducers. However, the `actions` provided to `createGovernor` and returned from
`useCountGovernor` are different.

`createGovernor` expects a collection of actions. These actions are functions
which take in any number of arguments and the current state. These actions are
responsible for returning an object that describes what in the state should be
mutated.

As from our example, the `increment` action returns an object describing that
the state should be mutated such that `count` is `state.count + 1`. Similarly,
the `add` action returns an object describing that the state should be mutated
such that `count` is `state.count + val`, and notice that when we called `add`
that we passed it a value to add.
