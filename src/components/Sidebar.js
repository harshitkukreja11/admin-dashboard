import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FaTachometerAlt, FaBoxOpen, FaComments, FaUser, FaCog } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`sidebar-container ${
        theme === "dark" ? "sidebar-dark" : "sidebar-light"
      }`}
    >
      {/* Logo / Header */}
      <div className="sidebar-header mb-4 text-center">
        <h4 className="fw-bold text-gradient">Admin Panel</h4>
      </div>

      {/* Navigation */}
      <ul className="list-unstyled sidebar-menu">
        <li>
          <Link
            to="/"
            className={`sidebar-link ${isActive("/") ? "active" : ""}`}
          >
            <FaTachometerAlt className="me-2" /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={`sidebar-link ${isActive("/products") ? "active" : ""}`}
          >
            <FaBoxOpen className="me-2" /> Products
          </Link>
        </li>
        <li>
          <Link
            to="/chat"
            className={`sidebar-link ${isActive("/chat") ? "active" : ""}`}
          >
            <FaComments className="me-2" /> Chat
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={`sidebar-link ${isActive("/profile") ? "active" : ""}`}
          >
            <FaUser className="me-2" /> Profile
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className={`sidebar-link ${isActive("/settings") ? "active" : ""}`}
          >
            <FaCog className="me-2" /> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
