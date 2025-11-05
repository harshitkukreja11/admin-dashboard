import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import { StatCard, Loader, ToastMessage } from "../components/ui"; // ✅ from your reusable components
import { Button, Tabs, Tab } from "react-bootstrap"; // ✅ Bootstrap components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.products);

  const [activeTab, setActiveTab] = useState("sales");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts()).then(() => setShowToast(true));
  }, [dispatch]);

  const chartData = [
    { name: "Jan", users: 100, sales: 2400 },
    { name: "Feb", users: 200, sales: 1398 },
    { name: "Mar", users: 300, sales: 9800 },
    { name: "Apr", users: 400, sales: 3908 },
  ];

  if (status === "loading") return <Loader message="Loading dashboard data..." />;

  return (
    <div>
      <h3 className="mb-4">Dashboard Overview</h3>

      <div className="d-flex gap-3 mb-4 flex-wrap">
        <StatCard title="Total Users" value="1,234" />
        <StatCard title="Revenue" value="$52,000" />
        <StatCard title="Products" value={list.length} />
      </div>

      {/* Bootstrap Tabs */}
      <Tabs
        id="dashboard-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="sales" title="Sales Overview" />
        <Tab eventKey="users" title="Users Growth" />
        <Tab eventKey="products" title="Product Stats" />
      </Tabs>

      <div className="card p-3 mt-3">
        <h5>
          {activeTab === "sales"
            ? "Sales Chart"
            : activeTab === "users"
            ? "Users Growth"
            : "Product Stats"}
        </h5>
        <div style={{ height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={activeTab === "sales" ? "sales" : "users"}
                stroke="#007bff"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4">
        <Button
          onClick={() => dispatch(fetchProducts())}
          variant="primary"
        >
          Refresh Data
        </Button>
      </div>

      {/* Toast message */}
      <ToastMessage
        show={showToast}
        message={error ? "Failed to load products" : "Dashboard data loaded!"}
        type={error ? "danger" : "success"}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
