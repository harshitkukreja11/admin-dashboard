import React from "react";
import { Spinner } from "react-bootstrap";

export const Loader = ({ message = "Loading..." }) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center py-5"
      style={{ minHeight: "200px" }}
    >
      <Spinner animation="border" variant="primary" role="status" />
      <div className="mt-3 text-muted">{message}</div>
    </div>
  );
};

export default Loader;
