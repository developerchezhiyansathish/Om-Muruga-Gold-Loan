import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../Css/SingleLoan.css";

const SingleLoanPDF = () => {
  const location = useLocation();
  const loanData = location?.state?.loanData;

  const date = new Date();

  useEffect(() => {
    // Auto open print dialog when PDF page loads
    setTimeout(() => {
      window.print();
    }, 500);
  }, []);

  if (!loanData) {
    return <p>No loan data found</p>;
  }

  return (
    <div className="loan-page pdf-print" id="loan-page">
      {/* ---------- FRONT SIDE ---------- */}
      <div className="print-front-side">
        {/* Header */}
        <div className="heading-notice">
          <div className="h-left">
            <h2>OM MURUGA GOLD LOAN</h2>
            <p>No, 203, Main Road, Kilvelur, Nagapattinam - 611105</p>
            <p>Mobile: 9876543210 | Email: ommurugagoldfinance@gmail.com</p>
            <p>
              Date: {date.toDateString()} <br /> Place: Kilvelur
            </p>
            <h3>Loan Sanction Letter(Customer Copy)</h3>
          </div>
          <div className="h-right"></div>
        </div>

        {/* Loan Info */}
        <div className="pdf-page-loan-container">
          <div className="customer-info-box">
            <div className="cus-image-box">
              <img src={loanData?.customer?.image} alt="customer" />
            </div>
            <div className="cus-basic-info-box">
              <div className="main-info-box">
                <p>
                  <b>Customer Name:</b> {loanData?.customer?.name}
                </p>
                <p>
                  <b>Customer ID:</b> {loanData?.customer?.customerId}
                </p>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Mobile</th>
                    <th>Aadhaar</th>
                    <th>PAN</th>
                    <th>Occupation</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{loanData?.customer?.phone}</td>
                    <td>{loanData?.customer?.aadhar}</td>
                    <td>{loanData?.customer?.pan}</td>
                    <td>{loanData?.customer?.occupation}</td>
                    <td>{loanData?.customer?.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="cus-loan-info-box">
            <div className="cus-loan-info-table">
              <div className="main-info-box">
                <p>
                  <b>Loan No:</b> {loanData?.loanNumber}
                </p>
                <p>
                  <b>Loan Amount:</b>
                  {loanData?.loanAmount}
                </p>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Loan Date</th>
                    <th>Loan Type</th>
                    <th>Ornaments Name</th>
                    <th>Ornaments Count</th>
                    <th>Ornaments Weight</th>
                    <th>Interest Rate</th>
                    <th>Loan Due Date</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {new Date(loanData?.loanDate).toLocaleDateString("en-GB")}
                    </td>
                    <td>{loanData?.loanType}</td>
                    <td>{loanData?.ornamentsType}</td>
                    <td>{loanData?.ornamentsCount}</td>
                    <td>{loanData?.ornamentsWeight} grams</td>
                    <td>{loanData?.interestRate}%</td>
                    <td>
                      {new Date(loanData?.loanDueDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td>{loanData?.remarks}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="cus-loan-info-box">
            <h4 className="loan-info-title-sp">Monthly Interest</h4>
            <div className="ornaments-image-box">
              <img src={loanData?.ornamentsImage} alt="ornaments" />
            </div>
          </div>

          <div className="important-note">
            <h4>Loan Declaration:</h4>
            <ol>
              <li>
                I have fully understood the terms and conditions relating to the
                loan and I have received the loan amount.
              </li>
              <li>
                On demand, I promise to pay Om Muruga Gold Loan. Or order the
                sum of Rs. {loanData?.loanAmount} only for value received along
                with interest per annum at the rate mentioned above with monthly
                interest from this day till the date of repayment in full.
              </li>
              <li>
                I solemnly declare that the ornaments pledged are of 22cts and I
                am the owner of the same and that nobody other than me has any
                rival claim against me in respect of ownership and possession of
                the gold pledged.
              </li>
            </ol>
          </div>

          <div className="company-acc-ment-part">
            <div className="signature-box">
              <p>
                Thank You, <br />
                <b>Om Muruga Gold Loan</b>
              </p>

              <p>Customer Signature</p>

              <p>
                Branch Manager,
                <br />
                Om Muruga Gold Loan
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- BACK SIDE ---------- */}
      <div className="print-back-side">
        <div className="content-info-box">
          <div className="title">அலுவலகம் நேரம்</div>
          <div className="subtitle">காலை 9.00 மணி முதல் இரவு 8.00 மணி வரை</div>

          <p>
            <strong>பிரதி ஞாயிறு - முக்கிய பண்டிகைகளுக்கும் விடுமுறை</strong>
          </p>

          <div className="section-title">விதிமுறைகள்</div>

          <ol className="rules">
            <li>
              சென்னை அடகு பிடிப்பவர் சட்ட விதிகளுக்கும் நிபந்தனைகளுக்கும்
              உட்பட்டு இந்த அடகு பிடிக்கப்பட்டுள்ளது.
            </li>
            <li>
              அடகு வைத்த பொருட்களை அடகு வைத்த தேதியிலிருந்து 1 வருடம் 7 நாள்
              தவணைக்குள் மீட்கப்படாவிட்டால் பகிரங்க ஏலம் விடப்படும்.
            </li>
            <li>விலாசம் மாறுதல் இருந்தால் உடனே தெரிவிக்கவும்.</li>
            <li>மூன்று மாதத்திற்கு ஒரு முறை வட்டி செலுத்த வேண்டும்.</li>
            <li>ரசீது காணாமல் போனால் உடனே தெரிவிக்கவும்.</li>
            <li>
              மேலே கண்டுள்ள அனைத்து நிபந்தனைக்கும் உட்பட்டும் அதற்குமேல் இந்த
              நகைகளுக்கு உரிமை கோரமாட்டேன் எனவும் உறுதியளித்து இந்த ரசீதை
              பெற்றுகொண்டேன்.
            </li>
          </ol>
          <div className="signature-box sn-signature">
            <div className="sign-grup">
              <h3>At the time of Gold Loan Closing</h3>
              <p>Customer Signature</p>
            </div>
          </div>
        </div>

        <div className="monthly-payment-details-table">
          <div className="table-container">
            <div className="head-table">
              <h2>Loan Amount : ₹{loanData?.loanAmount}</h2>
              <h2>EMI : ₹{loanData?.emi}</h2>
              <h2>Loan Duration : {loanData?.loanDuration} Months</h2>
            </div>
            <table className="loan-table">
              <th>Sl.NO</th>
              <th>Month</th>
              <th>Interest</th>
              <th>Principal</th>
              <th>Loan OutStanding</th>
              <th>Remarks</th>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>JAN</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>FEB</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>MAR</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>APRIL</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>MAY</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>JUNE</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>JULY</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>AUG</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>SEP</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>OCT</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>NOV</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>DEC</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ---------- FRONT SIDE ---------- */}
      <div className="print-front-side ">
        {/* Header */}
        <div className="heading-notice">
          <div className="h-left">
            <h2>OM MURUGA GOLD LOAN</h2>
            <p>No, 203, Main Road, Kilvelur, Nagapattinam - 611105</p>
            <p>Mobile: 9876543210 | Email: ommurugagoldfinance@gmail.com</p>
            <p>
              Date: {date.toDateString()} <br /> Place: Kilvelur
            </p>
            <h3>Loan Sanction Letter(Customer Copy)</h3>
          </div>
          <div className="h-right"></div>
        </div>

        {/* Loan Info */}
        <div className="pdf-page-loan-container">
          <div className="customer-info-box">
            <div className="cus-image-box">
              <img src={loanData?.customer?.image} alt="customer" />
            </div>
            <div className="cus-basic-info-box">
              <div className="main-info-box">
                <p>
                  <b>Customer Name:</b> {loanData?.customer?.name}
                </p>
                <p>
                  <b>Customer ID:</b> {loanData?.customer?.customerId}
                </p>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Mobile</th>
                    <th>Aadhaar</th>
                    <th>PAN</th>
                    <th>Occupation</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{loanData?.customer?.phone}</td>
                    <td>{loanData?.customer?.aadhar}</td>
                    <td>{loanData?.customer?.pan}</td>
                    <td>{loanData?.customer?.occupation}</td>
                    <td>{loanData?.customer?.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="cus-loan-info-box">
            <div className="cus-loan-info-table">
              <div className="main-info-box">
                <p>
                  <b>Loan No:</b> {loanData?.loanNumber}
                </p>
                <p>
                  <b>Loan Amount:</b>
                  {loanData?.loanAmount}
                </p>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Loan Date</th>
                    <th>Loan Type</th>
                    <th>Ornaments Name</th>
                    <th>Ornaments Count</th>
                    <th>Ornaments Weight</th>
                    <th>Interest Rate</th>
                    <th>Loan Due Date</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {new Date(loanData?.loanDate).toLocaleDateString("en-GB")}
                    </td>
                    <td>{loanData?.loanType}</td>
                    <td>{loanData?.ornamentsType}</td>
                    <td>{loanData?.ornamentsCount}</td>
                    <td>{loanData?.ornamentsWeight} grams</td>
                    <td>{loanData?.interestRate}%</td>
                    <td>
                      {new Date(loanData?.loanDueDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td>{loanData?.remarks}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="cus-loan-info-box">
            <h4 className="loan-info-title-sp">Monthly Interest</h4>
            <div className="ornaments-image-box">
              <img src={loanData?.ornamentsImage} alt="ornaments" />
            </div>
          </div>
          <div className="important-note">
            <h4>Loan Declaration:</h4>
            <ol>
              <li>
                I have fully understood the terms and conditions relating to the
                loan and I have received the loan amount.
              </li>
              <li>
                On demand, I promise to pay Om Muruga Gold Loan. Or order the
                sum of Rs. {loanData?.loanAmount} only for value received along
                with interest per annum at the rate mentioned above with monthly
                interest from this day till the date of repayment in full.
              </li>
              <li>
                I solemnly declare that yhe ornaments pledged are of 22cts and I
                am the owner of the same and that nobody other than me has any
                rival claim against me in respect of ownership and possession of
                the gold pledged.
              </li>
            </ol>
          </div>

          <div className="company-acc-ment-part">
            <div className="signature-box">
              <p>
                Thank you, <br />
                <b>Om Muruga Gold Loan</b>
              </p>

              <p>Customer Signature</p>

              <p>
                Branch Manager,
                <br />
                Om Muruga Gold Loan
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="print-back-side">
        <div className="content-info-box">
          <div className="title">அலுவலகம் நேரம்</div>
          <div className="subtitle">காலை 9.00 மணி முதல் இரவு 8.00 மணி வரை</div>

          <p>
            <strong>பிரதி ஞாயிறு - முக்கிய பண்டிகைகளுக்கும் விடுமுறை</strong>
          </p>

          <div className="section-title">விதிமுறைகள்</div>

          <ol className="rules">
            <li>
              சென்னை அடகு பிடிப்பவர் சட்ட விதிகளுக்கும் நிபந்தனைகளுக்கும்
              உட்பட்டு இந்த அடகு பிடிக்கப்பட்டுள்ளது.
            </li>
            <li>
              அடகு வைத்த பொருட்களை அடகு வைத்த தேதியிலிருந்து 1 வருடம் 7 நாள்
              தவணைக்குள் மீட்கப்படாவிட்டால் பகிரங்க ஏலம் விடப்படும்.
            </li>
            <li>விலாசம் மாறுதல் இருந்தால் உடனே தெரிவிக்கவும்.</li>
            <li>மூன்று மாதத்திற்கு ஒரு முறை வட்டி செலுத்த வேண்டும்.</li>
            <li>ரசீது காணாமல் போனால் உடனே தெரிவிக்கவும்.</li>
            <li>
              மேலே கண்டுள்ள அனைத்து நிபந்தனைக்கும் உட்பட்டும் அதற்குமேல் இந்த
              நகைகளுக்கு உரிமை கோரமாட்டேன் எனவும் உறுதியளித்து இந்த ரசீதை
              பெற்றுகொண்டேன்.
            </li>
          </ol>
          <div className="signature-box sn-signature">
            <div className="sign-grup">
              <h3>At the time of Gold Loan Closing</h3>
              <p>Customer Signature</p>
            </div>
          </div>
        </div>

        <div className="monthly-payment-details-table">
          <div className="table-container">
            <div className="head-table">
              <h2>Loan Amount : ₹{loanData?.loanAmount}</h2>
              <h2>EMI : ₹{loanData?.emi}</h2>
              <h2>Loan Duration : {loanData?.loanDuration} Months</h2>
            </div>
            <table className="loan-table">
              <th>Sl.NO</th>
              <th>Month</th>
              <th>Interest</th>
              <th>Principal</th>
              <th>Loan OutStanding</th>
              <th>Remarks</th>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>JAN</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>FEB</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>MAR</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>APRIL</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>MAY</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>JUNE</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>JULY</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>AUG</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>SEP</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>OCT</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>NOV</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>DEC</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleLoanPDF;
