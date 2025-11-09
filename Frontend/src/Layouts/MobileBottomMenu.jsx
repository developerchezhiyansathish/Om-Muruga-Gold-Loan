import React from "react";
import "../Css/MobileBottomMenu.css";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { MdAutorenew } from "react-icons/md";
import { RiAuctionLine } from "react-icons/ri";
import { IoDocumentsOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";

const MobileBottomMenu = () => {
  const handleLogout = () => {
    localStorage.removeItem("OmMurugaLoginToken");
    window.location.href = "/login";
  };
  return (
    <div className="mobile-menu">
      <NavLink to="/" end className="menu-link">
        <MdOutlineDashboardCustomize className="menu-icon" />
        <span className="menu-title">Dashboard</span>
      </NavLink>

      <NavLink to="/customers" className="menu-link">
        <TbUsers className="menu-icon" />
        <span className="menu-title">Customers</span>
      </NavLink>

      <NavLink to="/loans" className="menu-link">
        <RiMoneyRupeeCircleLine className="menu-icon" />
        <span className="menu-title">Loans</span>
      </NavLink>

      <NavLink to="/renewal-notice" className="menu-link">
        <MdAutorenew className="menu-icon" />
        <span className="menu-title">Renewal</span>
      </NavLink>

      <NavLink to="/auction-notice" className="menu-link">
        <RiAuctionLine className="menu-icon" />
        <span className="menu-title">Auction</span>
      </NavLink>

      <NavLink to="/closed-loans" className="menu-link">
        <IoDocumentsOutline className="menu-icon" />
        <span className="menu-title">Closed</span>
      </NavLink>

      <NavLink onClick={handleLogout} className="menu-link">
        <CiLogout className="menu-icon" />
        <span className="menu-title">Logout</span>
      </NavLink>
    </div>
  );
};

export default MobileBottomMenu;
