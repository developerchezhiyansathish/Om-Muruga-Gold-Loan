import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../../Css/CustomerDetails.css";
import { MdOpenInNew } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuCircleFadingPlus } from "react-icons/lu";
import CreateLoanModel from "../Loans/CreateLoanModel";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleCustomer,
  getSingleCustomer,
} from "../../Redux/Actions/CustomerAction";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../Layouts/Loader";
import toast from "react-hot-toast";
import UpdateCustomerModel from "./UpdateCustomerModel";

const CustomerProfile = () => {
  const [openLoanModal, setOpenLoanModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleOpenLoan = () => setOpenLoanModal(true);
  const handleCloseLoan = () => setOpenLoanModal(false);

  const handleOpenUpdate = () => setOpenUpdateModal(true);
  const handleCloseUpdate = () => setOpenUpdateModal(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, singleCustomer } = useSelector(
    (state) => state.customerState
  );
  const { id } = useParams();

  const customerData = singleCustomer?.data;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getSingleCustomer(id));
  }, [dispatch, id, error]);

  const columns = [
    { field: "no", headerName: "#", width: 80 },
    { field: "loanId", headerName: "Loan ID", width: 100 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "duration", headerName: "Duration", width: 150 },
    { field: "emi", headerName: "EMI", width: 150 },
    { field: "startDate", headerName: "Start Date", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        let color = "#999";
        if (params.value === "Active") color = "green";
        else if (params.value === "Closed") color = "gray";
        else if (params.value === "Defaulted") color = "red";
        return (
          <span style={{ color, fontWeight: "600" }} className="status-badge">
            {params.value}
          </span>
        );
      },
    },
    {
      field: "preview",
      headerName: "Preview",
      width: 120,
      renderCell: (params) => (
        <a href={`/customer/loan/details/${params.row.id}`}>
          <button className="preview-btn">
            <MdOpenInNew />
          </button>
        </a>
      ),
    },
  ];

  const rows = customerData?.loans?.map((loan, index) => ({
    id: loan._id,
    no: index + 1,
    loanId: loan.loanNumber,
    amount: `₹ ${loan.loanAmount}`,
    duration: "12 Months",
    emi: `₹ ${loan.emi}`,
    startDate: loan.loanDate
      ? new Date(loan.loanDate).toLocaleDateString("en-GB")
      : "-",
    status: loan.status || "Active",
  }));

  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteSingleCustomer(id));
    }
    toast.success("Customer deleted successfully");
    setTimeout(() => {
      navigate("/customers");
    }, 1000);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="customer-profile">
            {/* Header */}

            <div className="header">
              <div className="header-left">
                <img
                  src={customerData?.image}
                  alt="Ramesh"
                  className="avatar"
                />
                <div>
                  <h2 className="name">{customerData?.name}</h2>
                  <p className="id">Customer ID: {customerData?.customerId}</p>
                  <span className="status active">Active</span>
                </div>
              </div>
              <div className="header-right">
                <button className="add-loan-btn" onClick={handleOpenLoan}>
                  <LuCircleFadingPlus /> Add New Loan
                </button>
                <button className="edit-btn" onClick={handleOpenUpdate}>
                  <AiOutlineEdit /> Edit Profile
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCustomer(customerData?._id)}
                >
                  <RiDeleteBin6Line /> Delete Profile
                </button>
              </div>
            </div>

            {/* Personal Info */}
            <div className="profile-info-box">
              <div className="card basic-info">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-grid-one">
                    <div className="info-bx">
                      <h6>Name</h6>
                      <p>{customerData?.name}</p>
                    </div>
                    <div className="info-bx">
                      <h6>ID</h6>
                      <p>{customerData?.customerId}</p>
                    </div>
                    <div className="info-bx">
                      <h6>Phone</h6>
                      <p>{customerData?.phone}</p>
                    </div>
                  </div>
                  <div className="info-grid-one">
                    <div className="info-bx">
                      <h6>Aadhaar</h6>
                      <p>{customerData?.aadhar}</p>
                    </div>
                    <div className="info-bx">
                      <h6>PAN</h6>
                      <p>{customerData?.pan}</p>
                    </div>
                    <div className="info-bx">
                      <h6>Occupation</h6>
                      <p>{customerData?.occupation}</p>
                    </div>
                  </div>
                  <div className="info-grid-one">
                    <div className="info-bx">
                      <h6>city</h6>
                      <p>{customerData?.city}</p>
                    </div>
                    <div className="info-bx address">
                      <h6>Address</h6>
                      <p>{customerData?.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card loan-summary">
                <h3>Loan Summary</h3>
                <div className="summary">
                  <div className="summary-box">
                    <h6>Total Number of Loans</h6>
                    <p>
                      {customerData?.loanCount > 0
                        ? `${customerData?.loanCount} Loans`
                        : "No Loans Yet"}
                    </p>
                  </div>
                  <div className="summary-box">
                    <h6>Total Amount Borrowed</h6>
                    <p>
                      {customerData?.totalLoanAmount > 0
                        ? `₹ ${customerData?.totalLoanAmount}`
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Loan History */}

            <div
              className={`card loan-history ${
                customerData?.loanCount === 0 ? "no-loans-base" : ""
              }`}
            >
              <h3>Loan History</h3>
              <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={3}
                  rowsPerPageOptions={[3]}
                  disableSelectionOnClick
                />
              </div>
            </div>
            <CreateLoanModel
              open={openLoanModal}
              handleClose={handleCloseLoan}
            />

            <UpdateCustomerModel
              open={openUpdateModal}
              handleUpdateFormClose={handleCloseUpdate}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CustomerProfile;
