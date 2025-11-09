import React from "react";
import "../../Css/Dashboard.css";
import Header from "../../Layouts/Header";
import RenewalNotice from "./RenewalNotice";

const Index = () => {
  return (
    <>
      <div className="dashboard-container">
        <Header title="Renewal Notice" />
        <RenewalNotice />
      </div>
    </>
  );
};

export default Index;
