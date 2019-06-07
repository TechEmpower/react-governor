import fetch from "cross-fetch";

export const initialState = {
  count: 0
};

export const contract = {
  increment() {
    return state => ({
      count: state.count + 1
    });
  },
  decrement() {
    return state => ({
      count: state.count - 1
    });
  },
  add(val) {
    return state => ({
      count: state.count + val
    });
  },
  set(val) {
    return () => ({
      count: val
    });
  },
  addSum(val, val2) {
    return state => ({
      count: state.count + val + val2
    });
  },
  addNewState(val) {
    return state => ({
      ...state,
      newState: val
    });
  },
  removeState() {
    return () => ({});
  },
  actionWithoutReducer() {
    return {};
  },
  async asyncActionWithoutReducer() {
    return {};
  },
  async asyncFunc() {
    // Block with a promise that resolved a new count
    const count = await new Promise(resolve =>
      setTimeout(() => {
        resolve(256);
      }, 500)
    );

    // set the state count to our promised count
    return state => ({
      count: state.count + count
    });
  },
  async fetchGoogle() {
    let google = await fetch("https://www.google.com");

    return () => ({
      status: google.status
    });
  }
};
