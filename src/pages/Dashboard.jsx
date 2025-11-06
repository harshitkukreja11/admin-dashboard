import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Tab,
  Spinner,
  Toast,
  ToastContainer,
  ProgressBar,
  Table,
  ListGroup,
} from "react-bootstrap";
import {
  FaUsers,
  FaDollarSign,
  FaBoxOpen,
  FaChartLine,
  FaShoppingCart,
  FaClock,
} from "react-icons/fa";
import "../App.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.products);

  const [activeTab, setActiveTab] = useState("sales");
  const [showToast, setShowToast] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts()).then(() => setShowToast(true));

    // Animate counter on mount
    let count = 0;
    const interval = setInterval(() => {
      count += 20;
      if (count > 1234) {
        setAnimatedCount(1234);
        clearInterval(interval);
      } else {
        setAnimatedCount(count);
      }
    }, 20);
  }, [dispatch]);

  const chartData = [
    { name: "Jan", users: 100, sales: 2400 },
    { name: "Feb", users: 200, sales: 1398 },
    { name: "Mar", users: 300, sales: 9800 },
    { name: "Apr", users: 400, sales: 3908 },
    { name: "May", users: 600, sales: 4800 },
  ];

  const recentSales = [
    { id: 1, product: "Wireless Earbuds", amount: "$150", status: "Completed" },
    { id: 2, product: "Smartwatch", amount: "$220", status: "Pending" },
    { id: 3, product: "Gaming Mouse", amount: "$80", status: "Completed" },
    { id: 4, product: "Mechanical Keyboard", amount: "$130", status: "Failed" },
  ];

  const topProducts = [
    { name: "iPhone 15 Pro", sales: 120 },
    { name: "Samsung Galaxy S24", sales: 98 },
    { name: "MacBook Air", sales: 75 },
    { name: "iPad Pro", sales: 65 },
  ];

  const activityFeed = [
    { time: "2 mins ago", text: "New user registered." },
    { time: "15 mins ago", text: "Order #1023 completed." },
    { time: "1 hour ago", text: "Product 'Gaming Mouse' updated." },
    { time: "3 hours ago", text: "User feedback received." },
  ];

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading dashboard data...</span>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 animate-fadein">
      {/* ===== Header ===== */}
      <div className="mb-4">
        <h3 className="fw-bold text-primary mb-1">Dashboard Overview</h3>
        <p className="text-primary">
          Welcome back 👋 Here's the latest insight on your performance.
        </p>
      </div>

      {/* ===== Stat Cards ===== */}
      <Row className="g-3">
        <Col md={3}>
          <Card className="shadow-sm border-0 glass-card gradient-blue text-white hover-glow">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6>Total Users</h6>
                <h3 className="fw-bold">{animatedCount.toLocaleString()}</h3>
                <ProgressBar now={80} variant="light" className="mt-2" />
              </div>
              <div className="icon-box bg-white text-primary rounded-circle p-3 shadow-sm">
                <FaUsers size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 glass-card gradient-green text-white hover-glow">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6>Total Revenue</h6>
                <h3 className="fw-bold">$52,000</h3>
                <ProgressBar now={60} variant="light" className="mt-2" />
              </div>
              <div className="icon-box bg-white text-success rounded-circle p-3 shadow-sm">
                <FaDollarSign size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 glass-card gradient-orange text-white hover-glow">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6>Products</h6>
                <h3 className="fw-bold">{list.length}</h3>
                <ProgressBar now={45} variant="light" className="mt-2" />
              </div>
              <div className="icon-box bg-white text-warning rounded-circle p-3 shadow-sm">
                <FaBoxOpen size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 glass-card gradient-purple text-white hover-glow">
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6>Conversion Rate</h6>
                <h3 className="fw-bold">68%</h3>
                <ProgressBar now={68} variant="light" className="mt-2" />
              </div>
              <div className="icon-box bg-white text-purple rounded-circle p-3 shadow-sm">
                <FaChartLine size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ===== Charts ===== */}
      <Card className="mt-4 shadow border-0 rounded-4">
        <Card.Header className="bg-white border-0 pb-0">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="fw-semibold"
          >
            <Tab eventKey="sales" title="Sales Overview" />
            <Tab eventKey="users" title="User Growth" />
            <Tab eventKey="products" title="Product Stats" />
          </Tabs>
        </Card.Header>
        <Card.Body>
          <h5 className="fw-semibold mb-3 text-secondary">
            {activeTab === "sales"
              ? "Monthly Sales Overview"
              : activeTab === "users"
              ? "User Growth Trend"
              : "Product Performance"}
          </h5>

          <div style={{ height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#6c757d" />
                <YAxis stroke="#6c757d" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={activeTab === "sales" ? "sales" : "users"}
                  stroke={
                    activeTab === "sales"
                      ? "#007bff"
                      : activeTab === "users"
                      ? "#28a745"
                      : "#ffc107"
                  }
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>

      {/* ===== Recent Analytics Section ===== */}
      <Row className="mt-4 g-3">
        {/* Recent Sales Table */}
        <Col lg={6}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Header className="fw-semibold bg-white border-0">
              <FaShoppingCart className="me-2 text-primary" />
              Recent Sales
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale) => (
                    <tr key={sale.id}>
                      <td>{sale.product}</td>
                      <td>{sale.amount}</td>
                      <td>
                        <span
                          className={`badge ${
                            sale.status === "Completed"
                              ? "bg-success"
                              : sale.status === "Pending"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {sale.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Products */}
        <Col lg={3}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Header className="fw-semibold bg-white border-0">
              Top Products
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {topProducts.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {item.name}
                    <span className="badge bg-primary rounded-pill">
                      {item.sales}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Activity Feed */}
        <Col lg={3}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Header className="fw-semibold bg-white border-0">
              Activity Feed
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {activityFeed.map((activity, index) => (
                  <ListGroup.Item key={index}>
                    <FaClock className="text-secondary me-2" />
                    <strong>{activity.time}</strong> – {activity.text}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ===== Refresh Button ===== */}
      <div className="text-center mt-4">
        <Button
          variant="primary"
          className="px-4 py-2 fw-semibold shadow-sm"
          onClick={() => dispatch(fetchProducts())}
        >
          🔄 Refresh Data
        </Button>
      </div>

      {/* ===== Toast Message ===== */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={error ? "danger" : "success"}
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2500}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Dashboard</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {error
              ? "Failed to load products"
              : "Dashboard data loaded successfully!"}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
