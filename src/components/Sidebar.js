import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaTachometerAlt, FaBoxOpen, FaComments, FaUser, FaCog, FaBars, FaTimes } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="sidebar-toggle-btn" onClick={() => setOpen(true)}>
        <FaBars />
      </button>

      {/* BACKDROP for mobile */}
      {open && <div className="sidebar-backdrop" onClick={() => setOpen(false)}></div>}

      {/* SIDEBAR */}
      <div
        className={`sidebar-container ${
          theme === "dark" ? "sidebar-dark" : "sidebar-light"
        } ${open ? "show" : ""}`}
      >
        {/* Close button (mobile only) */}
        <button className="sidebar-close-btn" onClick={() => setOpen(false)}>
          <FaTimes />
        </button>

        <div className="sidebar-header mb-4 text-center">
          <h4 className="fw-bold text-gradient">Admin Panel</h4>
        </div>

        <ul className="list-unstyled sidebar-menu">
          <li>
            <Link
              to="/"
              className={`sidebar-link ${isActive("/") ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <FaTachometerAlt className="me-2" /> Dashboard
            </Link>
          </li>
          
          <li>
            <Link
              to="/products"
              className={`sidebar-link ${isActive("/products") ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <FaBoxOpen className="me-2" /> Products
            </Link>
          </li>

          <li>
            <Link
              to="/chat"
              className={`sidebar-link ${isActive("/chat") ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <FaComments className="me-2" /> Chat
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className={`sidebar-link ${isActive("/profile") ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <FaUser className="me-2" /> Profile
            </Link>
          </li>

          <li>
            <Link
              to="/settings"
              className={`sidebar-link ${isActive("/settings") ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <FaCog className="me-2" /> Settings
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
