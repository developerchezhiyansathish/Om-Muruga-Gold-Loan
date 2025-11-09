import React from "react";
import "../../Css/Dashboard.css";
import Header from "../../Layouts/Header";
import StatisticsBox from "./StatisticsBox";
import Reports from "./Reports";

const Index = () => {
  return (
    <>
      <div className="dashboard-container">
        <Header title="Dashboard" />
        <StatisticsBox />
        <Reports />
      </div>
    </>
  );
};

export default Index;
