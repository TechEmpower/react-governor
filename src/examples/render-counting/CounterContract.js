export const initialState = {
  count: 0
};

export const contract = {
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
  multiply(val, state) {
    return {
      count: state.count * val
    };
  },
  divide(val, state) {
    return {
      count: state.count / val
    };
  },
};
