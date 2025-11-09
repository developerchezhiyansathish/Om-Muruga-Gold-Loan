import React, { useEffect, useState } from "react";
import "../../Css/Dashboard.css";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const LoanGrowthChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLoanGrowth = async () => {
      try {
        const token = localStorage.getItem("OmMurugaLoginToken");
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/admin/loan-growth`,
          { headers: { Authorization: `${token}` } }
        );
        setData(res.data || []);
      } catch (err) {
        console.error(
          "Error fetching Loan Growth",
          err.response?.data || err.message
        );
      }
    };
    fetchLoanGrowth();
  }, []);

  return (
    <div className="line-chart-box">
      <h2 className="chart-title">Loan Amount Growth Over the Months</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            formatter={(value) =>
              `₹ ${Number(value || 0).toLocaleString("en-IN")}`
            }
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontFamily: "Outfit, sans-serif",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="loanAmount"
            stroke="#1e3a8a"
            strokeWidth={2}
            dot={{ r: 5, fill: "#BFCFFE" }}
            activeDot={{ r: 8, stroke: "#bfcffe", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoanGrowthChart;
