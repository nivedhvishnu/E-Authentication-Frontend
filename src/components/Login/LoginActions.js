import axios from 'axios';
import config from "../../config/api";
import {notification} from "antd"

export const loginRequest = () => ({
  type: 'LOGIN_REQUEST'
});

export const loginSuccess = (data) => ({
  type: 'LOGIN_SUCCESS',
  data
});

export const loginFailure = () => ({
  type: 'LOGIN_FAILURE'
});

export const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS'
});

export const logoutFailure = () => ({
  type: 'LOGOUT_FAILURE'
});

export const startLogin = (_params) => {
  const HEADER = {
    params: {
      ..._params
    }
  }
  return function (dispatch) {
    axios.get(`${config.api.base_url}api/login`, HEADER).then(response => {
      console.log(response.status)
      if (response.status == 200) {
        sessionStorage.setItem('user', JSON.stringify(response.data))
        dispatch(loginSuccess(response.data.userData));
      }else{
        console.log("HERE")
        notification.error({
          message: "Error",
          description: "Invalid Credentials",
        });
      }
    }).catch(error=>{
      notification.error({
        message: "Error",
        description: "Invalid Credentials",
      });
    })
  }
}