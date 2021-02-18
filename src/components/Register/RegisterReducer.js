const initialState = { CLIENTSDATA: [], EDITCLIENTDATA: [], LOADING: true };

export const CLIENTREDUCER = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CLIENTS":
      return {
        ...state,
        CLIENTSDATA: action.data,
        LOADING: false,
      };
    case "SET_EDIT_CLIENT":
      return {
        ...state,
        EDITCLIENTDATA: action.data,
      };
    default:
      return state;
  }
};
