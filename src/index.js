import { useMemo, useReducer } from "react";

/**
 * Helper function to take a contract and dispatch callback to transfrom
 * them into an object of actions which ultimately dispatch to an underlying
 * reducer.
 *
 * Example:
 * const contract = {
 *   foo(bar, state) {
 *     return {
 *       ...state,
 *       bar
 *     };
 *   }
 * };
 *
 * This contract will be turned into an action that is analogous to:
 * {
 *   foo(bar) {
 *     dispatch({ "reduce": state => contract.foo(bar, state) });
 *   }
 * }
 *
 *
 * Async contract functions are a little different since they return a promise.
 *
 * Example:
 * const contract = {
 *   async foo(bar, state) {
 *     return state => ({
 *       ...state,
 *       bar
 *     });
 *   }
 * };
 *
 * This contract will be turned into an action that is analgous to:
 * {
 *   foo(bar) {
 *     dispatch({ "reduce": state => state });
 *     contract.foo(bar, state).then(reducer => dispatch({
 *       "reduce": state => reducer(state)
 *     }));
 *   }
 * }
 *
 * @param contract The contract from which actions are created
 * @param dispatch The underlying useReducer's dispatch callback
 */
function createActions(contract, dispatch) {
  const hookActions = {};

  for (let key in contract) {
    hookActions[key] = (...args) => {
      dispatch({
        reduce: state => {
          const newState = contract[key](...args, state);

          if (typeof newState.then === "undefined") {
            // This was a non-async func; just return the new state
            return newState;
          }

          newState.then(reducer => {
            let error;
            if (typeof reducer !== "function") {
              error = new TypeError(
                `async action "${key}" must return a reducer function; instead got "${typeof reducer}"`
              );
            }
            // Once the promise is resolved, we need to dispatch a new
            // action based on the reducer function the async func
            // returns given the new state at the time of the resolution.
            dispatch({
              reduce: state => reducer(state),
              error
            });
          });

          // Async func cannot mutate state directly; return current state.
          return state;
        }
      });
    };
  }

  return hookActions;
}

// We do not inline this because it would cause 2 renders on first use.
function reducer(state, action) {
  if (action.error) {
    throw action.error;
  }
  return action.reduce(state);
}

/**
 * Governs state by creating actions given by a contract.
 *
 * @param initialState The initial state of the governor
 * @param contract The contract from which actions are created
 * @returns [state, actions] - the current state of the governor and the
 *          actions that can be invoked.
 */
function useGovernor(initialState = {}, contract = {}) {
  if (
    !contract ||
    (typeof contract !== "object" && typeof contract !== "function")
  ) {
    throw new TypeError(
      `contract is invalid: expected "object" or "class"; got "${typeof contract}"`,
      contract
    );
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => createActions(contract, dispatch), [contract]);

  return [state, actions];
}

export { useGovernor };
