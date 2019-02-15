import { useMemo, useReducer } from "react";

class HookActions {
  constructor(contract) {
    for (let key in contract) {
      this[key] = async (...payload) => {
        const newState = await contract[key].apply({ state: this.__state }, [
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

export function useGovernor(initialState = {}, contract = {}) {
  if (!contract || typeof contract !== "object") {
    throw new TypeError(
      `contract is invalid: expected "object"; got "${typeof contract}"`,
      contract
    );
  }

  const [state, dispatch] = useReducer((state, action) => {
    if (state && typeof state === "object") {
      return { ...state, ...action.newState };
    }
    return action.newState;
  }, initialState);

  const hookActions = useMemo(() => {
    const hookActions = new HookActions(contract);
    hookActions.__dispatch = dispatch;
    return hookActions;
  }, []);

  hookActions.__state = state;

  return [state, hookActions];
}
