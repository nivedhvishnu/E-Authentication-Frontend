const initialState = { ISAUTH: false, ISAUTHATTEMPT: false, USER: {} };

export const LOGINREDUCER = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ISAUTHATTEMPT: false,
        ISAUTH: true,
        USER: action.data
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        ISAUTHATTEMPT: true
      }
    case 'LOGIN_FAILURE':
      return initialState;
    case 'LOGOUT_SUCCESS':
      return initialState;
    case 'LOGOUT_FAILURE':
      return {
        ...state,
        ISAUTHATTEMPT: false
      };
    default:
      return state;
  }
}