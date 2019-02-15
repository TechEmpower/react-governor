import React from "react";
import { useGovernor } from "../..";

const contract = {
  increment() {
    return this.state + 1;
  },
  decrement() {
    return this.state - 1;
  },
  add(num) {
    return this.state + num;
  },
  subtract(num) {
    return this.state - num;
  }
};

export default function Counter() {
  const [count, actions] = useGovernor(0, contract);

  return (
    <div>
      <input className="val" value={count} readOnly />
      <button className="inc" onClick={() => actions.increment()} />
      <button className="dec" onClick={() => actions.decrement()} />
      <button className="add5" onClick={() => actions.add(5)} />
      <button className="sub2" onClick={() => actions.subtract(2)} />
    </div>
  );
}
