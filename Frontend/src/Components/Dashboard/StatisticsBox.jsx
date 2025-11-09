import React from "react";
import "../../Css/Dashboard.css";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { TbUsersPlus } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiOutlineFileDone } from "react-icons/ai";
import { PiCurrencyInrLight } from "react-icons/pi";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDashboardData } from "../../Redux/Actions/CustomerAction";

const StatisticsBox = () => {
  const dispatch = useDispatch();
  const { loading, error, dashboardData } = useSelector(
    (state) => state.customerState
  );

  useEffect(() => {
    dispatch(getDashboardData);
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const dashboardStats = dashboardData?.data;

  const profit =
    dashboardStats?.totalEmiCollections - dashboardStats?.totalLoanAmount;

  return (
    <>
      <div className="statistics-container">
        <div className="status-box total-amount-box">
          <div className="heading">
            <RiMoneyRupeeCircleLine />
            <h3>Total Amount</h3>
          </div>
          <div className="value">
            <p>{dashboardStats?.totalLoanAmount} INR</p>
          </div>
        </div>

        <div className="status-box total-customer-box">
          <div className="heading">
            <TbUsersPlus />
            <h3>Total Customers</h3>
          </div>
          <div className="value">
            <p>{dashboardStats?.totalCustomers}</p>
          </div>
        </div>

        <div className="status-box total-active-loans-box">
          <div className="heading">
            <IoBagCheckOutline />
            <h3>Active Loans</h3>
          </div>
          <div className="value">
            <p>{dashboardStats?.totalActiveLoans}</p>
          </div>
        </div>

        <div className="status-box total-cloased-loans-box">
          <div className="heading">
            <AiOutlineFileDone />
            <h3>Closed Loans</h3>
          </div>
          <div className="value">
            <p>{dashboardStats?.totalClosedLoans}</p>
          </div>
        </div>

        <div className="status-box month-collections-box">
          <div className="heading">
            <PiCurrencyInrLight />
            <h3>EMI Collections</h3>
          </div>
          <div className="value">
            <p>{dashboardStats?.totalEmiCollections} INR</p>
            <span className={`profit ${profit < 0 ? "loss" : "gain"}`}>
              Rs.{Math.abs(profit).toFixed(2)} {profit < 0 ? "Loss" : "Profit"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticsBox;
