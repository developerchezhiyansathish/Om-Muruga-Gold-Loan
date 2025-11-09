import React, { use, useEffect, useState } from "react";
import "../../Css/Customers.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { GoPlusCircle } from "react-icons/go";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewCustomer } from "../../Redux/Actions/CustomerAction";
import Loader from "../../Layouts/Loader";

const CreateCustomerForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [occupation, setOccupation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const dispatch = useDispatch();

  const { loading, error, newCustomer } = useSelector(
    (state) => state.customerState
  );

  //Create CustomerID
  useEffect(() => {
    const customerList = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/admin/get-customers`,
          {
            headers: {
              Authorization: localStorage.getItem("OmMurugaLoginToken"),
            },
          }
        );
        setInitialValues(data.count);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    customerList();
  }, []);

  const customerID = `CUST${initialValues + 1}`;

  const customerData = {
    name: name,
    customerId: customerID,
    phone: phone,
    aadhar: aadhar,
    pan: pan,
    occupation: occupation,
    address: address,
    city: city,
    image: image,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createNewCustomer(customerData));
    setName("");
    setPhone("");
    setAadhar("");
    setPan("");
    setOccupation("");
    setAddress("");
    setCity("");
    setImage("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (newCustomer) {
      toast.success(newCustomer.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [newCustomer, error, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="customer-form-container">
            <h2>Add New Customer Details</h2>
            <form action="" className="customer-form" onSubmit={handleSubmit}>
              <TextField
                id="name"
                label="Customer Name"
                variant="outlined"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                id="phone"
                label="Phone Number"
                variant="outlined"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                id="aadhar"
                label="Aadhaar Number"
                variant="outlined"
                className="form-input"
                value={aadhar}
                onChange={(e) => setAadhar(e.target.value)}
              />
              <TextField
                id="pan"
                label="PAN Number"
                variant="outlined"
                className="form-input"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
              />
              <TextField
                id="occupation"
                label="Occupation"
                variant="outlined"
                className="form-input"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
              <TextField
                id="address"
                label="Address"
                variant="outlined"
                className="form-input"
                multiline
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                id="city"
                label="City"
                variant="outlined"
                className="form-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="file"
                name="image"
                id="image"
                className="form-input"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Button
                variant="contained"
                className="add-customer-btn"
                type="submit"
              >
                <GoPlusCircle /> Add Customer
              </Button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default CreateCustomerForm;
