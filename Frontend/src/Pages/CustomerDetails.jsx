import React from "react";
import "../Css/CustomerDetails.css";
import { Helmet } from "react-helmet";
import SideBar from "../Layouts/SideBar";
import Customer from "../Components/Customers/Customer";
import MobileBottomMenu from "../Layouts/MobileBottomMenu";

const CustomerDetails = () => {
  return (
    <>
      <Helmet>
        <title>Customer Details | Om Muruga Gold Loan</title>
      </Helmet>
      <div className="app-section">
        <SideBar />
        <Customer />
         <MobileBottomMenu />
      </div>
    </>
  );
};

export default CustomerDetails;
