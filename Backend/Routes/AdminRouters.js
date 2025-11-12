import express from "express";
import {
  adminLogin,
  createCustomer,
  createLoan,
  deleteCustomer,
  deleteLoan,
  emiCollections,
  emiPayments,
  getActiveLoans,
  getAllCustomers,
  getAllLoans,
  getClosedLoans,
  getCustomerById,
  getDashboardData,
  getLoanByCustomer,
  getLoanById,
  listEmiPaymentsById,
  loanGrowth,
  updateCustomer,
  updateLoan,
} from "../Controllers/AdminControls.js";
import isAuthenticated from "../Middlewares/isAuth.js";
import uploadImage from "../Middlewares/Multer.js";
import connectDB from "../Database/Database.js";

const router = express.Router();

//Connect DB only once per cold start
router.use(async (req, res, next) => {
  await connectDB();
  next();
});

//Health check route (for monitoring / faster cold start warm-up)
router.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Admin routes working fine" });
});

//Admin login
router.post("/admin/login", adminLogin);
//Customer Routes
router.post("/admin/create-customer", isAuthenticated, uploadImage.single("image"), createCustomer);
router.get("/admin/get-customers", isAuthenticated, getAllCustomers);
router.get("/admin/get-customer/:id", isAuthenticated, getCustomerById);
router.put("/admin/update-customer/:id", isAuthenticated, uploadImage.single("image"), updateCustomer);
router.delete("/admin/delete-customer/:id", isAuthenticated, deleteCustomer);
//Loan Routes
router.post("/admin/create-loan", isAuthenticated, uploadImage.single("ornamentsImage"), createLoan);
router.get("/admin/get-loans", isAuthenticated, getAllLoans);
router.get("/admin/get-loan/:id", isAuthenticated, getLoanById);
router.put("/admin/update-loan/:id", isAuthenticated, uploadImage.single("ornamentsImage"), updateLoan);
router.delete("/admin/delete-loan/:id", isAuthenticated, deleteLoan);
router.get("/admin/get-loan-by-customer/:id", isAuthenticated, getLoanByCustomer);
router.get("/admin/get-closed-loans", isAuthenticated, getClosedLoans);
router.get("/admin/get-active-loans", isAuthenticated, getActiveLoans);
//EMI Routes
router.post("/admin/emi-payments/:id", isAuthenticated, emiPayments);
router.get("/admin/list-emi-payments/:id", isAuthenticated, listEmiPaymentsById);
router.get("/admin/emi-collections", isAuthenticated, emiCollections);
//Dashboard + Analytics
router.get("/admin/get-dashboard-data", isAuthenticated, getDashboardData);
router.get("/admin/loan-growth", isAuthenticated, loanGrowth);

export default router;
