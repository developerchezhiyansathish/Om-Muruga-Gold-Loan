import React, { useEffect } from "react";
import "../../Css/Dashboard.css";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../Redux/Actions/CustomerAction";
import { toast } from "react-hot-toast";

const ComparisonPieChart = () => {
  const dispatch = useDispatch();
  const { dashboardData, error } = useSelector(
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

  const activeLoans = dashboardData?.data?.totalActiveLoans || 0;
  const closedLoans = dashboardData?.data?.totalClosedLoans || 0;

  const data = [
    { name: "Active Loans", value: activeLoans },
    { name: "Closed Loans", value: closedLoans },
  ];

  const COLORS = ["#1E3A8A", "#93C5FD"];

  return (
    <div className="line-chart-box">
      <h2 className="chart-title">Active Loans vs Closed Loans</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonPieChart;
