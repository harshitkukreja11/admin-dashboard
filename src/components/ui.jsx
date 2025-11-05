// src/components/ui.jsx
import React from "react";
import { Spinner, Toast, Alert, Button } from "react-bootstrap";

// ✅ Stat card (reusable metric display)
export function StatCard({ title, value, icon }) {
  return (
    <div className="card shadow-sm flex-fill text-center p-3">
      <h6 className="text-muted">{title}</h6>
      <h3 className="fw-bold">{value}</h3>
      {icon && <div className="text-primary fs-3">{icon}</div>}
    </div>
  );
}

// ✅ Loader / Spinner
export function Loader({ message = "Loading..." }) {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column py-5">
      <Spinner animation="border" role="status" />
      <div className="mt-2">{message}</div>
    </div>
  );
}

// ✅ Toast notification
export function ToastMessage({ show, onClose, title, body }) {
  return (
    <Toast
      show={show}
      onClose={onClose}
      bg="light"
      className="position-fixed top-0 end-0 m-3 shadow"
      delay={3000}
      autohide
    >
      <Toast.Header closeButton={true}>
        <strong className="me-auto">{title || "Notification"}</strong>
      </Toast.Header>
      <Toast.Body>{body || "Action completed successfully!"}</Toast.Body>
    </Toast>
  );
}

// ✅ Alert box
export function AlertBox({ variant = "info", message }) {
  if (!message) return null;
  return (
    <Alert variant={variant} className="mt-3">
      {message}
    </Alert>
  );
}

// ✅ Pagination buttons (optional)
export function PaginationButtons({ page, pages, setPage }) {
  if (pages <= 1) return null;
  const buttons = [];
  for (let i = 1; i <= pages; i++) {
    buttons.push(
      <Button
        key={i}
        size="sm"
        variant={i === page ? "primary" : "outline-secondary"}
        className="mx-1"
        onClick={() => setPage(i)}
      >
        {i}
      </Button>
    );
  }
  return <div className="mt-3 text-center">{buttons}</div>;
}
