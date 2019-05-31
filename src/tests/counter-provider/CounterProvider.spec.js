import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import TestRenderer from "react-test-renderer";

import CounterProvider from "../../examples/counter-provider/CounterProvider";
import CounterChildOne from "../../examples/counter-provider/CounterChildOne";
import CounterChildTwo from "../../examples/counter-provider/CounterChildTwo";
import CounterParent from "../../examples/counter-provider/CounterParent";
import CounterGrandchild from "../../examples/counter-provider/CounterGrandchildOne";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CounterProvider />, div);
});

it("starts with initial state", () => {
  const counter = TestRenderer.create(
    <CounterProvider>
      <CounterChildOne />
      <CounterChildTwo />
    </CounterProvider>
  );
  const val = counter.root
    .findByType(CounterChildOne)
    .findByType("div")
    .findByProps({ className: "val" });

  const val2 = counter.root
    .findByType(CounterChildTwo)
    .findByType("div")
    .findByProps({ className: "val" });

  expect(val.props.value).toBe(0);
  expect(val2.props.value).toBe(0);
});

it("shares state among sibling context consumers", async () => {
  const counter = TestRenderer.create(
    <CounterProvider>
      <CounterChildOne />
      <CounterChildTwo />
    </CounterProvider>
  );
  const val = counter.root
    .findByType(CounterChildOne)
    .findByType("div")
    .findByProps({ className: "val" });
  const buttonOneInc = counter.root
    .findByType(CounterChildOne)
    .findByProps({ className: "inc" });

  const val2 = counter.root
    .findByType(CounterChildTwo)
    .findByType("div")
    .findByProps({ className: "val" });
  const buttonTwoDec = counter.root
    .findByType(CounterChildTwo)
    .findByProps({ className: "dec" });

  act(() => {
    expect(val.props.value).toBe(0);
    expect(val2.props.value).toBe(0);

    buttonOneInc.props.onClick();

    expect(val.props.value).toBe(1);
    expect(val2.props.value).toBe(1);

    buttonTwoDec.props.onClick();

    expect(val.props.value).toBe(0);
    expect(val2.props.value).toBe(0);
  });
});

it("shares state among sibling and children context consumers", async () => {
  const counter = TestRenderer.create(
    <CounterProvider>
      <CounterChildOne />
      <CounterChildTwo />
      <CounterParent>
        <CounterGrandchild />
      </CounterParent>
    </CounterProvider>
  );

  const val = counter.root
    .findByType(CounterChildOne)
    .findByType("div")
    .findByProps({ className: "val" });
  const buttonOneInc = counter.root
    .findByType(CounterChildOne)
    .findByProps({ className: "inc" });

  const val2 = counter.root
    .findByType(CounterChildTwo)
    .findByType("div")
    .findByProps({ className: "val" });
  const buttonTwoDec = counter.root
    .findByType(CounterChildTwo)
    .findByProps({ className: "dec" });

  const gval = counter.root
    .findByType(CounterGrandchild)
    .findByProps({ className: "val" });
  const gbutton = counter.root
    .findByType(CounterGrandchild)
    .findByProps({ className: "inc" });

  act(() => {
    expect(val.props.value).toBe(0);
    expect(val2.props.value).toBe(0);
    expect(gval.props.value).toBe(0);

    buttonOneInc.props.onClick();

    expect(val.props.value).toBe(1);
    expect(val2.props.value).toBe(1);
    expect(gval.props.value).toBe(1);

    buttonTwoDec.props.onClick();

    expect(val.props.value).toBe(0);
    expect(val2.props.value).toBe(0);
    expect(gval.props.value).toBe(0);

    gbutton.props.onClick();

    expect(val.props.value).toBe(1);
    expect(val2.props.value).toBe(1);
    expect(gval.props.value).toBe(1);
  });
});
