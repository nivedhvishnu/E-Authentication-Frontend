import axios from "axios";
import config from "../../config/api";
import { notification } from "antd";

export const setClients = (data) => ({
  type: "SET_CLIENTS",
  data,
});

export const setEditClient = (data) => ({
  type: "SET_EDIT_CLIENT",
  data,
});

export const setServices = (data) => ({
  type: "SET_SERVICES",
  data,
});

export const setInvoices = (data) => ({
  type: "SET_INVOICES",
  data,
});

export const fetchClients = (_params) => {
  const HEADER = {
    params: {
      page: _params.page,
    },
  };
  return function (dispatch) {
    axios.get(`${config.api.base_url}api/fetch`, HEADER).then((response) => {
      if (response.status == 200) {
        console.log("CLIENTS DATA", response.data);
        dispatch(setClients(response.data));
      } else {
        console.log("EROR WHILE INSERTING");
      }
    });
  };
};

export const addClient = (values) => {
  console.log(values);
  const HEADER = {
    ...values,
  };
  return function (dispatch) {
    axios
      .post(`${config.api.base_url}api/register`, HEADER)
      .then((response) => {
        console.log("REPONSE", response);
        if (response.status == 200 || response.status == 204) {
          console.log("INSERTED");
          dispatch(setClients(response.data));
          notification.success({
            message: "Success",
            description: "Client Has Been Added!",
          });
        } else {
          console.log("Error While Inserting");
          notification.error({
            message: "Error",
            description: response.error.data,
          });
        }
      });
  };
};

export const updateClient = (_params) => {
  const HEADER = _params;
  return function (dispatch) {
    axios
      .post(`${config.api.base_url}api/editclient`, HEADER)
      .then((response) => {
        if (response.status == 200) {
          console.log("Updated");
        } else {
          console.log("EROR WHILE INSERTING");
        }
      });
  };
};

export const searchClient = (_params) => {
  const HEADER = {
    params: _params,
  };
  return function (dispatch) {
    axios
      .get(`${config.api.base_url}api/clients/search`, HEADER)
      .then((response) => {
        if (response.status == 200) {
          console.log("INSERTED");
          dispatch(setClients(response.data));
        } else if (response.status == 204) {
          dispatch(setClients([]));
        } else {
          console.log("Error While Searching");
          notification.error({
            message: "Error",
            description: response.error.data,
          });
        }
      });
  };
};

export const fetchServices = (_params) => {
  const HEADER = {
    params: _params,
  };
  return function (dispatch) {
    axios.get(`${config.api.base_url}api/services`, HEADER).then((response) => {
      if (response.status == 200) {
        dispatch(setServices(response.data));
      } else {
        notification.error({
          message: "Error",
          description: response.error.data,
        });
      }
    });
  };
};

export const fetchInvoices = (_params) => {
  const HEADER = {
    params: _params,
  };
  return function (dispatch) {
    axios.get(`${config.api.base_url}api/invoices`, HEADER).then((response) => {
      console.log("ERPONSE", response);
      if (response.status == 200) {
        dispatch(setInvoices(response.data));
      } else if (response.status == 204) {
        notification.warning({
          message: "Warning",
          description: "No Invoice Found",
        });
      } else {
        notification.error({
          message: "Error",
          description: response.error.data,
        });
      }
    });
  };
};
