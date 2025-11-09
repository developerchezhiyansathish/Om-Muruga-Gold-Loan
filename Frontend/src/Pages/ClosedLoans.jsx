import React from "react";
import { Helmet } from "react-helmet";
import SideBar from "../Layouts/SideBar";
import Index from "../Components/ClosedLoans/Index";
import "../Css/ClosedLoans.css";
import MobileBottomMenu from "../Layouts/MobileBottomMenu";


const ClosedLoans = () => {
  return (
    <>
      <Helmet>
        <title>Cloased Loans | Om Muruga Gold Loan</title>
      </Helmet>
      <div className="app-section">
        <SideBar />
        <Index />
         <MobileBottomMenu />
      </div>
    </>
  );
};

export default ClosedLoans;
