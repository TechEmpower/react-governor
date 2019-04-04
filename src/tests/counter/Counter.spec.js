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
  const counter = TestRenderer.create(<Counter/>);
  const val = counter.root.findByProps({className: "val"});

  expect(val.props.value).toBe(0);
});

it("can increment", async () => {
  const counter = TestRenderer.create(<Counter/>);
  const val = counter.root.findByProps({className: "val"});
  const button = counter.root.findByProps({className: "inc"});

  await act(async () => {
    expect(val.props.value).toBe(0);

    await button.props.onClick();

    expect(val.props.value).toBe(1);

    await button.props.onClick();

    expect(val.props.value).toBe(2);
  });
});

it("can decrement", async () => {
  const counter = TestRenderer.create(<Counter/>);
  const val = counter.root.findByProps({className: "val"});
  const button = counter.root.findByProps({className: "dec"});

  await act(async () => {
    expect(val.props.value).toBe(0);

    await button.props.onClick();

    expect(val.props.value).toBe(-1);

    await button.props.onClick();

    expect(val.props.value).toBe(-2);
  });
});

it("can add5", async () => {
  const counter = TestRenderer.create(<Counter/>);
  const val = counter.root.findByProps({className: "val"});
  const button = counter.root.findByProps({className: "add5"});

  await act(async () => {
    expect(val.props.value).toBe(0);

    await button.props.onClick();

    expect(val.props.value).toBe(5);

    await button.props.onClick();

    expect(val.props.value).toBe(10);
  });
});

it("can set", async () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "set" });

  await act(async () => {
    expect(val.props.value).toBe(0);

    await button.props.onClick();

    expect(val.props.value).toBe(137);

    await button.props.onClick();

    expect(val.props.value).toBe(137);
  });
});

it("can addSum", async () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "addSum" });

  await act(async () => {
    expect(val.props.value).toBe(0);

    await button.props.onClick();

    expect(val.props.value).toBe(7);

    await button.props.onClick();

    expect(val.props.value).toBe(14);
  });
});

it("can addNewState", async () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const newState = counter.root.findByProps({ className: "newState" });
  const button = counter.root.findByProps({ className: "addNewState" });

  await act(async () => {
    expect(newState.props.value).toBe(undefined);

    await button.props.onClick();

    expect(newState.props.value).toBe("Hello");
    expect(val.props.value).toBe(0);
  });
});

it("can removeState", async () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const newState = counter.root.findByProps({ className: "newState" });
  const button = counter.root.findByProps({ className: "addNewState" });
  const removeButton = counter.root.findByProps({ className: "removeState" });

  await act(async() => {
    expect(newState.props.value).toBe(undefined);

    await button.props.onClick();

    expect(newState.props.value).toBe("Hello");
    expect(val.props.value).toBe(0);

    await removeButton.props.onClick();

    expect(val.props.value).toBe(undefined);
  });
});

it("can asyncFunc", async () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "asyncFunc" });

  await act(async () => {
    expect(val.props.value).toBe(0);

    await button.props.onClick();

    expect(val.props.value).toBe(256);
  });
});

it("can fetchGoogle", async () => {
  const counter = TestRenderer.create(<Counter />);
  const val = counter.root.findByProps({ className: "googleStatus" });
  const button = counter.root.findByProps({ className: "fetchGoogle" });

  await act(async () => {
    expect(val.props.value).toBe(undefined);

    await button.props.onClick();

    expect(val.props.value).toBe(200);
  });
});
