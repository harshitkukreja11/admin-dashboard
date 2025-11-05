import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export const ToastAlert = ({ show, message, type = "success", onClose }) => {
  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast
        onClose={onClose}
        show={show}
        delay={3000}
        autohide
        bg={type === "danger" ? "danger" : "success"}
      >
        <Toast.Header>
          <strong className="me-auto">
            {type === "danger" ? "Error" : "Success"}
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastAlert;
