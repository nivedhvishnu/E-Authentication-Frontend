const initialState = {
  CLIENTSDATA: [],
  EDITCLIENTDATA: [],
  LOADING: true,
  SERVICES: [],
  INVOICES: [],
};

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
    case "SET_SERVICES":
      return {
        ...state,
        SERVICES: action.data,
      };
    case "SET_INVOICES":
      return {
        ...state,
        INVOICES: action.data,
      };
    default:
      return state;
  }
};
