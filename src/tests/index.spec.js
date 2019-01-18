import { createGovernor } from "..";

it("throws errors on invalid initialState", () => {
  expect(() => createGovernor(null)).toThrow("initialState is invalid");
  expect(() => createGovernor("break")).toThrow("initialState is invalid");
  expect(() => createGovernor(function() {})).toThrow(
    "initialState is invalid"
  );
  expect(() => createGovernor(1)).toThrow("initialState is invalid");
  expect(() => createGovernor(() => {})).toThrow("initialState is invalid");
});

it("throws errors on invalid actions", () => {
  expect(() => createGovernor({}, null)).toThrow("actions is invalid");
  expect(() => createGovernor({}, "break")).toThrow("actions is invalid");
  expect(() => createGovernor({}, function() {})).toThrow("actions is invalid");
  expect(() => createGovernor({}, 1)).toThrow("actions is invalid");
  expect(() => createGovernor({}, () => {})).toThrow("actions is invalid");
  expect(() => createGovernor({}, 1)).toThrow("actions is invalid");
});

it("allows valid inputs", () => {
  expect(() => createGovernor()).not.toThrow();
  expect(() => createGovernor({})).not.toThrow();
  expect(() => createGovernor({}, {})).not.toThrow();
});
