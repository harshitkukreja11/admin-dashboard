import React, { useContext, useState } from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Nav,
  Dropdown,
  Button,
} from "react-bootstrap";
import {
  FaBell,
  FaEnvelope,
  FaSun,
  FaMoon,
  FaSearch,
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import "./AppNavbar.css";

export default function AppNavbar() {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");

  // 🔹 Replace with your own hosted image or avatar URL
  const profileImage =
  "https:encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS1BSBo15LosDJiFbR7vT7daDJEmsnatXaxAzcN67NE_Ld4L0ymS0X0dM"
     // Example placeholder avatar

  return (
    <Navbar
      expand="lg"
      bg={theme === "dark" ? "dark" : "white"}
      variant={theme === "dark" ? "dark" : "light"}
      className="shadow-sm sticky-top app-navbar border-bottom"
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(90deg, #1e1e2f, #2b2b45)"
            : "linear-gradient(90deg, #ffffff, #f8f9fc)",
      }}
    >
      <Container
        fluid
        className="px-4 d-flex justify-content-between align-items-center"
      >
        {/* Brand Logo */}
        <Navbar.Brand
          className="fw-bold fs-4"
          style={{
            color: theme === "dark" ? "#00d4ff" : "#007bff",
            letterSpacing: "0.5px",
          }}
        >
          <span className="me-2">🧭</span>Admin Dashboard
        </Navbar.Brand>

        {/* Navbar Toggle for Mobile */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          {/* Search Bar */}
          <Form className="d-flex align-items-center me-3 search-form position-relative">
            <FormControl
              type="search"
              placeholder="Search..."
              className="shadow-none ps-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                borderRadius: "30px",
                border: "1px solid #dee2e6",
                backgroundColor: theme === "dark" ? "#2a2a40" : "#f9f9f9",
                color: theme === "dark" ? "#fff" : "#000",
              }}
            />
            <FaSearch
              className="position-absolute"
              style={{
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
          </Form>

          {/* Navbar Icons */}
          <Nav className="align-items-center gap-3">
            <Nav.Item>
              <FaBell
                size={20}
                className="text-muted hover-icon position-relative"
                title="Notifications"
              />
            </Nav.Item>
            <Nav.Item>
              <FaEnvelope
                size={20}
                className="text-muted hover-icon position-relative"
                title="Messages"
              />
            </Nav.Item>

            {/* Theme Toggle */}
            <Nav.Item>
              <Button
                variant="outline-primary"
                size="sm"
                className="rounded-circle p-2 theme-toggle-btn border-0"
                onClick={toggleTheme}
                title="Toggle theme"
                style={{
                  backgroundColor:
                    theme === "dark" ? "rgba(255,255,255,0.1)" : "#eef4ff",
                }}
              >
                {theme === "dark" ? (
                  <FaSun size={16} color="#facc15" />
                ) : (
                  <FaMoon size={16} color="#007bff" />
                )}
              </Button>
            </Nav.Item>

            {/* User Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle
                as="div"
                id="dropdown-user"
                className="user-dropdown d-flex align-items-center cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                {/* 🔹 Profile Picture */}
                <div className="position-relative me-2">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded-circle border border-2 border-primary shadow-sm profile-avatar"
                    width="36"
                    height="36"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  {/* Status dot */}
                  <span
                    className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle"
                    style={{
                      width: "10px",
                      height: "10px",
                    }}
                  ></span>
                </div>
                <span className="fw-semibold d-none d-md-inline">Admin</span>
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="shadow-sm border-0 mt-2"
                style={{
                  borderRadius: "10px",
                  minWidth: "180px",
                  fontSize: "0.9rem",
                }}
              >
                <Dropdown.Item href="/profile">👤 Profile</Dropdown.Item>
                <Dropdown.Item href="/settings">⚙️ Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => dispatch(logout())}>
                  🚪 Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
