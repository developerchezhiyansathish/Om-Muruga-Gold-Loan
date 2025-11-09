import React from "react";
import "../Css/Header.css";
import Avatar from "@mui/material/Avatar";

const Header = ({title}) => {
    const date=new Date();
    const time=new Date();
  return (
    <>
      <div className="header-container">
        <div className="title-box">
          <h2>{title}</h2>
        </div>
        <div className="login-status">
          <div className="date-box">
            <p>{date.toDateString()}</p>
          </div>
          <div className="time-box">
            <p>{time.toLocaleTimeString()}</p>
          </div>
          <div className="login-id">
            <Avatar alt="Ramanan" src="/images/ramanan.png" />
            <p>
              Ramanan<span className="active-green-dot"></span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
