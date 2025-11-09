import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import "../../Css/Loans.css";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { fetchActiveLoans } from "../../Redux/Actions/LoanAction";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "../../Layouts/Loader";

const AllLoanList = () => {
  const [searchField, setSearchField] = useState("customer");
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();
  const { loading, error, activeLoans } = useSelector(
    (state) => state.loanState
  );

  const activeLoansData = activeLoans?.data;

  useEffect(() => {
    dispatch(fetchActiveLoans);
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const columns = [
    { field: "no", headerName: "#", width: 80 },
    { field: "customer", headerName: "Customer Name", flex: 1 },
    { field: "customerid", headerName: "Customer ID", width: 180 },
    { field: "loanid", headerName: "Loan ID", width: 180 },
    { field: "amount", headerName: "Loan Amount", width: 150 },
    { field: "duedate", headerName: "Due Date", width: 150 },
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
            <FaRegEye />
          </button>
        </a>
      ),
    },
  ];
  const rows = activeLoansData?.map((loan, index) => ({
    id: loan._id,
    no: index + 1,
    customer: loan.customer.name,
    customerid: loan.customer.customerId,
    loanid: loan.loanNumber,
    amount: `₹ ${loan.loanAmount}`,
    duedate: new Date(loan.loanDueDate).toLocaleDateString("en-GB"),
    status: loan.status,
  }));

  const filteredRows = rows?.filter((row) =>
    row[searchField].toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="all-loanlist-container customer-data-table-container">
            <h2 className="table-title">Loan Records</h2>

            <div className="search-container">
              <select
                className="search-select"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              >
                <option value="customer">Search by Name</option>
                <option value="customerid">Search by Customer ID</option>
                <option value="loanid">Search by Loan ID</option>
              </select>
              <input
                type="text"
                placeholder={`Search by ${searchField}`}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
              />
            </div>
            <div style={{ width: "100%" }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                pageSize={50}
                rowsPerPageOptions={[5, 10, 25]}
                disableSelectionOnClick
                className="custom-customers-datagrid"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllLoanList;
