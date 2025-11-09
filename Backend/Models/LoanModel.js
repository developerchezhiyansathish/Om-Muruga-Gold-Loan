import mongoose from "mongoose";
import Counter from "./Counter.js";

const loanSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    loanNumber: {
      type: String,
      required: true,
      unique: true,
    },
    loanDate: {
      type: Date,
      required: true,
    },
    loanDueDate: {
      type: Date,
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    emi: {
      type: Number,
      required: true,
    },
    loanDuration: {
      type: Number,
      required: true,
      default: 12, // default loan duration 12 months
    },
    loanType: {
      type: String,
      required: true,
    },
    ornamentsType: {
      type: String,
      required: true,
    },
    ornamentsWeight: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
    ornamentsCount: {
      type: Number,
      required: true,
    },
    ornamentsImage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
    payments: [
      {
        month: { type: Number, required: true },
        amountPaid: { type: Number, required: true },
        remainingAmount: { type: Number, required: true },
        status: {
          type: String,
          enum: ["Paid", "Pending"],
          default: "Paid",
        },
        paidAt: { type: Date, default: Date.now },
      },
    ],
    closedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Auto-generate Loan Number before saving
loanSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "loanNumber" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.loanNumber = "LOAN" + counter.seq.toString().padStart(3, "0");
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Helper Method: calculate total interest and EMI dynamically
loanSchema.methods.calculateLoanDetails = function (monthsUsed) {
  const monthlyRate = this.interestRate / 100;
  const totalInterest = this.loanAmount * monthlyRate * (monthsUsed / 12);
  const totalPayable = this.loanAmount + totalInterest;
  const emi = totalPayable / monthsUsed;
  return {
    totalInterest: totalInterest.toFixed(2),
    totalPayable: totalPayable.toFixed(2),
    emi: emi.toFixed(2),
  };
};

// Optional: when closing loan early or extending period
loanSchema.methods.closeLoan = async function (monthsUsed) {
  const { totalPayable } = this.calculateLoanDetails(monthsUsed);
  this.status = "Closed";
  this.closedAt = new Date();
  this.payments.push({
    month: monthsUsed,
    amountPaid: totalPayable,
    remainingAmount: 0,
    status: "Paid",
  });
  await this.save();
  return this;
};

const loans = mongoose.model("loans", loanSchema);

export default loans;
