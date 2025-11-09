import React, { useEffect } from "react";
import "../../Css/Dashboard.css";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../Redux/Actions/CustomerAction";

const LatestLoanTable = () => {
  const dispatch = useDispatch();
  const { loading, error, dashboardData } = useSelector(
    (state) => state.customerState
  );

  useEffect(() => {
    dispatch(getDashboardData);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Safe fallback to empty array
  const dashboardtableData = dashboardData?.data?.recentCustomers || [];
 


  const rows = dashboardtableData.map((customer, index) => ({
    id: customer._id,
    no: index + 1,
    customer: customer.name || "N/A",
    joined: new Date(customer.createdAt).toLocaleDateString("en-IN"),
    amount: `₹ ${customer?.totalLoanAmount || 0}`,
  }));

  const columns = [
    { field: "no", headerName: "#", width: 100 },
    { field: "customer", headerName: "Customer Name", flex: 1 },
    { field: "joined", headerName: "Join Date", width: 200 },
    { field: "amount", headerName: "Loan Amount", width: 200 },
  ];

  return (
    <div className="latest-loan-container">
      <h2>Recent Customers</h2>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          className="custom-datagrid"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default LatestLoanTable;
