import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import TestRenderer from "react-test-renderer";

import SimpleCounter from "../../examples/simple-counter/SimpleCounter";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SimpleCounter />, div);
});

it("starts with initial state", () => {
  const counter = TestRenderer.create(<SimpleCounter />);
  const val = counter.root.findByProps({ className: "val" });

  expect(val.props.value).toBe(0);
});

it("can increment", () => {
  const counter = TestRenderer.create(<SimpleCounter />);
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
  const counter = TestRenderer.create(<SimpleCounter />);
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
  const counter = TestRenderer.create(<SimpleCounter />);
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

it("can sub2", () => {
  const counter = TestRenderer.create(<SimpleCounter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "sub2" });

  act(() => {
    expect(val.props.value).toBe(0);

    button.props.onClick();

    expect(val.props.value).toBe(-2);

    button.props.onClick();

    expect(val.props.value).toBe(-4);
  });
});
