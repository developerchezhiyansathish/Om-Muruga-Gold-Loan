import React from "react";
import "../../Css/Auction.css";
import AuctionNotice from "./AuctionNotice";
import Header from "../../Layouts/Header";

const Index = () => {
  return (
    <>
      <div className="dashboard-container">
        <Header title="Auction Notice" />
        <AuctionNotice />
      </div>
    </>
  );
};

export default Index;
