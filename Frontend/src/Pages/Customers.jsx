import React from "react";
import { Helmet } from "react-helmet";
import SideBar from "../Layouts/SideBar";
import Index from "../Components/Customers/Index";
import MobileBottomMenu from "../Layouts/MobileBottomMenu";

const Customers = () => {
  return (
    <>
      <Helmet>
        <title>All Customers | Om Muruga Gold Loan</title>
      </Helmet>
      <div className="app-section">
        <SideBar />
        <Index />
         <MobileBottomMenu />
      </div>
    </>
  );
};

export default Customers;
