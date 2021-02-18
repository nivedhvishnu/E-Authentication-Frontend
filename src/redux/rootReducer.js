import { combineReducers } from "redux";
import { LOGINREDUCER } from "../components/Login/LoginReducer";

const appReducer = combineReducers({
  LOGINREDUCER,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;