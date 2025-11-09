import axios from "axios";
import { loginFailure, loginRequest, loginSuccess } from "../Slices/LoginSlice";

export const adminLogin = (logindata) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/admin/login`,
      logindata
    );
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message));
  }
};
