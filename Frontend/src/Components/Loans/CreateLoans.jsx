import React, { useEffect, useState } from "react";
import "../../Css/Loans.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { GoPlusCircle } from "react-icons/go";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createLoan } from "../../Redux/Actions/LoanAction";
import axios from "axios";
import Loader from "../../Layouts/Loader";

const CreateLoans = () => {
  const [loanDate, setLoanDate] = useState("");
  const [loanDueDate, setLoanDueDate] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [emi, setEmi] = useState("");
  const [loanType, setLoanType] = useState("Gold Loan");
  const [ornamentsType, setOrnamentsType] = useState("");
  const [weight, setWeight] = useState("");
  const [ornamentsImage, setOrnamentsImage] = useState("");
  const [ornamentCount, setOrnamentCount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [dailyInterest, setDailyInterest] = useState("");
  const [loanDaysCount, setLoanDaysCount] = useState(0);
  const [initialValues, setInitialValues] = useState(0);

  const dispatch = useDispatch();
  const { singleCustomer } = useSelector((state) => state.customerState);
  const { newLoan, error, loading } = useSelector((state) => state.loanState);

  // Calculate EMI, daily interest, and total
  useEffect(() => {
    if (loanAmount && interestRate) {
      const interestRateDecimal = interestRate / 100;
      const interestPerAnnum = loanAmount * interestRateDecimal;
      const totalPay = Number(loanAmount) + interestPerAnnum;
      const monthlyEmi = totalPay / 12;
      const dayInterest = interestPerAnnum / 365;

      setEmi(monthlyEmi.toFixed(2));
      setDailyInterest(dayInterest.toFixed(2));
    } else {
      setEmi("");
      setDailyInterest("");
      setFinalAmount("");
    }
  }, [loanAmount, interestRate]);

  // Auto-update final amount based on days count
  useEffect(() => {
    const calculateFinalAmount = () => {
      if (loanAmount && dailyInterest && loanDate) {
        const daysPassed = Math.floor(
          (new Date() - new Date(loanDate)) / (1000 * 60 * 60 * 24)
        );
        setLoanDaysCount(daysPassed >= 0 ? daysPassed : 0);
        const total = Number(loanAmount) + Number(dailyInterest) * daysPassed;
        setFinalAmount(total.toFixed(2));
      }
    };

    calculateFinalAmount();

    // Recalculate automatically every 24 hours
    const interval = setInterval(() => {
      calculateFinalAmount();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loanAmount, dailyInterest, loanDate]);

  // Get total number of loans
  useEffect(() => {
    const getAllLoans = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/admin/get-loans`,
          {
            headers: {
              Authorization: localStorage.getItem("OmMurugaLoginToken"),
            },
          }
        );
        setInitialValues(data?.count || 0);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load loans");
      }
    };
    getAllLoans();
  }, []);

  const loanNumber = `LOAN${initialValues + 1}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!singleCustomer?.data?._id) {
      toast.error("Customer not selected!");
      return;
    }

    const customer = singleCustomer.data._id;
    const loanData = {
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
      ornamentsWeight: weight,
      ornamentsCount: ornamentCount,
      remarks,
      ornamentsImage,
      daysCount: loanDaysCount,
      status: "Active",
    };

    dispatch(createLoan(loanData));

    // Reset form after submission
    setLoanDate("");
    setLoanDueDate("");
    setLoanAmount("");
    setInterestRate("");
    setEmi("");
    setLoanType("Gold Loan");
    setOrnamentsType("");
    setWeight("");
    setOrnamentCount("");
    setOrnamentsImage("");
    setFinalAmount("");
    setLoanDaysCount(0);
    setRemarks("");
  };

  useEffect(() => {
    if (error) toast.error(error);
    if (newLoan) {
      toast.success(newLoan.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [newLoan, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="create-loans-container">
          <h2>Add New Loan Details</h2>

          <form className="create-loans-form" onSubmit={handleSubmit}>
            <TextField
              id="loanDate"
              label="Loan Date"
              type="date"
              variant="outlined"
              className="form-input"
              value={loanDate}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setLoanDate(e.target.value)}
              required
            />
            <TextField
              id="loanDueDate"
              label="Loan Due Date"
              type="date"
              variant="outlined"
              className="form-input"
              value={loanDueDate}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setLoanDueDate(e.target.value)}
              required
            />
            <TextField
              id="loanAmount"
              label="Loan Amount"
              type="number"
              variant="outlined"
              className="form-input"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              required
            />
            <TextField
              id="interestRate"
              label="Interest Rate (%)"
              type="number"
              variant="outlined"
              className="form-input"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
            <TextField
              id="emi"
              label="Monthly EMI (12 Months)"
              type="number"
              variant="outlined"
              className="form-input"
              value={emi || ""}
            />
            
            <TextField
              id="loanType"
              label="Loan Type"
              variant="outlined"
              className="form-input"
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              required
            />

            <FormControl fullWidth className="form-input">
              <InputLabel id="ornament-select-label">Ornaments</InputLabel>
              <Select
                labelId="ornament-select-label"
                id="ornament-select"
                label="Ornaments"
                value={ornamentsType}
                onChange={(e) => setOrnamentsType(e.target.value)}
                required
              >
                <MenuItem value="Gold Chain">Gold Chain</MenuItem>
                <MenuItem value="Gold Necklace">Gold Necklace</MenuItem>
                <MenuItem value="Gold Bangles">Gold Bangles</MenuItem>
                <MenuItem value="Gold Bracelet">Gold Bracelet</MenuItem>
                <MenuItem value="Gold Ring">Gold Ring</MenuItem>
                <MenuItem value="Gold Earrings">Gold Earrings</MenuItem>
                <MenuItem value="Gold Pendant">Gold Pendant</MenuItem>
                <MenuItem value="Gold Anklets">Gold Anklets</MenuItem>
                <MenuItem value="Gold Waist Belt (Oddiyanam)">
                  Gold Waist Belt (Oddiyanam)
                </MenuItem>
                <MenuItem value="Gold Nose Pin">Gold Nose Pin</MenuItem>
                <MenuItem value="Gold Studs">Gold Studs</MenuItem>
                <MenuItem value="Gold Coin">Gold Coin</MenuItem>
                <MenuItem value="Silver Articles">Silver Articles</MenuItem>
                <MenuItem value="Diamond Jewelry">Diamond Jewelry</MenuItem>
                <MenuItem value="Precious Stone Jewelry">
                  Precious Stone Jewelry
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="weight"
              label="Weight (grams)"
              type="number"
              variant="outlined"
              className="form-input"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />

            <TextField
              id="count"
              label="Ornaments Count"
              type="number"
              variant="outlined"
              className="form-input"
              value={ornamentCount}
              onChange={(e) => setOrnamentCount(e.target.value)}
              required
            />
            <TextField
              id="remarks"
              label="Remarks"
              type="text"
              variant="outlined"
              className="form-input"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required
            />

            <div className="file-upload">
              <label htmlFor="ornamentsImage">Upload Ornaments Image</label>
              <input
                type="file"
                id="ornamentsImage"
                name="ornamentsImage"
                onChange={(e) => setOrnamentsImage(e.target.files[0])}
              />
            </div>

            <Button
              variant="contained"
              className="loan-btn"
              type="submit"
              startIcon={<GoPlusCircle />}
            >
              Add Loan
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateLoans;
