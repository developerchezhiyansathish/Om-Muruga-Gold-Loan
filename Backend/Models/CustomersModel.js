import mongoose from "mongoose";
import Counter from "./Counter.js";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    customerId: { type: String, unique: true }, // Will be auto-generated
    phone: { type: String, required: true },
    aadhar: { type: String, required: true },
    pan: { type: String, required: true },
    occupation: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to auto-generate sequential customerId
customerSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { name: "customerId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      // Format like CUST001, CUST002, ...
      this.customerId = "CUST" + counter.seq.toString().padStart(3, "0");
    } catch (err) {
      return next(err);
    }
  }
  next();
});

const Customers = mongoose.model("customers", customerSchema);

export default Customers;
