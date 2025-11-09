import React from "react";
import SideBar from "../Layouts/SideBar";
import { Helmet } from "react-helmet";
import Index from "../Components/Dashboard/Index";
import MobileBottomMenu from "../Layouts/MobileBottomMenu";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Om Muruga Gold Loan</title>
      </Helmet>
      <div className="app-section">
        <SideBar />
        <Index />
        <MobileBottomMenu />
      </div>
    </>
  );
};

export default Dashboard;
