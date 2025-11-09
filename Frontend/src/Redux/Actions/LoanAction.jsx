import axios from "axios";
import {
  closedLoansFailure,
  closedLoansRequest,
  closedLoansSuccess,
  createNewLoanFailure,
  createNewLoanRequest,
  createNewLoanSuccess,
  deleteLoanFailure,
  deleteLoanRequest,
  deleteLoanSuccess,
  emiPaymentsFailure,
  emiPaymentsRequest,
  emiPaymentsSuccess,
  fetchActiveLoansFailure,
  fetchActiveLoansRequest,
  fetchActiveLoansSuccess,
  singleLoanFailure,
  singleLoanRequest,
  singleLoanSuccess,
  updateLoanFailure,
  updateLoanRequest,
  updateLoanSuccess,
} from "../Slices/LoanSlice";

/***Create Single Loan***/
export const createLoan = (loanData) => async (dispatch) => {
  try {
    dispatch(createNewLoanRequest());
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/admin/create-loan`,
      loanData,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(createNewLoanSuccess(data));
  } catch (error) {
    dispatch(createNewLoanFailure(error.response?.data?.message));
  }
};

/***Get Single Loan***/
export const fetchSingleLoan = (id) => async (dispatch) => {
  try {
    dispatch(singleLoanRequest());
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/get-loan/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
        },
      }
    );
    dispatch(singleLoanSuccess(data));
  } catch (error) {
    dispatch(singleLoanFailure(error.response?.data?.message));
  }
};

/**Get Active Loans**/
export const fetchActiveLoans = async (dispatch) => {
  try {
    dispatch(fetchActiveLoansRequest());
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/get-active-loans`,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
        },
      }
    );

    dispatch(fetchActiveLoansSuccess(data));
  } catch (error) {
    dispatch(fetchActiveLoansFailure(error.response?.data?.message));
  }
};

/**Get Closed Loans**/
export const fetchClosedLoans = async (dispatch) => {
  try {
    dispatch(closedLoansRequest());
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admin/get-closed-loans`,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
        },
      }
    );
    dispatch(closedLoansSuccess(data));
  } catch (error) {
    dispatch(closedLoansFailure(error.response?.data?.message));
  }
};

/**Update Single Loan***/

export const updateSingleLoan = (id, loanData) => async (dispatch) => {
  try {
    dispatch(updateLoanRequest());
    const { data } = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/admin/update-loan/${id}`,
      loanData,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(updateLoanSuccess(data));
  } catch (error) {
    dispatch(updateLoanFailure(error.response?.data?.message));
  }
};

/**Delete Single Loan***/

export const deleteSingleLoan = (id) => async (dispatch) => {
  try {
    dispatch(deleteLoanRequest());
    const { data } = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/admin/delete-loan/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
        },
      }
    );
    dispatch(deleteLoanSuccess(data));
  } catch (error) {
    dispatch(deleteLoanFailure(error.response?.data?.message));
  }
};

/**Submit EMI Payments***/

export const submitEmiPayments = (id, emiData) => async (dispatch) => {
  try {
    dispatch(emiPaymentsRequest());
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/admin/emi-payments/${id}`,
      emiData,
      {
        headers: {
          Authorization: localStorage.getItem("OmMurugaLoginToken"),
        },
      }
    );
    dispatch(emiPaymentsSuccess(data));
  } catch (error) {
    dispatch(emiPaymentsFailure(error.response?.data?.message));
  }
};
