import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/Database.js";

//Configure
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

//PORT CONTROL
const port = process.env.PORT || 3000;

//Routes
import AdminRoutes from "./Routes/AdminRouters.js";
//Use Routes
app.use("/api/", AdminRoutes);

//Database Connection
connectDB();

app.listen(port, () => {
  console.log(`Server Running at Port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Backend is running...");
});
