import React from "react";
import { Helmet } from "react-helmet";
import SideBar from "../Layouts/SideBar";
import Index from "../Components/Auction/Index";
import MobileBottomMenu from "../Layouts/MobileBottomMenu";


const CreateAuctionNotice = () => {
  return (
    <>
      <Helmet>
        <title>Auction Notice | Om Muruga Gold Loan</title>
      </Helmet>
      <div className="app-section">
        <SideBar />
        <Index />
         <MobileBottomMenu />
      </div>
    </>
  );
};

export default CreateAuctionNotice;


  