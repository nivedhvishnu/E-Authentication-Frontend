import { combineReducers } from "redux";
import { LOGINREDUCER } from "../components/Login/LoginReducer";
import {CLIENTREDUCER} from "../components/Clients/ClientsReducer"

const appReducer = combineReducers({
  LOGINREDUCER,
  CLIENTREDUCER
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;