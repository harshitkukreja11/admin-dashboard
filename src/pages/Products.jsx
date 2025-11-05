import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../store/productSlice";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Form, InputGroup, Table, Badge, Modal } from "react-bootstrap";
import { Loader, ToastMessage, PaginationButtons } from "../components/ui";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status, error } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");
  const [confirm, setConfirm] = useState({ show: false, id: null });

  const itemsPerPage = 5;

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filtered list
  const filteredList = useMemo(() => {
    return list.filter(
      (p) =>
        (!search || p.title.toLowerCase().includes(search.toLowerCase())) &&
        (!category || p.category.toLowerCase().includes(category.toLowerCase()))
    );
  }, [list, search, category]);

  // Pagination setup
  const pages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleDelete = (id) => {
    setConfirm({ show: true, id });
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(confirm.id))
      .unwrap()
      .then(() => {
        setToastMsg("Product deleted successfully!");
        setToastType("success");
        setShowToast(true);
      })
      .catch(() => {
        setToastMsg("Failed to delete product!");
        setToastType("danger");
        setShowToast(true);
      })
      .finally(() => setConfirm({ show: false, id: null }));
  };

  // Show loader while loading
  if (status === "loading") return <Loader message="Loading products..." />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Products</h3>
        <Button variant="primary" onClick={() => navigate("/products/new")}>
          + Add Product
        </Button>
      </div>

      {/* Filter Bar */}
      <Row className="mb-3">
        <Col md={4}>
          <InputGroup>
            <Form.Control
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {[...new Set(list.map((p) => p.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Products Table */}
      <div className="card p-3">
        {paginatedList.length === 0 ? (
          <p className="text-center my-4">No products found.</p>
        ) : (
          <Table bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th width="150">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedList.map((product, i) => (
                <tr key={product.id}>
                  <td>{(page - 1) * itemsPerPage + i + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Badge bg={product.stock > 0 ? "success" : "danger"}>
                      {product.stock > 0 ? "Available" : "Out of stock"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <PaginationButtons
          currentPage={page}
          totalPages={pages}
          onPageChange={setPage}
        />
      </div>

      {/* Confirm Delete Modal */}
      <Modal
        show={confirm.show}
        onHide={() => setConfirm({ show: false, id: null })}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirm({ show: false, id: null })}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Message */}
      <ToastMessage
        show={showToast}
        message={toastMsg}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
