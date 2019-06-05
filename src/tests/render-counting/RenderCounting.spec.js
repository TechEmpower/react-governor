import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import Counter from "../../examples/render-counting/Counter";

it("re-renders the correct number of times", async () => {
  const el = document.createElement("div");

  await act(async () => {
    ReactDOM.render(<Counter />, el);
    // Initial render
    expect(el.querySelector(".count").innerHTML).toBe("0");

    await new Promise(resolve => setTimeout(resolve, 1000));
  });

  expect(el.querySelector(".count").innerHTML).toBe("28");
  expect(el.querySelector(".num-renders").innerHTML).toBe("4");
  expect(el.querySelector(".count-14").innerHTML).toBe("true");
});
