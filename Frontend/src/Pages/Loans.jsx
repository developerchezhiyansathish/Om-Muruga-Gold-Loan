import React from "react";
import SideBar from "../Layouts/SideBar";
import { Helmet } from "react-helmet";
import Index from "../Components/Loans/Index";
import MobileBottomMenu from "../Layouts/MobileBottomMenu";

const Loans = () => {
  return (
    <>
      <Helmet>
        <title>All Loans | Om Muruga Gold Loan</title>
      </Helmet>
      <div className="app-section">
        <SideBar />
        <Index />
         <MobileBottomMenu />
      </div>
    </>
  );
};

export default Loans;
