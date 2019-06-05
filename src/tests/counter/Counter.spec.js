import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import TestRenderer from "react-test-renderer";

import Counter from "../../examples/counter/Counter";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Counter />, div);
});

it("starts with initial state", () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });

  expect(val.props.value).toBe(0);
});

it("can increment", () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "inc" });

  act(() => {
    expect(val.props.value).toBe(0);

    button.props.onClick();

    expect(val.props.value).toBe(1);

    button.props.onClick();

    expect(val.props.value).toBe(2);
  });
});

it("can decrement", () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "dec" });

  act(() => {
    expect(val.props.value).toBe(0);

    button.props.onClick();

    expect(val.props.value).toBe(-1);

    button.props.onClick();

    expect(val.props.value).toBe(-2);
  });
});

it("can add5", () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "add5" });

  act(() => {
    expect(val.props.value).toBe(0);

    button.props.onClick();

    expect(val.props.value).toBe(5);

    button.props.onClick();

    expect(val.props.value).toBe(10);
  });
});

it("can set", () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "set" });

  act(() => {
    expect(val.props.value).toBe(0);

    button.props.onClick();

    expect(val.props.value).toBe(137);

    button.props.onClick();

    expect(val.props.value).toBe(137);
  });
});

it("can addSum", () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "addSum" });

  act(() => {
    expect(val.props.value).toBe(0);

    button.props.onClick();

    expect(val.props.value).toBe(7);

    button.props.onClick();

    expect(val.props.value).toBe(14);
  });
});

it("can addNewState", () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const newState = counter.root.findByProps({ className: "newState" });
  const button = counter.root.findByProps({ className: "addNewState" });

  act(() => {
    expect(newState.props.value).toBe(undefined);

    button.props.onClick();

    expect(newState.props.value).toBe("Hello");
    expect(val.props.value).toBe(0);
  });
});

it("can removeState", () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const newState = counter.root.findByProps({ className: "newState" });
  const button = counter.root.findByProps({ className: "addNewState" });
  const removeButton = counter.root.findByProps({ className: "removeState" });

  act(() => {
    expect(newState.props.value).toBe(undefined);

    button.props.onClick();

    expect(newState.props.value).toBe("Hello");
    expect(val.props.value).toBe(0);

    removeButton.props.onClick();

    expect(val.props.value).toBe(undefined);
  });
});

it("properly reports action error", () => {
  const counter = TestRenderer.create(<Counter />);
  const button = counter.root.findByProps({
    className: "actionWithoutReducer"
  });

  act(() => {
    // ReactDOM will still output an error to the console; let's hide that for this test
    const tmp = console.error;
    console.error = function() {};
    expect(() => button.props.onClick()).toThrow(
      `action "actionWithoutReducer" must return a reducer function; instead got "object"`
    );
    console.error = tmp;
  });
});

it("can asyncFunc", async () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "asyncFunc" });

  await act(async () => {
    expect(val.props.value).toBe(0);

    await button.props.onClick();

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(val.props.value).toBe(256);
  });
});

it("can do compound async actions", async () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "compoundAsyncFunc" });

  await act(async () => {
    expect(val.props.value).toBe(0);

    await button.props.onClick();

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(val.props.value).toBe(257);
  });
});

it("can fetchGoogle", async () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "googleStatus" });
  const button = counter.root.findByProps({ className: "fetchGoogle" });

  await act(async () => {
    expect(val.props.value).toBe(undefined);

    await button.props.onClick();

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(val.props.value).toBe(200);
  });
});
