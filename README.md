# React Governor

[![NPM VERSION](https://img.shields.io/npm/v/@techempower/react-governor.svg)](https://www.npmjs.com/package/@techempower/react-governor)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
[![Open Issues](https://img.shields.io/github/issues-raw/techempower/react-governor.svg)](https://github.com/TechEmpower/react-governor/issues)
[![Build Status](https://travis-ci.org/TechEmpower/react-governor.svg?branch=master)](https://travis-ci.org/TechEmpower/react-governor)

Use a governor hook to manage state with actions for, and created by, the people.

Available as an [npm package](https://www.npmjs.com/package/@techempower/react-governor).

## What is `useGovernor`?

`useGovernor` is a hook which can be used in any functional component, just like
`useReducer`, but unlike `useReducer` there is no need for the developer to
build the boilerplate of `actions`, `dispatch`, and `reducer`.

### Let's See it in Action

```JavaScript
const initialState = { count: 1 };

const contract = {
  increment() {
    return state => ({
      count: state.count + 1
    });
  },
  add(val) {
    return state => ({
      count: state.count + val
    });
  }
}

export default function Counter() {

  const [state, actions] = useGovernor(initialState, contract);

  return (
    <div>
      <span>Current Count: {state.count}</span>
      <button onClick={() => actions.increment()}>Increment</button>
      <button onClick={() => actions.add(5)}>Add 5</button>
    </div>
  );
}
```

[Test that this works](https://codesandbox.io/s/focused-borg-4rrsh)

This should feel very similar to how `useReducer` works with actions and
reducers.

`useGovernor` expects a collection of actions to act as the `contract`.
These actions are functions which take in any number of arguments and the
current state. These actions are responsible for returning an object that
describes what in the state should be mutated.

As from our example, the `increment` action returns a reducer function describing that
the state should be mutated such that `count` is `this.state.count + 1`. Similarly,
the `add` action returns an object describing that the state should be mutated
such that `count` is `this.state.count + val`, and notice that when we called `add`
that we passed it a value to add.
