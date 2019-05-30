import fetch from "cross-fetch";

export const initialState = {
  count: 0
};

export const contract = {
  increment(state) {
    return {
      count: state.count + 1
    };
  },
  decrement(state) {
    return {
      count: state.count - 1
    };
  },
  add(val, state) {
    return {
      count: state.count + val
    };
  },
  set(val) {
    return {
      count: val
    };
  },
  addSum(val, val2, state) {
    return {
      count: state.count + val + val2
    };
  },
  addNewState(val, state) {
    return {
      ...state,
      newState: val
    };
  },
  removeState() {
    return {};
  },
  async asyncFunc() {
    // Block with a promise that resolved a new count
    const count = await new Promise(resolve =>
      setTimeout(() => {
        resolve(256);
      }, 1000)
    );

    // set the state count to our promised count
    this.set(count);
  },
  async fetchGoogle() {
    let google = await fetch("https://www.google.com");

    this.setStatus(google.status);
  },
  setStatus(status) {
    return {
      status
    };
  },
  statedInc(state) {
    return {
      count: state.count + 1
    };
  }
};
