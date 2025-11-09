import React, { useEffect, useState } from "react";
import "../../Css/Renewal.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Loader from "../../Layouts/Loader";
import { fetchActiveLoans } from "../../Redux/Actions/LoanAction";

const RenewalNotice = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedLoan, setSelectedLoan] = useState(null);

  const date = new Date();
  const dispatch = useDispatch();

  const { loading, error, activeLoans } = useSelector(
    (state) => state.loanState
  );

  // Handle error toast
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Fetch loans once on mount
  useEffect(() => {
    dispatch(fetchActiveLoans);
  }, []);

  const loanData = activeLoans?.data || [];

  // Get unique customers from loan list
  const uniqueCustomers = Array.from(
    new Map(
      loanData.map((loan) => [loan.customer?._id, loan.customer])
    ).values()
  );

  // Filter loans for selected customer
  const customerLoans = loanData.filter(
    (loan) => String(loan.customer?._id) === selectedCustomerId
  );

  const handleCustomerSelect = (id) => {
    setSelectedCustomerId(id);
    setSelectedLoan(null);
  };

  const handleLoanSelect = (loanId) => {
    const loan = customerLoans.find((l) => String(l._id) === loanId);
    setSelectedLoan(loan);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="renewal-page">
          <h2 className="title">புதுப்பிப்பு அறிவிப்பு</h2>

          {/* Customer Dropdown */}
          <select
            value={selectedCustomerId}
            onChange={(e) => handleCustomerSelect(e.target.value)}
          >
            <option value="">-- வாடிக்கையாளர் தேர்வு செய்யவும் --</option>
            {uniqueCustomers.map((c) => (
              <option key={c?._id} value={c?._id}>
                {c?.name} - {c?.customerId}
              </option>
            ))}
          </select>

          {selectedCustomerId && (
            <select
              onChange={(e) => handleLoanSelect(e.target.value)}
              value={selectedLoan?._id || ""}
            >
              <option value="">-- கடன் தேர்வு செய்யவும் --</option>
              {customerLoans.map((loan) => (
                <option key={loan._id} value={loan._id}>
                  {loan.loanNumber} - ₹{loan.loanAmount}
                </option>
              ))}
            </select>
          )}

          {selectedLoan && (
            <div id="notice-box" className="letter-box">
              <div className="heading-notice">
                <div className="h-left">
                  <h2>OM MURUGA GOLD LOAN</h2>
                  <p>No, 203, Main Road, Kilvelur, Nagapattinam - 611105</p>
                  <p>
                    Mobile: 9876543210 | Email: ommurugagoldfinance@gmail.com
                  </p>
                </div>
                <div className="h-right">
                  <h3>Renewal Notice</h3>
                </div>
              </div>
              <div className="content-space">
                <p className="ti-main">To,</p>
                <p>{selectedLoan.customer?.name}</p>
                <p>Customer ID: {selectedLoan.customer?.customerId}</p>
                <p>{selectedLoan.customer?.address}</p>
                <p>Aadhaar: {selectedLoan.customer?.aadhar}</p>
                <p>PAN: {selectedLoan.customer?.pan}</p>
                <p>Mobile: {selectedLoan.customer?.phone}</p>
                <br />

                <h3 className="ti-main">
                  <b>பொருள் :</b> வட்டி அடைக்க/தங்க நகைக்கடன் புதுப்பித்தல்
                </h3>
                <p>
                  <b>அறிவிப்பு :</b> தங்க ஆபரணங்களை அடகு வைத்து பெற்ற தங்க
                  நகைக்கடன் தொடர்பாக
                </p>

                <p style={{ marginTop: 20, marginBottom: 15 }}>
                  <b>அன்பார்ந்த வாடிக்கையாளர்,</b>
                </p>
                <p>
                  ஓம் முருகா கோல்ட் ஃபைனான்ஸ்-ல் தங்க நகைகளை அடகு வைத்து
                  எடுக்கப்பட்ட தங்க கடனை புதுப்பிக்க வேண்டிய காலம்
                  முடிவடைந்துள்ளதால் அவைகளை முடியுமுன் புதுப்பிக்குமாறு தங்களின்
                  தங்க நகைக்கடனை திருப்பிச் செலுத்தவோ அல்லது புதுப்பிக்கச்
                  செலுத்தவோ வேண்டியது என்மனதை இத்தால் முறைபடுத்தி தெரிவித்துக்
                  கொள்கிறோம்.
                </p>

                <table className="loan-table">
                  <thead>
                    <tr>
                      <th>Loan No</th>
                      <th>Pledge Date</th>
                      <th>Loan Amount</th>
                      <th>Interest Rate</th>
                      <th>EMI</th>
                      <th>Loan Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{selectedLoan.loanNumber}</td>
                      <td>
                        {new Date(selectedLoan.loanDate).toLocaleDateString()}
                      </td>
                      <td>{selectedLoan.loanAmount}</td>
                      <td>{selectedLoan.interestRate}%</td>
                      <td>{selectedLoan.emi}</td>
                      <td>
                        {new Date(
                          selectedLoan.loanDueDate
                        ).toLocaleDateString()}
                      </td>
                      <td>{selectedLoan.status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="signature-box">
                <p>
                  நன்றி, <br />
                  <b>Om Muruga Gold Loan</b>
                </p>

                <p>
                  Date: {date.toDateString()} <br /> Place: Kilvelur
                </p>

                <p>
                  Branch Manager,<br/>
                  Om Muruga Gold Loan
                </p>
              </div>
            </div>
          )}

          {selectedLoan && (
            <button className="print-btn" onClick={handlePrint}>
              🖨️ Print Notice
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default RenewalNotice;
