import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { customerReducer } from "./Slices/CustomerSlice";
import { loginReducer } from "./Slices/LoginSlice";
import { loanReducer } from "./Slices/LoanSlice";

const reducer = combineReducers({
  customerState: customerReducer,
  loginState: loginReducer,
  loanState: loanReducer,
});

const store = configureStore({
  reducer,
});

export default store;
