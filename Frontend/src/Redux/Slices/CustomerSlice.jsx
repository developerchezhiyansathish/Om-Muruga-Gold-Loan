import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    loading: false,
    error: null,
    newCustomer: null,
    allCustomers: [],
    singleCustomer: null,
    deleteSingleCustomer: null,
    updateCustomer: null,
    dashboardData:null,
  },
  reducers: {
    createNewCustomerRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createNewCustomerSuccess: (state, action) => {
      state.loading = false;
      state.newCustomer = action.payload;
    },
    createNewCustomerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    activeCustomersRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    activeCustomersSuccess: (state, action) => {
      state.loading = false;
      state.allCustomers = action.payload;
    },
    activeCustomersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    singleCustomerRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    singleCustomerSuccess: (state, action) => {
      state.loading = false;
      state.singleCustomer = action.payload;
    },
    singleCustomerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSingleCustomerRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteSingleCustomerSuccess: (state, action) => {
      state.loading = false;
      state.deleteSingleCustomer = action.payload;
    },
    deleteSingleCustomerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSingleCustomerRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateSingleCustomerSuccess: (state, action) => {
      state.loading = false;
      state.updateCustomer = action.payload;
    },
    updateSingleCustomerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    dashboardDataRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    dashboardDataSuccess: (state, action) => {
      state.loading = false;
      state.dashboardData = action.payload;
    },
    dashboardDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = customerSlice;

export const {
  createNewCustomerRequest,
  createNewCustomerSuccess,
  createNewCustomerFailure,
  activeCustomersRequest,
  activeCustomersSuccess,
  activeCustomersFailure,
  singleCustomerRequest,
  singleCustomerSuccess,
  singleCustomerFailure,
  deleteSingleCustomerRequest,
  deleteSingleCustomerSuccess,
  deleteSingleCustomerFailure,
  updateSingleCustomerRequest,
  updateSingleCustomerSuccess,
  updateSingleCustomerFailure,
  dashboardDataRequest,
  dashboardDataSuccess,
  dashboardDataFailure,
} = actions;

export const customerReducer = reducer;
