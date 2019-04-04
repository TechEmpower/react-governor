import { useMemo, useReducer } from "react";

class HookActions {
  constructor(contract, dispatch) {
    this.__dispatch = dispatch;

    for (let key in contract) {
      this[key] = async (...args) => {
        const newState = await contract[key].apply({ state: this.__state }, [
          ...args,
          this.__state
        ]);
        this.__dispatch({
          newState: newState
        });
      };
    }
  }
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
  if (!contract || typeof contract !== "object") {
    throw new TypeError(
      `contract is invalid: expected "object"; got "${typeof contract}"`,
      contract
    );
  }

  const [state, dispatch] = useReducer(
    (state, action) => action.newState,
    initialState
  );

  const hookActions = useMemo(() => new HookActions(contract, dispatch), []);
  hookActions.__state = state;

  return [state, hookActions];
}
