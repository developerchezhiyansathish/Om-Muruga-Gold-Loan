import React from "react";
import "../Css/CustomerDetails.css";
import { Helmet } from "react-helmet";
import SideBar from "../Layouts/SideBar";
import SingleLoanDetails from "../Components/Loans/SingleLoanDetails";
import MobileBottomMenu from "../Layouts/MobileBottomMenu";

const SingleLoanPage = () => {
  return (
    <>
      <Helmet>
        <title>Loan Details | Om Muruga Gold Loan</title>
      </Helmet>
      <div className="app-section">
        <SideBar />
        <SingleLoanDetails />
         <MobileBottomMenu />
      </div>
    </>
  );
};

export default SingleLoanPage;
