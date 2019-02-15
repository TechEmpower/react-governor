import React from "react";
import { useGovernor } from "../../";
import { initialState, contract } from "../counter/CounterContract";

const CounterContext = React.createContext();

export default function CounterProvider(props) {
  const [state, actions] = useGovernor(initialState, contract);

  return (
    <CounterContext.Provider value={[state, actions]}>
      {props.children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  return React.useContext(CounterContext);
}
