import { useMemo, useReducer } from "react";

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

  const hookActions = {};
  for (let key in actions) {
    hookActions[key] = async (...payload) => {
      const newState = await actions[key](...payload, state);
      dispatch({
        type: key,
        newState: newState
      });
    };
  }

  return [state, hookActions];
}
