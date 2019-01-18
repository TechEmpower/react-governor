import { useMemo, useReducer } from "react";

export function createGovernor(initialState = {}, actions = {}) {
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

  function createHook() {
    return function() {
      const [state, dispatch] = useReducer((state, action) => {
        return { ...state, ...action.newState };
      }, initialState);

      function createHookActions(actions) {
        const ret = {};
        for (let key in actions) {
          ret[key] = async (...payload) => {
            const newState = await actions[key](...payload, state);
            dispatch({
              type: key,
              newState: newState
            });
          };
        }
        return ret;
      }

      const hookActions = useMemo(() => createHookActions(actions), [
        createHookActions
      ]);

      return [state, hookActions];
    };
  }

  return createHook();
}
