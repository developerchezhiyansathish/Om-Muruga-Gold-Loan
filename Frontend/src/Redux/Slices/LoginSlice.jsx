import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    login: null,
    error: null,
  },
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.login = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = loginSlice;

export const { loginRequest, loginSuccess, loginFailure } = actions;

export const loginReducer = reducer;
