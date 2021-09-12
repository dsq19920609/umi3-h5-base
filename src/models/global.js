export default {
  namespace: 'global',

  state: {
    isLoading: false,
  },
  
  reducers: {
    save (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
