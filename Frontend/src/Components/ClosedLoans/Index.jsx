import React from "react";
import "../../Css/ClosedLoans.css";
import Header from "../../Layouts/Header";
import ClosedLoanList from "./ClosedLoanList";

const Index = () => {
  return (
    <>
      <div className="dashboard-container">
        <Header title="Closed Loans" />
        <ClosedLoanList />
      </div>
    </>
  );
};

export default Index;
