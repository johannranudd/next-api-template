export const initialState = {
  value: 'initial state',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_STATE':
      return {
        ...state,
        value: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
