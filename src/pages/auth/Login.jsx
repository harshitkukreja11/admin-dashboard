import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Card, Alert, Spinner } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      // Simulated login (replace with API call later)
      if (email === "admin@example.com" && password === "admin123") {
        const userData = { name: "Admin", email };
        dispatch(loginSuccess(userData));
        navigate("/");
      } else {
        dispatch(loginFailure("Invalid email or password"));
      }
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h3 className="text-center mb-3">Admin Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>
        </Form>

        {/* ✅ Added Navigation Links */}
        <div className="mt-3 text-center">
          <Link to="/forgot-password" className="d-block mb-2">
            Forgot Password?
          </Link>
          <span>
            Don’t have an account?{" "}
            <Link to="/register" className="fw-bold">
              Register
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
}
