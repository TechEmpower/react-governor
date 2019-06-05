import React, { useEffect } from "react";
import { useGovernor } from "../..";
import { initialState, contract } from "./CounterContract";

let numRenders = 0;
let isCountEver14 = false;

export default function Counter() {
  const [state, actions] = useGovernor(initialState, contract);

  useEffect(() => {
    // this should all happen in the correct order, and in 1
    // render, leaving us with a count of 8
    actions.set(0);
    actions.add(5);
    actions.multiply(0);
    actions.add(2);
    actions.add(6);
  }, [actions]);

  useEffect(() => {
    if (state.count === 14) {
      isCountEver14 = true;
    }
  }, [state.count]);

  useEffect(() => {
    if (state.count === 8) {
      /**
       * Even though this async action returns immediately,
       * its reducer should only be applied once the rest of
       * the sync actions have completed. If this happened in
       * order, count would be 18. Instead, it should be 28.
       *
       * Because one of our actions is async, the component will
       * finish rendering before the async action's reducer is
       * applied. The component will render with the count of 14,
       * (8 / 2 + 10), and then finish the side effect, rendering
       * an additional time.
       */
      actions.asyncMultiply(2);
      actions.divide(2);
      actions.add(10);
    }
  }, [actions, state.count]);

  numRenders++;

  return (
    <>
      <div className="count">{state.count}</div>
      <div className="num-renders">{numRenders}</div>
      <div className="count-14">{isCountEver14.toString()}</div>
    </>
  );
}
