import React, { useEffect, useState } from "react";
import "../Css/Login.css";
import loginImage from "/public/images/login-page.png";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../Redux/Actions/LoginAction";
import toast from "react-hot-toast";
import Loader from "../Layouts/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, login, error } = useSelector((state) => state.loginState);

  const loginHandle = (e) => {
    e.preventDefault();
    const logindata = {
      email,
      password,
    };
    dispatch(adminLogin(logindata));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (login?.success === true) {
      toast.success(login?.message);
      localStorage.setItem("OmMurugaLoginToken", login.token);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }, [error, login, loading]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="login-container">
            <div className="login-left-section">
              <img src={loginImage} alt="login-banner" />
            </div>
            <div className="login-right-section">
              <div className="login-heading">
                <h2>Welcome Back! 👋</h2>
                <h4>Ramanan</h4>
                <p>Have a nice day ahead</p>
              </div>
              <div className="login-form">
                <h3>Login Your Account</h3>
                <form onSubmit={loginHandle}>
                  <div className="input-box">
                    <MdAlternateEmail />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <MdOutlinePassword />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="login-btn">
                    <button>
                      <CiLogin /> Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
