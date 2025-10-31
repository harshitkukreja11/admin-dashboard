import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
      <h5 className="mb-4">Admin Panel</h5>
      <ul className="list-unstyled">
        <li className="mb-2">
          <Link to="/" className="text-white text-decoration-none">Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link to="/products" className="text-white text-decoration-none">Products</Link> {/* ✅ add this */}
        </li>
      </ul>
    </div>
  );
}
