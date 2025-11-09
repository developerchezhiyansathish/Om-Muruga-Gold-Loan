import React, { useEffect, useState } from "react";
import "../../Css/Customers.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { GoPlusCircle } from "react-icons/go";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateSingleCustomer } from "../../Redux/Actions/CustomerAction";
import Loader from "../../Layouts/Loader";

const UpdateCustomerData = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [pan, setPan] = useState("");
  const [occupation, setOccupation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const { loading, error, singleCustomer, updateCustomer } = useSelector(
    (state) => state.customerState
  );

  const defaultValues = singleCustomer?.data;
  const customerID = defaultValues?.customerId;
  const id = defaultValues?._id;

  // Prefill the state values from singleCustomer
  useEffect(() => {
    if (defaultValues) {
      setName(defaultValues.name || "");
      setPhone(defaultValues.phone || "");
      setAadhar(defaultValues.aadhar || "");
      setPan(defaultValues.pan || "");
      setOccupation(defaultValues.occupation || "");
      setAddress(defaultValues.address || "");
      setCity(defaultValues.city || "");
      setImage(defaultValues.image || "");
    }
  }, [defaultValues]);

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
    dispatch(updateSingleCustomer(id, customerData));
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
    if (updateCustomer && updateCustomer.success === true) {
      toast.success(updateCustomer.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }, [updateCustomer, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="customer-form-container">
          <h2>Update Customer Details</h2>
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
              <GoPlusCircle /> Update Customer
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateCustomerData;
