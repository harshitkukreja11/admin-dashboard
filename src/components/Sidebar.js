import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Sidebar() {
  const { theme } = useContext(ThemeContext);

  const sidebarStyle =
    theme === "dark"
      ? { backgroundColor: "#222", color: "white" }
      : { backgroundColor: "#f8f9fa", color: "black" };

  return (
    <div style={{ ...sidebarStyle, width: "250px", minHeight: "100vh" }} className="p-3">
      <h5 className="mb-4">Admin Panel</h5>
      <ul className="list-unstyled">
        <li className="mb-2">
          <Link
            to="/"
            className={theme === "dark" ? "text-white text-decoration-none" : "text-dark text-decoration-none"}
          >
            🏠 Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/products"
            className={theme === "dark" ? "text-white text-decoration-none" : "text-dark text-decoration-none"}
          >
            📦 Products
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/chat"
            className={theme === "dark" ? "text-white text-decoration-none" : "text-dark text-decoration-none"}
          >
            💬 Chat
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/profile"
            className={theme === "dark" ? "text-white text-decoration-none" : "text-dark text-decoration-none"}
          >
            👤 Profile
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/settings"
            className={theme === "dark" ? "text-white text-decoration-none" : "text-dark text-decoration-none"}
          >
            ⚙️ Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
