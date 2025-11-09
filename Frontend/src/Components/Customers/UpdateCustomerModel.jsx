import React from "react";
import "../../Css/Customers.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoCloseCircleOutline } from "react-icons/io5";
import UpdateCustomerData from "./UpdateCustomerData";

const UpdateCustomerModel = ({ open, handleUpdateFormClose }) => {
  return (
    <>
      <div className="modal-container">
        <Modal open={open} onClose={handleUpdateFormClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: "12px",
              p: 4,
            }}
          >
            <button className="close-btn" onClick={handleUpdateFormClose}>
              <IoCloseCircleOutline />
            </button>
            <UpdateCustomerData />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default UpdateCustomerModel;
