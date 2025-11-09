import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import "../../Css/Loans.css";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "../../Layouts/Loader";
import { fetchClosedLoans } from "../../Redux/Actions/LoanAction";

const ClosedLoanList = () => {
  const [searchField, setSearchField] = useState("customer");
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const { loading, error, closedLoans } = useSelector(
    (state) => state.loanState
  );
  const closedLoansData = closedLoans?.data;

  useEffect(() => {
    dispatch(fetchClosedLoans);
    if (error) {
      toast.error(error);
    }
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
        let color ="#6b7280";
        if (params.value === "Closed") color = "#6b7280";
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
        <a href={`/customer/loan/details/${params.row.id}`}>
          <button className="preview-btn">
            <FaRegEye />
          </button>
        </a>
      ),
    },
  ];
  const rows = closedLoansData?.map((loan, index) => ({
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
            <h2 className="table-title">Closed Loan Records</h2>
            <div className="search-container">
              <select
                name="search-select"
                id="search-select"
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

export default ClosedLoanList;
