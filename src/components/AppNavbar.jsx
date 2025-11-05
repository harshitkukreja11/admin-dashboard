import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // redirect after logout
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Admin Dashboard
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown title="Account" id="acc">
              <NavDropdown.Item as={Link} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
