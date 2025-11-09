import React from "react";
import { Helmet } from "react-helmet";
import SideBar from "../Layouts/SideBar";
import Index from "../Components/Renewal/Index";
import MobileBottomMenu from "../Layouts/MobileBottomMenu";

const CreateRenewalNotice = () => {
  return (
    <>
      <Helmet>
        <title>Renewal Notice | Om Muruga Gold Loan</title>
      </Helmet>
      <div className="app-section">
        <SideBar />
        <Index />
         <MobileBottomMenu />
      </div>
    </>
  );
};

export default CreateRenewalNotice;
