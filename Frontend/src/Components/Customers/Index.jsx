import React from "react";
import "../../Css/Customers.css";
import Header from "../../Layouts/Header";
import CustomerDataTable from "./CustomerDataTable";

const Index = () => {
  return (
    <>
      <div className="all-customer-container dashboard-container">
        <Header title="Customers" />
        <CustomerDataTable />
      </div>
    </>
  );
};

export default Index;
