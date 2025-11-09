import axios from "axios";
import {
  activeCustomersFailure,
  activeCustomersRequest,
  activeCustomersSuccess,
  createNewCustomerFailure,
  createNewCustomerRequest,
  createNewCustomerSuccess,
  dashboardDataFailure,
  dashboardDataRequest,
  dashboardDataSuccess,
  deleteSingleCustomerFailure,
  deleteSingleCustomerRequest,
  deleteSingleCustomerSuccess,
  singleCustomerFailure,
  singleCustomerRequest,
  singleCustomerSuccess,
  updateSingleCustomerFailure,
  updateSingleCustomerRequest,
  updateSingleCustomerSuccess,
} from "../Slices/CustomerSlice";

/**++++++++ Create New Customer +++++++++++**/

export const createNewCustomer = (customerData) => async (dispatch) => {
  const loginToken = localStorage.getItem("OmMurugaLoginToken");
  try {
    dispatch(createNewCustomerRequest());
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/admin/create-customer`,
      customerData,
      {
        headers: {
          Authorization: `${loginToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(createNewCustomerSuccess(data));
  } catch (error) {
    dispatch(createNewCustomerFailure(error.response?.data?.message));
  }
};

/**++++++++ Get All Customer +++++++++++**/

export const getAllCustomers = () => async (dispatch) => {
  try {
    dispatch(activeCustomersRequest());
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/get-customers`,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
        },
      }
    );
    dispatch(activeCustomersSuccess(data));
  } catch (error) {
    dispatch(activeCustomersFailure(error.response?.data?.message));
  }
};

/**++++++++ Get Single Customer +++++++++++**/

export const getSingleCustomer = (id) => async (dispatch) => {
  try {
    dispatch(singleCustomerRequest());
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/get-customer/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
        },
      }
    );
    dispatch(singleCustomerSuccess(data));
  } catch (error) {
    dispatch(singleCustomerFailure(error.response?.data?.message));
  }
};

/**++++++++ Delete Single Customer +++++++++++**/

export const deleteSingleCustomer = (id) => async (dispatch) => {
  try {
    dispatch(deleteSingleCustomerRequest());

    const { data } = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/admin/delete-customer/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
        },
      }
    );

    dispatch(deleteSingleCustomerSuccess(data));
  } catch (error) {
    dispatch(deleteSingleCustomerFailure(error.response?.data?.message));
  }
};

/**++++++++ Update Single Customer +++++++++++**/

export const updateSingleCustomer = (id, customerData) => async (dispatch) => {
  try {
    dispatch(updateSingleCustomerRequest());
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/admin/update-customer/${id}`,
      customerData,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(updateSingleCustomerSuccess(data));
  } catch (error) {
    dispatch(updateSingleCustomerFailure(error.response?.data?.message));
  }
};

/**++++++++ get Dashboard Data +++++++++++**/

export const getDashboardData = async (dispatch) => {
  try {
    dispatch(dashboardDataRequest());
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/get-dashboard-data`,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
        },
      }
    );
    dispatch(dashboardDataSuccess(data));
  } catch (error) {
    dispatch(dashboardDataFailure(error.response?.data?.message));
  }
};
