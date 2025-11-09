import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const EMICollectionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const token = localStorage.getItem("OmMurugaLoginToken");
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/admin/emi-collections`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        setData(res.data);
      } catch (err) {
        console.error(
          "Error fetching EMI collections",
          err.response?.data || err.message
        );
      }
    };
    fetchCollections();
  }, []);

  return (
    <div className="line-chart-box">
      <h2 className="chart-title">EMI Collection (Month-wise)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            formatter={(value) => `₹ ${Number(value || 0).toLocaleString()}`}
          />
          <Legend />
          <Bar dataKey="collection" fill="#93aefd" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EMICollectionChart;
