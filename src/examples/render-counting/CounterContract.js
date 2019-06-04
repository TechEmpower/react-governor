export const initialState = {
  count: 0
};

export const contract = {
  add(val) {
    return {
      count: this.state.count + val
    };
  },
  set(val) {
    return {
      count: val
    };
  },
  multiply(val) {
    return {
      count: this.state.count * val
    };
  },
  divide(val) {
    return {
      count: this.state.count / val
    };
  }
};
