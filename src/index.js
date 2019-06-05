import { useMemo, useReducer } from "react";

class Governor {
  constructor(contract, dispatch) {
    this.dispatch = dispatch;
    this.actions = {};

    for (let actionKey in contract) {
      if (typeof contract[actionKey] !== "function") {
        throw new TypeError(
          `action is invalid: expected "function"; for "${typeof contract[
            actionKey
          ]}"`
        );
      }

      this.createAction(contract[actionKey], actionKey);
    }
  }

  /**
   * Takes an actionKey from the underlying contract and creates a corresponding
   * action.
   *
   * Example:
   * const contract = {
   *   foo(bar) {
   *     return () => ({
   *       ...this.state,
   *       bar
   *     });
   *   }
   * };
   *
   * This contract will be turned into an action that is analogous to:
   * {
   *   foo(bar, dispatch) {
   *     dispatch({ "newState": { ...this.state, bar } });
   *   }
   * }
   *
   * Async functions are similar, but do not dispatch until their underlying
   * promise has been fulfilled.
   *
   * Example:
   * const contract = {
   *   async foo(bar) {
   *     return () => ({
   *       ...this.state,
   *       bar
   *     });
   *   }
   * };
   *
   * This contract will be turned into an action that is analogous to:
   * {
   *   foo(bar, dispatch) {
   *     new Promise(resolve => ({ ...this.state, bar })).then(newState => {
   *       dispatch({ newState });
   *     });
   *   }
   * }
   *
   * @param {function} action
   * @param {string} actionKey
   */
  createAction(action, actionKey) {
    this.actions[actionKey] = (...args) => {
      const reducerOrPromise = action.apply(this, [...args]);

      // If we have a Promise we do not want to dispatch until it resolves.
      if (reducerOrPromise && reducerOrPromise.then) {
        reducerOrPromise.then(reducer => {
          this.dispatchFromActionReducer(reducer, actionKey);
        });
      } else {
        this.dispatchFromActionReducer(reducerOrPromise, actionKey);
      }
    };
  }

  dispatchFromActionReducer(reducer, actionKey) {
    let error;
    if (typeof reducer !== "function") {
      error = new TypeError(
        `action "${actionKey}" must return a reducer function; instead got "${typeof reducer}"`
      );
    } else {
      this.__state = reducer.apply(this);
    }
    this.dispatch({
      newState: this.state,
      error
    });
  }

  /**
   * In order to ensure all calls to `state` in actions are not stale, it
   * needs to be a callback, but it will only ever be read so we just use a
   * getter.
   */
  get state() {
    return this.__state;
  }
}

// We do not inline this reducer because it would cause 2 renders on first use.
function reducer(_state, action) {
  if (action.error) {
    throw action.error;
  }
  return action.newState;
}

/**
 * Governs state by creating actions given by a contract.
 *
 * @param initialState The initial state of the governor
 * @param contract The contract from which actions are created
 * @returns [state, actions] - the current state of the governor and the
 *          actions that can be invoked.
 */
function useGovernor(initialState, contract) {
  if (
    !contract ||
    (typeof contract !== "object" && typeof contract !== "function")
  ) {
    throw new TypeError(
      `contract is invalid: expected "object"; got "${typeof contract}"`,
      contract
    );
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const governor = useMemo(() => new Governor(contract, dispatch), [contract]);
  governor.__state = state;

  return [state, governor.actions];
}

export { useGovernor };
