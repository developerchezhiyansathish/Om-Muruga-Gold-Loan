import { createSlice } from "@reduxjs/toolkit";

const loanSlice = createSlice({
  name: "loan",
  initialState: {
    loading: false,
    error: null,
    newLoan: null,
    activeLoans: [],
    closedLoans: [],
    singleLoan: null,
    updateLoan: null,
    deleteLoan: null,
    emiPayment: [],
  },
  reducers: {
    createNewLoanRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createNewLoanSuccess: (state, action) => {
      state.loading = false;
      state.newLoan = action.payload;
    },
    createNewLoanFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchActiveLoansRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchActiveLoansSuccess: (state, action) => {
      state.loading = false;
      state.activeLoans = action.payload;
    },
    fetchActiveLoansFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    closedLoansRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    closedLoansSuccess: (state, action) => {
      state.loading = false;
      state.closedLoans = action.payload;
    },
    closedLoansFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    singleLoanRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    singleLoanSuccess: (state, action) => {
      state.loading = false;
      state.singleLoan = action.payload;
    },
    singleLoanFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateLoanRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateLoanSuccess: (state, action) => {
      state.loading = false;
      state.updateLoan = action.payload;
    },
    updateLoanFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteLoanRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteLoanSuccess: (state, action) => {
      state.loading = false;
      state.deleteLoan = action.payload;
    },
    deleteLoanFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    emiPaymentsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    emiPaymentsSuccess: (state, action) => {
      state.loading = false;
      state.emiPayment = action.payload;
    },
    emiPaymentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = loanSlice;

export const {
  createNewLoanRequest,
  createNewLoanSuccess,
  createNewLoanFailure,
  fetchActiveLoansRequest,
  fetchActiveLoansSuccess,
  fetchActiveLoansFailure,
  closedLoansRequest,
  closedLoansSuccess,
  closedLoansFailure,
  singleLoanRequest,
  singleLoanSuccess,
  singleLoanFailure,
  updateLoanRequest,
  updateLoanSuccess,
  updateLoanFailure,
  deleteLoanRequest,
  deleteLoanSuccess,
  deleteLoanFailure,
  emiPaymentsRequest,
  emiPaymentsSuccess,
  emiPaymentsFailure,
} = actions;

export const loanReducer = reducer;
