import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Loans from "./Pages/Loans";
import Customers from "./Pages/Customers";
import ClosedLoans from "./Pages/ClosedLoans";
import CreateAuctionNotice from "./Pages/CreateAuctionNotice";
import CreateRenewalNotice from "./Pages/CreateRenewalNotice";
import Calender from "./Pages/Calender";
import { Toaster } from "react-hot-toast";
import CustomerDetails from "./Pages/CustomerDetails";
import SingleLoanPage from "./Pages/SingleLoanPage";
import Login from "./Pages/Login";
import Auth from "./Pages/Auth";
import SingleLoanPDF from "./Components/Loans/SingleLoanPDF";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Auth><Dashboard /></Auth>} />
          <Route path="/loans" element={<Auth><Loans /></Auth>} />
          <Route path="/customers" element={<Auth><Customers /></Auth>} />
          <Route path="/closed-loans" element={<Auth><ClosedLoans /></Auth>} />
          <Route path="/auction-notice" element={<Auth><CreateAuctionNotice /></Auth>} />
          <Route path="/renewal-notice" element={<Auth><CreateRenewalNotice /></Auth>} />
          <Route path="/calender" element={<Auth><Calender /></Auth>} />
          <Route path="/customer/details/:id" element={<Auth><CustomerDetails /></Auth>} />
          <Route path="/customer/loan/details/:id" element={<Auth><SingleLoanPage /></Auth>} />
          <Route path="loan/:id/pdf" element={<Auth><SingleLoanPDF /></Auth>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
