import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import Counter from "../../examples/render-counting/Counter";

it("re-renders the correct number of times", () => {
  const el = document.createElement("div");

  act(() => {
    ReactDOM.render(<Counter />, el);
    // Initial render
    expect(el.querySelector('.count').innerHTML).toBe("0");
  });

  expect(el.querySelector('.count').innerHTML).toBe("4");
  expect(el.querySelector('.num-renders').innerHTML).toBe("3");
});
