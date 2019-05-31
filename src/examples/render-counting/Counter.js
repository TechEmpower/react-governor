import React, { useEffect } from "react";
import { useGovernor } from "../..";
import { initialState, contract } from "./CounterContract";

let numRenders = 0;

export default function Counter() {
  const [state, actions] = useGovernor(initialState, contract);

  useEffect(() => {
    actions.set(0);
    actions.add(5);
    actions.multiply(0);
    actions.add(2);
    actions.add(6);
  }, []);

  useEffect(() => {
    if (state.count === 2) {
      actions.set(-1);
    }
  }, [state.count]);

  useEffect(() => {
    if (state.count === 8) {
      actions.divide(2);
    }
  }, [state.count]);

  numRenders++;

  console.log(JSON.stringify(state));
  return (
    <>
      <div className="count">{state.count}</div>
      <div className="num-renders">{numRenders}</div>
    </>
  );
}