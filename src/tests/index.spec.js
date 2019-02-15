import { useGovernor } from "..";

it("throws errors on invalid contract", () => {
  expect(() => useGovernor({}, null)).toThrow("contract is invalid");
  expect(() => useGovernor({}, "break")).toThrow("contract is invalid");
  expect(() => useGovernor({}, function() {})).toThrow("contract is invalid");
  expect(() => useGovernor({}, 1)).toThrow("contract is invalid");
  expect(() => useGovernor({}, () => {})).toThrow("contract is invalid");
  expect(() => useGovernor({}, 1)).toThrow("contract is invalid");
});
