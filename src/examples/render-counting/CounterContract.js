export const initialState = {
  count: 0
};

export const contract = {
  add(val, getState) {
    const count = getState().count + val;
    return () => ({
      count
    });
  },
  set(val) {
    return () => ({
      count: val
    });
  },
  multiply(val) {
    return state => ({
      count: state.count * val
    });
  },
  divide(val) {
    return state => ({
      count: state.count / val
    });
  },
  async asyncMultiply(val) {
    return state => ({
      count: state.count * val
    });
  }
};
