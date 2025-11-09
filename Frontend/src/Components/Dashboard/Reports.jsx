import React from "react";
import "../../Css/Dashboard.css";
import LoanGrowthChart from "./LineChart";
import EMICollectionBarChart from "./Barchart";
import ComparisonPieChart from "./PieChart";
import LatestLoanTable from "./UpcomingLoanTable";

const Reports = () => {
  return (
    <>
      <div className="graph-container">
        <div className="reports-row">
          <div className="line-chart-container">
            <LoanGrowthChart />
          </div>
          <div className="bar-chart-container">
            <EMICollectionBarChart />
          </div>
        </div>

        <div className="reports-row">
          <div className="piechart-container">
            <ComparisonPieChart />
          </div>
          <div className="upcoming-renewal-table">
            <LatestLoanTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
