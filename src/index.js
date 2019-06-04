import { useMemo, useReducer } from "react";

class HookActions {
  constructor(contract, dispatch) {
    this.dispatch = dispatch;
    this.actions = {};
    this.contract = contract;

    for (let actionKey in contract) {
      if (typeof this.contract[actionKey] !== "function") {
        throw new TypeError(
          `action is invalid: expected "function"; for "${typeof this.contract[
            actionKey
          ]}"`
        );
      }

      this.createAction(actionKey);
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
   *       ...state,
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
   * @param {function} actionKey
   */
  createAction(actionKey) {
    this.actions[actionKey] = (...args) => {
      const reducerOrPromise = this.contract[actionKey].apply(this, [...args]);
      let error;

      // If we have a Promise we do not want to dispatch until it resolves.
      if (reducerOrPromise && reducerOrPromise.then) {
        reducerOrPromise.then(reducer => {
          let error;
          if (typeof reducer !== "function") {
            error = new TypeError(
              `async action "${key}" must return a reducer function; instead got "${typeof reducer}"`
            );
          }
          this.__state = reducer.apply(this);
          this.dispatch({
            newState: this.state,
            error
          });
        });
      } else {
        if (typeof reducer !== "function") {
          error = new TypeError(
            `async action "${key}" must return a reducer function; instead got "${typeof reducer}"`
          );
        }
        this.__state = reducerOrPromise.apply(this);

        this.dispatch({
          newState: this.state,
          error
        });
      }
    };
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
function useGovernor(initialState = {}, contract = {}) {
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

  const hookActions = useMemo(() => new HookActions(contract, dispatch), [
    contract
  ]);
  hookActions.__state = state;

  return [state, hookActions.actions];
}

export { useGovernor };
