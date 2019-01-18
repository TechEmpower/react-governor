import React from "react";
import { useCountGovernor } from "../counter/Counter";

const CounterContext = React.createContext();

export default function CounterProvider(props) {
  const [state, actions] = useCountGovernor();

  return (
    <CounterContext.Provider value={[state, actions]}>
      {props.children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  return React.useContext(CounterContext);
}
