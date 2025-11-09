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
import { updateSingleLoan } from "../../Redux/Actions/LoanAction";
import Loader from "../../Layouts/Loader";
import { useNavigate } from "react-router-dom";

const UpdateLoanData = () => {
  const [loanDate, setLoanDate] = useState("");
  const [loanDueDate, setLoanDueDate] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [emi, setEmi] = useState("");
  const [loanType, setLoanType] = useState("Gold Loan");
  const [ornamentsType, setOrnamentsType] = useState("");
  const [ornamentsImage, setOrnamentsImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleLoan, loading, error, updateLoan } = useSelector(
    (state) => state.loanState
  );

  const defaultValues = singleLoan?.data;
  const id = defaultValues?._id;
  const defaultLoanNumber = defaultValues?.loanNumber;

  // Prefill values when singleLoan loads
  useEffect(() => {
    if (defaultValues) {
      setLoanDate(
        defaultValues.loanDate ? defaultValues.loanDate.split("T")[0] : ""
      );
      setLoanDueDate(
        defaultValues.loanDueDate ? defaultValues.loanDueDate.split("T")[0] : ""
      );
      setLoanAmount(defaultValues.loanAmount || "");
      setInterestRate(defaultValues.interestRate || "");
      setEmi(defaultValues.emi || "");
      setLoanType(defaultValues.loanType || "Gold Loan");
      setOrnamentsType(defaultValues.ornamentsType || "");
      setOrnamentsImage(defaultValues.ornamentsImage || "");
    }
  }, [defaultValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const customer = defaultValues?.customer?._id;

    const loanData = {
      loanId: id,
      customer,
      loanNumber: defaultLoanNumber,
      loanDate,
      loanDueDate,
      loanAmount,
      interestRate,
      emi,
      loanType,
      ornamentsType,
      ornamentsImage,
      status: "Active",
    };

    dispatch(updateSingleLoan(id, loanData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (updateLoan && updateLoan?.success === true) {
      toast.success(updateLoan?.message);
      setTimeout(() => {
       window.location.reload();
      }, 1000);
    }
  }, [updateLoan, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="create-loans-container">
          <h2>Update Loan Details</h2>
          <form className="create-loans-form" onSubmit={handleSubmit}>
            <TextField
              id="loanDate"
              label="Loan Date"
              type="date"
              variant="outlined"
              className="form-input"
              value={loanDate}
              onChange={(e) => setLoanDate(e.target.value)}
              slotProps={{
                inputLabel: { shrink: true },
              }}
              required
            />
            <TextField
              id="loanDueDate"
              label="Loan Due Date"
              type="date"
              variant="outlined"
              className="form-input"
              value={loanDueDate}
              onChange={(e) => setLoanDueDate(e.target.value)}
              slotProps={{
                inputLabel: { shrink: true },
              }}
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
              label="Monthly EMI"
              type="number"
              variant="outlined"
              className="form-input"
              value={emi}
              onChange={(e) => setEmi(e.target.value)}
              required
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
              Update Loan
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateLoanData;
