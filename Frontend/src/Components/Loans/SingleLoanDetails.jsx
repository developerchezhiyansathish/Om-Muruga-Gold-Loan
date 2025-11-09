import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineEdit } from "react-icons/ai";
import { IoPrintOutline } from "react-icons/io5";
import { LuCircleFadingPlus } from "react-icons/lu";
import "../../Css/SingleLoan.css";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleLoan,
  fetchSingleLoan,
  submitEmiPayments,
} from "../../Redux/Actions/LoanAction";
import Loader from "../../Layouts/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import UpdateLoanModel from "./UpdateLoanModel";
import toast from "react-hot-toast";
import closeTag from "/public/images/close.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const SingleLoanDetails = () => {
  const [openloanModal, setOpenloanModal] = useState(false);
  const [month, setMonth] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [monthsUsed, setMonthsUsed] = useState("");
  const [totalPayable, setTotalPayable] = useState("");
  const [updatedEmi, setUpdatedEmi] = useState("");

  const handleOpenloan = () => setOpenloanModal(true);
  const handleCloseloan = () => setOpenloanModal(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, singleLoan, deleteLoan, emiPayment } = useSelector(
    (state) => state.loanState
  );
  const { id } = useParams();
  const loanData = singleLoan?.data;
  const emiPayments = loanData?.payments || [];

  // Total EMI paid so far
  const totalEmiPayments = emiPayments?.reduce(
    (total, payment) => total + payment.amountPaid,
    0
  );

  // Loan calculations
  const loanSanctionAmount = loanData?.loanAmount || 0;
  const sanctionInterestRate = loanData?.interestRate || 0;
  const interestRateDecimal = sanctionInterestRate / 100;
  const interestPerAnnum = loanSanctionAmount * interestRateDecimal;
  const interestPerDay = interestPerAnnum / 365;

  // Days since loan date
  const loanDateCount = loanData?.loanDate
    ? Math.floor(
        (new Date() - new Date(loanData.loanDate)) / (1000 * 60 * 60 * 24)
      )
    : 0;

  const totalVatti = interestPerDay * loanDateCount;

  // Total payable including day interest
  const totalLoanAmountWithInterest = loanSanctionAmount + totalVatti;

  // Remaining balance after EMI payments
  const remainingAmount =
    totalLoanAmountWithInterest - totalEmiPayments > 0
      ? (totalLoanAmountWithInterest - totalEmiPayments).toFixed(2)
      : 0;

  useEffect(() => {
    if (error) toast.error(error);
    dispatch(fetchSingleLoan(id));
  }, [dispatch, id, error]);

  useEffect(() => {
    if (loanData && monthsUsed) {
      const monthlyRate = loanData.interestRate / 100;
      const totalInterest =
        loanData.loanAmount * monthlyRate * (monthsUsed / 12);
      const total = loanData.loanAmount + totalInterest;
      const emi = total / monthsUsed;

      setTotalPayable(total.toFixed(2));
      setUpdatedEmi(emi.toFixed(2));
    } else {
      setTotalPayable("");
      setUpdatedEmi("");
    }
  }, [monthsUsed, loanData]);

  const emiData = { month, amountPaid, remainingAmount };
  const thisId = loanData?._id;

  const handleEmiSubmit = (e) => {
    e.preventDefault();
    if (!month || !amountPaid) {
      toast.error("Please fill all EMI fields");
      return;
    }
    dispatch(submitEmiPayments(thisId, emiData));
    setMonth("");
    setAmountPaid("");
  };

  useEffect(() => {
    if (emiPayment?.success) {
      toast.success(emiPayment.message);
      setTimeout(() => window.location.reload(), 1500);
    } else if (emiPayment?.error) toast.error(emiPayment.error);
  }, [emiPayment]);

  const emiColumns = [
    { field: "no", headerName: "#", width: 70 },
    { field: "month", headerName: "Month", width: 120 },
    { field: "amountPaid", headerName: "Amount Paid", width: 150 },
    { field: "remainingAmount", headerName: "Remaining", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span
          style={{
            color: params.value === "Paid" ? "green" : "orange",
            fontWeight: "600",
          }}
        >
          {params.value}
        </span>
      ),
    },
    { field: "paidAt", headerName: "Paid At", width: 200 },
  ];

  const emiRows = emiPayments?.map((payment, index) => ({
    id: payment._id,
    no: index + 1,
    month: payment.month,
    amountPaid: `₹ ${payment.amountPaid}`,
    remainingAmount: `₹ ${payment.remainingAmount.toFixed(2)}`,
    status: payment.status,
    paidAt: payment.paidAt
      ? new Date(payment.paidAt).toLocaleDateString("en-GB")
      : "-",
  }));




  // ================= PDF GENERATORS ================= //

  // Common PDF Header
  const pdfHeader = (doc, title) => {
    doc.setFontSize(14);
    doc.width= "100%"
    doc.setFont("helvetica", "bold");
    doc.text("OM MURUGA GOLD LOAN", 14, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("No. 203, Main Road, Kilvelur, Nagapattinam - 611105", 14, 26);
    doc.text("Mobile: 9876543210 | Email: ommurugagoldfinance@gmail.com", 14, 31);
    doc.line(14, 34, 280, 34);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(title, 130, 42, null, null, "center");
  };

  // EMI Voucher PDF
  const generateEMIVoucher = (payment) => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    pdfHeader(doc, "INTEREST & PART AMOUNT PAID VOUCHER");

    const tableData = [
      [
        { content: "Date", styles: { fontStyle: "bold" } },
        new Date().toLocaleDateString("en-GB"),
        { content: "Loan Number", styles: { fontStyle: "bold" } },
        loanData?.loanNumber,
      ],
      [
        { content: "Customer Name", styles: { fontStyle: "bold" } },
        loanData?.customer?.name,
        { content: "Loan Amount", styles: { fontStyle: "bold" } },
        `Rs. ${loanData?.loanAmount}`,
      ],
      [
        { content: "EMI Paid", styles: { fontStyle: "bold" } },
        `Rs. ${payment.amountPaid}`,
        { content: "Remaining Balance", styles: { fontStyle: "bold" } },
        `Rs. ${payment.remainingAmount.toFixed(2)}`,
      ],
    ];

    autoTable(doc, {
      startY: 48,
      head: [["Field", "Details", "Field", "Details"]],
      body: tableData,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: {
        fillColor: [255, 204, 0],
        textColor: 0,
        halign: "center",
        fontStyle: "bold",
      },
      theme: "grid",
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 70 },
        2: { cellWidth: 40 },
        3: { cellWidth: 70 },
      },
    });

    doc.save(`EMI_${loanData?.loanNumber}_Month_${payment.month}.pdf`);
  };

  // Loan Closure Voucher PDF
  const generateCloseVoucher = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    pdfHeader(doc, "LOAN CLOSURE VOUCHER");

    const tableData = [
      [
        { content: "Date", styles: { fontStyle: "bold" } },
        new Date().toLocaleDateString("en-GB"),
        { content: "Loan Number", styles: { fontStyle: "bold" } },
        loanData?.loanNumber,
      ],
      [
        { content: "Customer Name", styles: { fontStyle: "bold" } },
        loanData?.customer?.name,
        { content: "Ornaments Type & Count", styles: { fontStyle: "bold" } },
        loanData?.ornamentsType + " - " + loanData?.ornamentsCount,
      ],
      [
        { content: "Total Loan (With Interest)", styles: { fontStyle: "bold" } },
        `Rs. ${totalLoanAmountWithInterest.toFixed(2)}`,
        { content: "Total Paid", styles: { fontStyle: "bold" } },
        `Rs. ${totalEmiPayments.toFixed(2)}`,
      ],
      [
        { content: "Service Fees", styles: { fontStyle: "bold" } },
        "Rs. 20.00",
        { content: "Status", styles: { fontStyle: "bold" } },
        "Loan Closed Successfully",
      ],
    ];

    autoTable(doc, {
      startY: 48,
      head: [["Field", "Details", "Field", "Details"]],
      body: tableData,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: {
        fillColor: [255, 204, 0],
        textColor: 0,
        halign: "center",
        fontStyle: "bold",
      },
      theme: "grid",
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 70 },
        2: { cellWidth: 40 },
        3: { cellWidth: 70 },
      },
    });

    // Add closing statement + signature lines
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.text(
      "This loan has been fully cleared and closed. Customer acknowledges the receipt of pledged ornaments.",
      14,
      finalY
    );
    finalY += 8;
    doc.text("Customer Signature: _______________________", 14, finalY);
    doc.text("Authorized Signatory: _______________________", 160, finalY);

    doc.save(`CLOSE_${loanData?.loanNumber}.pdf`);
  };

  const pagePrint = () => {
    navigate(`/loan/${loanData?._id}/pdf`, { state: { loanData } });
  };

  const handleDeleteLoan = (id) => {
    if (window.confirm("Are you sure you want to delete this loan?")) {
      dispatch(deleteSingleLoan(id));
      if (deleteLoan?.success) toast.success(deleteLoan?.message);
      setTimeout(() => navigate("/loans"), 1000);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="loan-page" id="loan-page">
          {/* Header */}
          <div className="header">
            <div className="header-left">
              <img
                src={loanData?.customer?.image}
                alt="customer"
                className="loan-img"
              />
              <div>
                <h2 className="loan-title">Loan NO - {loanData?.loanNumber}</h2>
                <p className="sub-title">Customer: {loanData?.customer?.name}</p>
                <span
                  className={`status ${
                    loanData?.status === "Active" ? "active" : "closed"
                  }`}
                >
                  {loanData?.status}
                </span>
              </div>
            </div>
            <div className="header-right">
              <button className="add-loan-btn" onClick={pagePrint}>
                <IoPrintOutline /> Print
              </button>
              {remainingAmount <= 0 && (
                <button className="add-loan-btn" onClick={generateCloseVoucher}>
                  🧾 Close Voucher
                </button>
              )}
              <button className="edit-btn" onClick={handleOpenloan}>
                <AiOutlineEdit /> Edit Loan
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteLoan(loanData?._id)}
              >
                <RiDeleteBin6Line /> Delete Loan
              </button>
            </div>
          </div>

          {/* Loan Info */}
          <div className="loan-info-box" id="loan-info">
            <div className="card loan-details">
              <h3>Loan Information</h3>
              <div className="info-grid">
                <div className="info-bx">
                  <h6>Loan Amount</h6>
                  <p>₹ {loanData?.loanAmount}</p>
                </div>
                <div className="info-bx">
                  <h6>Interest Rate</h6>
                  <p>{loanData?.interestRate}%</p>
                </div>
                <div className="info-bx">
                  <h6>EMI</h6>
                  <p>₹ {loanData?.emi}</p>
                </div>
                <div className="info-bx">
                  <h6>Loan Date</h6>
                  <p>
                    {new Date(loanData?.loanDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="info-bx">
                  <h6>Due Date</h6>
                  <p>
                    {new Date(loanData?.loanDueDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="info-bx">
                  <h6>Loan Type</h6>
                  <p>{loanData?.loanType}</p>
                </div>
                <div className="info-bx">
                  <h6>Ornaments Type</h6>
                  <p>{loanData?.ornamentsType}</p>
                </div>
                <div className="info-bx">
                  <h6>Weight</h6>
                  <p>{loanData?.ornamentsWeight} Grams</p>
                </div>
                <div className="info-bx">
                  <h6>Ornaments Count</h6>
                  <p>{loanData?.ornamentsCount}</p>
                </div>
                <div className="info-bx">
                  <h6>Interest Per Day</h6>
                  <p>₹ {interestPerDay.toFixed(2)}</p>
                </div>
                <div className="info-bx">
                  <h6>Days Count</h6>
                  <p>{loanDateCount} Days</p>
                </div>
                <div className="info-bx">
                  <h6>Total Interest</h6>
                  <p>₹ {totalVatti.toFixed(2)}</p>
                </div>
                <div className="info-bx">
                  <h6>Remarks</h6>
                  <p>{loanData?.remarks}</p>
                </div>
              </div>
            </div>

            {/* Ornaments */}
            <div className="Ornaments-image-box">
              <h3>Ornaments</h3>
              <img src={loanData?.ornamentsImage} alt="ornamentsImage" />
            </div>

            {/* Summary */}
            <div className="card loan-summary">
              <h3>Summary</h3>
              <div className="summary-box">
                <h6>Total Paid</h6>
                <p>₹ {totalEmiPayments.toFixed(2)}</p>
              </div>
              <div className="summary-box">
                <h6>Remaining</h6>
                <p>
                  {remainingAmount <= 0 ? (
                    <div className="header-right">
                      <p className="loan-info-title">
                        Payments Cleared, Loan Closed
                      </p>
                      <div className="close-img-box">
                        <img src={closeTag} alt="close tag" />
                      </div>
                    </div>
                  ) : (
                    `₹ ${remainingAmount}`
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* EMI Payments */}
          <div className="card emi-history">
            <h3>EMI Payments</h3>
            <div className="emi-add-from">
              <form className="emi-form" onSubmit={handleEmiSubmit}>
                <div className="form-input-box">
                  <TextField
                    id="month"
                    label="Paid Month"
                    variant="outlined"
                    className="form-input"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    disabled={remainingAmount <= 0}
                  />
                  <TextField
                    id="emiamount"
                    label="EMI Amount"
                    variant="outlined"
                    className="form-input"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    disabled={remainingAmount <= 0}
                  />
                </div>
                <button
                  className="add-btn"
                  type="submit"
                  disabled={remainingAmount <= 0}
                >
                  <LuCircleFadingPlus /> Add EMI
                </button>
              </form>
            </div>

            <div style={{ width: "100%" }}>
              <DataGrid
                rows={emiRows}
                columns={[
                  ...emiColumns,
                  {
                    field: "voucher",
                    headerName: "Voucher",
                    width: 150,
                    renderCell: (params) => (
                      <button
                        className="voucher-btn"
                        onClick={() =>
                          generateEMIVoucher(emiPayments[params.row.no - 1])
                        }
                      >
                        Download PDF
                      </button>
                    ),
                  },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </div>
          </div>

          <UpdateLoanModel open={openloanModal} handleClose={handleCloseloan} />
        </div>
      )}
    </>
  );
};

export default SingleLoanDetails;
