import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const loginToken = localStorage.getItem("OmMurugaLoginToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginToken) {
      navigate("/login");
    }
  }, [loginToken, navigate]);

  return loginToken ? children : null;
};

export default Auth;
