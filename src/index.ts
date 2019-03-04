import { useMemo, useReducer } from "react";

interface DispatchFunc {
  (payload: Object): void;
}

class HookActions {
  __state: Object;
  readonly __dispatch: DispatchFunc;

  constructor(initialState: any, contract: Object, dispatch: DispatchFunc) {
    this.__state = initialState;
    this.__dispatch = dispatch;

    for (let key in contract!) {
      this[key] = async (...payload) => {
        const newState = await contract![key].apply({ state: this.__state }, [
          ...payload,
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
export function useGovernor(
  initialState: any,
  contract: Object
): Array<Object> {
  const [state, dispatch] = useReducer(
    (state, action) => action.newState,
    initialState
  );

  const hookActions = useMemo(
    () => new HookActions(initialState, contract!, dispatch),
    []
  );

  hookActions.__state = state;

  return [state, hookActions];
}
