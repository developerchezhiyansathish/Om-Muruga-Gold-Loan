import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/Database.js";
import AdminRoutes from "./Routes/AdminRouters.js";

// Environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());

// CORS
app.use(
  cors({
    origin: ["https://www.ommurugagoldloan.in", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB
connectDB();

// Routes
app.use("/api", AdminRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Om Muruga Gold Loan Backend is Running...");
});

// Port control
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
