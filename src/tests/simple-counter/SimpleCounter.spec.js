import React from "react";
import ReactDOM from "react-dom";
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

it("can increment", async () => {
  const counter = TestRenderer.create(<SimpleCounter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "inc" });

  expect(val.props.value).toBe(0);

  await button.props.onClick();

  expect(val.props.value).toBe(1);

  await button.props.onClick();

  expect(val.props.value).toBe(2);
});

it("can decrement", async () => {
  const counter = TestRenderer.create(<SimpleCounter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "dec" });

  expect(val.props.value).toBe(0);

  await button.props.onClick();

  expect(val.props.value).toBe(-1);

  await button.props.onClick();

  expect(val.props.value).toBe(-2);
});

it("can add5", async () => {
  const counter = TestRenderer.create(<SimpleCounter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "add5" });

  expect(val.props.value).toBe(0);

  await button.props.onClick();

  expect(val.props.value).toBe(5);

  await button.props.onClick();

  expect(val.props.value).toBe(10);
});

it("can sub2", async () => {
  const counter = TestRenderer.create(<SimpleCounter />);
  const val = counter.root.findByProps({ className: "val" });
  const button = counter.root.findByProps({ className: "sub2" });

  expect(val.props.value).toBe(0);

  await button.props.onClick();

  expect(val.props.value).toBe(-2);

  await button.props.onClick();

  expect(val.props.value).toBe(-4);
});
