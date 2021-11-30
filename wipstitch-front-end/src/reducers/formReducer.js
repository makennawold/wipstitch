const formReducer = (state, action) => {
  switch (action.type) {
    case "HANDLE UPDATE":
      return {
        ...state,
        [action.field]: action.payload,
      };
    default:
      return state;
  }
};

export default formReducer;
