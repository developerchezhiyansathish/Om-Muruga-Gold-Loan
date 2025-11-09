import React, { useEffect, useState } from "react";
import "../../Css/Customers.css";
import { DataGrid } from "@mui/x-data-grid";
import { FaRegEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import CreateCustomerModel from "./CreateCustomerModel";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleCustomer,
  getAllCustomers,
} from "../../Redux/Actions/CustomerAction";
import Loader from "../../Layouts/Loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CustomerDataTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("customer");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, allCustomers } = useSelector(
    (state) => state.customerState
  );

  const customersData = allCustomers?.data;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllCustomers());
    if (error) {
      toast.error(error);
    }
  }, []);

  // Delete Customer
  const handleDeleteCustomer = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteSingleCustomer(id));
    }
    toast.success("Customer deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const columns = [
    { field: "no", headerName: "#", width: 80 },
    { field: "customer", headerName: "Customer Name", flex: 1 },
    { field: "customerid", headerName: "Customer ID", width: 180 },
    { field: "mobile", headerName: "Phone Number", width: 180 },
    { field: "count", headerName: "Loan Count", width: 150 },
    { field: "amount", headerName: "Total Loan Amount", width: 200 },
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
          <span style={{ color, fontWeight: "500" }} className="status-badge">
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
        <a href={`/customer/details/${params.row.id}`}>
          <button className="preview-btn">
            <FaRegEye />
          </button>
        </a>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => (
        <button
          className="delete-btn"
          onClick={() => handleDeleteCustomer(params.row.id)}
        >
          <RiDeleteBin6Line />
        </button>
      ),
    },
  ];

  const rows = customersData?.map((customer, index) => ({
    id: customer._id,
    no: index + 1,
    customer: customer.name,
    customerid: customer.customerId,
    mobile: customer.phone,
    count: customer.loanCount,
    amount: `₹ ${customer.totalLoanAmount}`,
    status: customer.status || "Active",
  }));

  // Filter rows based on search input & field
  const filteredRows = rows?.filter((row) =>
    row[searchField].toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="customer-data-table-container">
            {/* Table title */}
            <div className="customer-table-title-box">
              <h2 className="table-title">Customers List</h2>
              <button className="add-customer-btn" onClick={handleOpen}>
                <IoMdPersonAdd /> Add Customer
              </button>
            </div>

            {/* Search bar + filter */}
            <div className="search-container">
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="search-select"
              >
                <option value="customer">Search by Name</option>
                <option value="customerid">Search by Customer ID</option>
              </select>

              <input
                type="text"
                placeholder={`Search by ${searchField}...`}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
              />
            </div>

            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                pageSize={50}
                rowsPerPageOptions={[5, 10, 25]}
                disableSelectionOnClick
                className="custom-customers-datagrid"
              />
            </div>

            <CreateCustomerModel open={open} handleClose={handleClose} />
          </div>
        </>
      )}
    </>
  );
};

export default CustomerDataTable;
