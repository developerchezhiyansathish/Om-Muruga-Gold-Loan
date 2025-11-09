import jwt from "jsonwebtoken";
import fs from "fs";
import imagekit from "../Configs/ImageKit.js";
import customers from "../Models/CustomersModel.js";
import loans from "../Models/LoanModel.js";

//Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });
      return res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//**** Create Customer ****//
export const createCustomer = async (req, res) => {
  try {
    const { name, customerId, phone, aadhar, pan, occupation, address, city } =
      req.body;
    const imageFile = req.file;
    if (
      !name ||
      !customerId ||
      !phone ||
      !aadhar ||
      !pan ||
      !occupation ||
      !address ||
      !city ||
      !imageFile
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //**** imageKit Operation *****//

    //ImageKit Api
    const fileBuffer = fs.readFileSync(imageFile.path);

    //imageKit Url
    const imageKitUrl = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "Customers-Images",
    });

    //image Optimazation
    const imageOptimizedUrl = imagekit.url({
      path: imageKitUrl.filePath,
      transformation: [
        { width: "512px" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    const finalImage = imageOptimizedUrl;

    await customers.create({
      name,
      customerId,
      phone,
      aadhar,
      pan,
      occupation,
      address,
      city,
      image: finalImage,
    });
    return res.status(200).json({
      success: true,
      message: "Customer Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//**** Get All Customers ****//
export const getAllCustomers = async (req, res) => {
  try {
    const customersData = await customers.find().lean();

    const customersWithLoans = await Promise.all(
      customersData.map(async (customer) => {
        const loanData = await loans.find({ customer: customer._id }).lean();

        let loanCount = 0;
        let totalLoanAmount = 0;

        if (loanData && loanData.length > 0) {
          loanCount = loanData.length;
          totalLoanAmount = loanData.reduce(
            (sum, loan) => sum + (loan.loanAmount || 0),
            0
          );
        }

        return {
          ...customer,
          loanCount,
          totalLoanAmount,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: customersData.length,
      data: customersWithLoans,
      message: "Customers fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//*** Get Customers By ID ***/

export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customerData = await customers.findById(id).lean();

    if (!customerData) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Get loans for this customer
    const loanData = await loans.find({ customer: id }).lean();

    const loanCount = loanData.length;
    const totalLoanAmount = loanData.reduce(
      (sum, loan) => sum + (loan.loanAmount || 0),
      0
    );

    return res.status(200).json({
      success: true,
      data: {
        ...customerData,
        loans: loanData,
        loanCount,
        totalLoanAmount,
      },
      message: "Customer fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//** Update Customer **//

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    console.log(updates);

    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      const imageKitUrl = await imagekit.upload({
        file: fileBuffer,
        fileName: req.file.originalname,
        folder: "Customers-Images",
      });

      updates.image = imagekit.url({
        path: imageKitUrl.filePath,
        transformation: [
          { width: "512px" },
          { quality: "auto" },
          { format: "webp" },
        ],
      });
    }

    const customerData = await customers.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!customerData) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customerData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//**** Delete Customer ****//
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customerData = await customers.findByIdAndDelete(id);
    await loans.deleteMany({ customer: id });
    if (!customerData) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//**Loans Operations**//

//**** Create Loan ****//
export const createLoan = async (req, res) => {
  try {
    const {
      customer,
      loanNumber,
      loanDate,
      loanDueDate,
      loanAmount,
      finalAmount,
      interestRate,
      emi,
      loanType,
      ornamentsType,
      ornamentsWeight,
      remarks,
      ornamentsCount,
      status,
      payments,
      closedAt,
    } = req.body;
    const imageFile = req.file;

    if (
      !customer ||
      !loanNumber ||
      !loanDate ||
      !loanDueDate ||
      !loanAmount ||
      !interestRate ||
      !emi ||
      !loanType ||
      !finalAmount ||
      !ornamentsWeight||
      !remarks||
      !ornamentsCount||
      !ornamentsType ||
      !imageFile
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //**** imageKit Operation *****//

    //ImageKit Api
    const fileBuffer = fs.readFileSync(imageFile.path);
    //imageKit Url
    const imageKitUrl = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "Ornaments-Images",
    });
    //image Optimazation
    const imageOptimizedUrl = imagekit.url({
      path: imageKitUrl.filePath,
      transformation: [
        { width: "512px" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });
    const finalImage = imageOptimizedUrl;
    await loans.create({
      customer,
      loanNumber,
      loanDate,
      loanDueDate,
      loanAmount,
      finalAmount,
      interestRate,
      emi,
      loanType,
      ornamentsType,
      ornamentsWeight,
      remarks,
      ornamentsCount,
      ornamentsImage: finalImage,
      status,
      payments,
      closedAt,
    });
    return res.status(200).json({
      success: true,
      message: "Loan Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//*** Get All Loans **//

export const getAllLoans = async (req, res) => {
  try {
    const loansData = await loans.find().populate("customer");
    if (!loansData || loansData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No loans found",
      });
    }
    return res.status(200).json({
      success: true,
      count: loansData.length,
      data: loansData,
      message: "Loans fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//*** Get Loan By ID **//

export const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const loanData = await loans.findById(id).populate("customer");

    if (!loanData) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: loanData,
      message: "Loan fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//*** Update Loan **//

export const updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);
      const imagekitUrl = await imagekit.upload({
        file: fileBuffer,
        fileName: req.file.originalname,
        folder: "Ornaments-Images",
      });
      updates.ornamentsImage = imagekit.url({
        path: imagekitUrl.filePath,
        transformation: [
          { width: "512px" },
          { quality: "auto" },
          { format: "webp" },
        ],
      });
    }

    const loanData = await loans.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!loanData) {
      return res
        .status(404)
        .json({ success: false, message: "Loan not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Loan updated successfully",
      data: loanData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//*** Delete Loan **//

export const deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loanData = await loans.findByIdAndDelete(id);
    if (!loanData) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Loan deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/** Get Loan By Customers **/

export const getLoanByCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const loanData = await loans.find({ customer: id }).populate("customer");
    if (!loanData || loanData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }
    return res.status(200).json({
      success: true,
      count: loanData.length,
      data: loanData,
      message: "Loan fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//** Cloased Loans **//

export const getClosedLoans = async (req, res) => {
  try {
    const closedLoans = await loans
      .find({ status: "Closed" })
      .populate("customer");
    if (!closedLoans || closedLoans.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No closed loans found",
      });
    }
    return res.status(200).json({
      success: true,
      count: closedLoans.length,
      data: closedLoans,
      message: "Closed loans fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//**Active Loans **/

export const getActiveLoans = async (req, res) => {
  try {
    const activeLoans = await loans
      .find({ status: "Active" })
      .populate("customer");

    if (!activeLoans || activeLoans.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No active loans found",
      });
    }

    return res.status(200).json({
      success: true,
      count: activeLoans.length,
      data: activeLoans,
      message: "Active loans fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//**EMI Payments **//

export const emiPayments = async (req, res) => {
  try {
    const loanId = req.params.id;
    const { month, amountPaid } = req.body;

    const loan = await loans.findById(loanId);

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan Not Found",
      });
    }

    const totalPaid = loan.payments.reduce((acc, p) => acc + p.amountPaid, 0);
    let remainingAmount = loan.finalAmount - totalPaid - amountPaid;
    if (remainingAmount < 0) remainingAmount = 0;

    //push new Emi Payments
    loan.payments.push({
      month,
      amountPaid,
      remainingAmount,
      status: "Paid",
      paidAt: new Date(),
    });

    if (remainingAmount === 0) {
      loan.status = "Closed";
      loan.closedAt = new Date();
    }

    await loan.save();

    return res.status(200).json({
      success: true,
      message: "EMI Payment Added Successfully",
      data: loan,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ** List EMI Payments By ID ** //
export const listEmiPaymentsById = async (req, res) => {
  try {
    const loanId = req.params.id;
    const loan = await loans.findById(loanId).select("payments");

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan Not Found",
      });
    }

    const payments = loan.payments;

    return res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
      message: "EMI Payments fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/***Dashboard Data Routes ***/
export const getDashboardData = async (req, res) => {
  try {
    const totalCustomers = await customers.countDocuments();
    const totalLoans = await loans.countDocuments();
    const totalActiveLoans = await loans.countDocuments({ status: "Active" });
    const totalClosedLoans = await loans.countDocuments({ status: "Closed" });

    // Total Loan Amount
    const totalLoanAmountAgg = await loans.aggregate([
      { $group: { _id: null, total: { $sum: "$loanAmount" } } },
    ]);
    const totalLoanAmount = totalLoanAmountAgg[0]?.total || 0;

    // Total EMI Collections
    const totalEmiCollectionsAgg = await loans.aggregate([
      { $unwind: "$payments" },
      { $group: { _id: null, total: { $sum: "$payments.amountPaid" } } },
    ]);
    const totalEmiCollections = totalEmiCollectionsAgg[0]?.total || 0;

    // Month vs Loan Amount
    const loanAmountByMonth = await loans.aggregate([
      {
        $group: {
          _id: { $month: "$loanDate" },
          total: { $sum: "$loanAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Month vs EMI Payments (by paymentDate)
    const emiPaymentsByMonth = await loans.aggregate([
      { $unwind: "$payments" },
      {
        $group: {
          _id: { $month: "$payments.paymentDate" },
          total: { $sum: "$payments.amountPaid" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Recent Customers
    const recentCustomersData = await customers
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const recentCustomers = await Promise.all(
      recentCustomersData.map(async (customer) => {
        const loanData = await loans.find({ customer: customer._id }).lean();

        const loanCount = loanData.length;
        const totalLoanAmount = loanData.reduce(
          (sum, loan) => sum + (loan.loanAmount || 0),
          0
        );

        return {
          ...customer,
          loanCount,
          totalLoanAmount,
        };
      })
    );

    const omDashboardData = {
      totalCustomers,
      totalLoans,
      totalActiveLoans,
      totalClosedLoans,
      totalLoanAmount,
      totalEmiCollections,
      loanAmountByMonth,
      emiPaymentsByMonth,
      recentCustomers,
    };

    return res.status(200).json({
      success: true,
      data: omDashboardData,
      message: "Dashboard Data fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// EMI Collections Monthwise (from loans.payments)

export const emiCollections = async (req, res) => {
  try {
    const agg = await loans.aggregate([
      { $unwind: "$payments" },

      // Only consider payments with a valid paidAt date
      { $match: { "payments.paidAt": { $ne: null } } },

      // Group by year + month of paidAt
      {
        $group: {
          _id: {
            year: { $year: "$payments.paidAt" },
            month: { $month: "$payments.paidAt" },
          },
          totalCollection: { $sum: { $ifNull: ["$payments.amountPaid", 0] } },
        },
      },

      // Sort in chronological order
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (!agg || agg.length === 0) {
      return res.json([]);
    }

    // Create map for fast lookup
    const map = new Map();
    agg.forEach((item) => {
      const y = item._id.year;
      const m = item._id.month;
      const key = `${y}-${String(m).padStart(2, "0")}`;
      map.set(key, item.totalCollection);
    });

    // Fill missing months with 0
    const first = agg[0]._id;
    const last = agg[agg.length - 1]._id;
    let cursor = new Date(first.year, first.month - 1, 1);
    const end = new Date(last.year, last.month - 1, 1);

    const result = [];
    while (cursor <= end) {
      const y = cursor.getFullYear();
      const m = cursor.getMonth() + 1;
      const key = `${y}-${String(m).padStart(2, "0")}`;
      const label = `${monthNames[m - 1]} ${y}`;
      result.push({
        month: label,
        collection: map.get(key) || 0,
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching EMI collections:", error);
    res.status(500).json({ error: "Failed to fetch EMI collections" });
  }
};


//Loan growth

export const loanGrowth = async (req, res) => {
  try {
    const agg = await loans.aggregate([
      {
        $match: { loanDate: { $ne: null } } // Only valid dates
      },
      {
        $group: {
          _id: {
            year: { $year: "$loanDate" },
            month: { $month: "$loanDate" },
          },
          totalLoanAmount: { $sum: "$loanAmount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const monthNames = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    if (!agg || agg.length === 0) {
      return res.json([]);
    }

    // Map results
    const map = new Map();
    agg.forEach((item) => {
      const y = item._id.year;
      const m = item._id.month;
      const key = `${y}-${String(m).padStart(2, "0")}`;
      map.set(key, item.totalLoanAmount);
    });

    // Fill missing months with 0
    const first = agg[0]._id;
    const last = agg[agg.length - 1]._id;
    let cursor = new Date(first.year, first.month - 1, 1);
    const end = new Date(last.year, last.month - 1, 1);

    const result = [];
    while (cursor <= end) {
      const y = cursor.getFullYear();
      const m = cursor.getMonth() + 1;
      const key = `${y}-${String(m).padStart(2, "0")}`;
      result.push({
        month: `${monthNames[m - 1]} ${y}`,
        loanAmount: map.get(key) || 0,
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching Loan Growth:", error);
    res.status(500).json({ error: "Failed to fetch Loan Growth" });
  }
};
