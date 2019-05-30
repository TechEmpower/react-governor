import { useMemo, useReducer } from "react";

class HookActions {
  constructor(contract, dispatch) {
    this.__dispatch = dispatch;

    if (typeof contract === "function") {
      const _contract = new contract();
      contract = {};
      Object.getOwnPropertyNames(_contract.__proto__)
        .splice(1) // remove the constructor
        .forEach(key => (contract[key] = _contract[key]));
    }

    for (let key in contract) {
      contract[key] = contract[key].bind(this);
      this[key] = (...args) => {
        this.__dispatch({
          reduce: state => {
            const newState = contract[key](...args, state);
            if (typeof newState.then === "undefined") {
              return newState;
            }
            return state;
          }
        });
      };
    }
  }
}

function reducer(state, action) {
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
export function useGovernor(initialState = {}, contract = {}) {
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

  const hookActions = useMemo(() => new HookActions(contract, dispatch), [
    contract
  ]);

  return [state, hookActions];
}
