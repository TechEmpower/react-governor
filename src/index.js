import { useMemo, useReducer } from "react";

class HookActions {
  constructor(actions) {
    for (let key in actions) {
      this[key] = async (...payload) => {
        const newState = await actions[key].apply({ state: this.__state }, [
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

export function useGovernor(initialState = {}, actions = {}) {
  if (!actions || typeof actions !== "object") {
    throw new TypeError(
      `actions is invalid: expected "object"; got "${typeof actions}"`,
      actions
    );
  }

  const [state, dispatch] = useReducer((state, action) => {
    if (state && typeof state === "object") {
      return { ...state, ...action.newState };
    }
    return action.newState;
  }, initialState);

  const hookActions = useMemo(() => {
    const hookActions = new HookActions(actions);
    hookActions.__dispatch = dispatch;
    return hookActions;
  }, []);

  hookActions.__state = state;

  return [state, hookActions];
}
