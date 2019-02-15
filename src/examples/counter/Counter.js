import React from "react";
import { useGovernor } from "../..";
import { initialState, contract } from "./CounterContract";

export default function Counter() {
  const [state, actions] = useGovernor(initialState, contract);

  return (
    <div>
      <input className="val" value={state.count} readOnly />
      <button className="inc" onClick={() => actions.increment()} />
      <button className="dec" onClick={() => actions.decrement()} />
      <button className="add5" onClick={() => actions.add(5)} />
      <button className="set" onClick={() => actions.set(137)} />
      <button className="addSum" onClick={() => actions.addSum(3, 4)} />

      <input className="newState" value={state.newState} readOnly />
      <button
        className="addNewState"
        onClick={() => actions.addNewState("Hello")}
      />
      <button className="asyncFunc" onClick={actions.asyncFunc} />
      <input className="googleStatus" value={state.status} />
      <button className="fetchGoogle" onClick={actions.fetchGoogle} />
    </div>
  );
}
