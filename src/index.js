import { useMemo, useReducer } from "react";

class HookActions {
  constructor(actions) {
    for (let key in actions) {
      this[key] = async (...payload) => {
        const newState = await actions[key](...payload, this.__state);
        this.__dispatch({
          newState: newState
        });
      };
    }
  }
}

export function useGovernor(initialState = {}, actions = {}) {
  if (!initialState || typeof initialState !== "object") {
    throw new TypeError(
      `initialState is invalid: expected "object"; got "${typeof initialState}"`,
      initialState
    );
  }
  if (!actions || typeof actions !== "object") {
    throw new TypeError(
      `actions is invalid: expected "object"; got "${typeof actions}"`,
      actions
    );
  }

  const [state, dispatch] = useReducer((state, action) => {
    return { ...state, ...action.newState };
  }, initialState);

  const hookActions = useMemo(() => {
    const hookActions = new HookActions(actions);
    hookActions.__dispatch = dispatch;
    return hookActions;
  }, []);

  hookActions.__state = state;

  return [state, hookActions];
}
