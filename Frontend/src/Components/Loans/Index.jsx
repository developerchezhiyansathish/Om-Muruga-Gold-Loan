import React from "react";
import "../../Css/Loans.css";
import Header from "../../Layouts/Header";
import AllLoanList from "./AllLoanList";

const Index = () => {
  return (
    <>
      <div className="all-loans-container dashboard-container">
        <Header title="Customer Loans" />
        <AllLoanList />
      </div>
    </>
  );
};

export default Index;
