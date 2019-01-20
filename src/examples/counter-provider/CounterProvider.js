import React from "react";
import { useGovernor } from "../../";
import { counter_actions } from "../counter/CounterActions";

const CounterContext = React.createContext();

const initialState = {
  count: 0
};

export default function CounterProvider(props) {
  const [state, actions] = useGovernor(initialState, counter_actions);

  return (
    <CounterContext.Provider value={[state, actions]}>
      {props.children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  return React.useContext(CounterContext);
}
