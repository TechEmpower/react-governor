import { useGovernor } from "..";

it("throws errors on invalid initialState", () => {
  expect(() => useGovernor(null)).toThrow("initialState is invalid");
  expect(() => useGovernor("break")).toThrow("initialState is invalid");
  expect(() => useGovernor(function() {})).toThrow("initialState is invalid");
  expect(() => useGovernor(1)).toThrow("initialState is invalid");
  expect(() => useGovernor(() => {})).toThrow("initialState is invalid");
});

it("throws errors on invalid actions", () => {
  expect(() => useGovernor({}, null)).toThrow("actions is invalid");
  expect(() => useGovernor({}, "break")).toThrow("actions is invalid");
  expect(() => useGovernor({}, function() {})).toThrow("actions is invalid");
  expect(() => useGovernor({}, 1)).toThrow("actions is invalid");
  expect(() => useGovernor({}, () => {})).toThrow("actions is invalid");
  expect(() => useGovernor({}, 1)).toThrow("actions is invalid");
});
