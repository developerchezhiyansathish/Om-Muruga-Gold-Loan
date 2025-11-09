import React from "react";
import "../Css/SideBar.css";
import logo from "/public/images/star-logo.png";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdAutorenew } from "react-icons/md";
import { RiAuctionLine } from "react-icons/ri";
import { IoDocumentsOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";

const SideBar = () => {
  
  const handleLogout = () => {
    localStorage.removeItem("OmMurugaLoginToken");
    window.location.href = "/login";
  };

  return (
    <div className="side-bar-container">
      <div className="logo-container">
        <div className="logo-box">
          <div className="image-box">
            <img src={logo} alt="om muruga logo" />
          </div>
          <div className="logo-title">
            <h1>om muruga</h1>
            <p>gold loan</p>
          </div>
        </div>

        <div className="nav-container">
          <ul>
            <li>
              <NavLink to="/" end>
                <MdOutlineDashboardCustomize /> Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/customers">
                <TbUsers /> Customers
              </NavLink>
            </li>

            <li>
              <NavLink to="/loans">
                <RiMoneyRupeeCircleLine /> Loans
              </NavLink>
            </li>

            <li>
              <NavLink to="/renewal-notice">
                <MdAutorenew /> Renewal Notice
              </NavLink>
            </li>

            <li>
              <NavLink to="/auction-notice">
                <RiAuctionLine /> Auction Notice
              </NavLink>
            </li>

            <li>
              <NavLink to="/closed-loans">
                <IoDocumentsOutline /> Closed Loans
              </NavLink>
            </li>

            <li>
              <NavLink to="/calender">
                <SlCalender /> Calender
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-container">
        <div className="logout">
          <button onClick={handleLogout}>
            <CiLogout /> Logout
          </button>
        </div>
        <p>Copyrights@2025 Om Muruga Gold Loan</p>
        <p>Developed by Chezhiyan_Sathish</p>
      </div>
    </div>
  );
};

export default SideBar;
