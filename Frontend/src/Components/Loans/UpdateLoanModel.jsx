import React from "react";
import "../../Css/Customers.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IoCloseCircleOutline } from "react-icons/io5";
import UpdateLoanData from "./UpdateLoanData";

const UpdateLoanModel = ({ open, handleClose }) => {
  return (
    <>
      <div className="modal-container">
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 1100,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: "12px",
              p: 4,
            }}
          >
            <button className="close-btn" onClick={handleClose}>
              <IoCloseCircleOutline />
            </button>
            <UpdateLoanData />
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default UpdateLoanModel;
