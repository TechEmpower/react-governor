import React from "react";
import { useCounter } from "./CounterProvider";

export default function CounterGrandchildOne() {
  const [state, actions] = useCounter();

  return (
    <div>
      <input className="val" value={state.count} readonly />
      <button className="inc" onClick={actions.increment} />
      <button className="dec" onClick={actions.decrement} />
    </div>
  );
}
