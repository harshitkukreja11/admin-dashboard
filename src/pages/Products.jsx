import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice"; // adjust path if your slice file is located elsewhere
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Form,
  InputGroup,
  Table,
  Modal,
  Pagination,
  Badge,
} from "react-bootstrap";

/*
  Products.jsx
  - Pagination, search, sort, filter
  - Local CRUD (optimistic UI). Replace with dispatches to backend when available.
*/

function usePaginatedData(data, pageSize) {
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [data, pageSize]);
  const pages = Math.max(1, Math.ceil((data?.length || 0) / pageSize));
  const current = data.slice((page - 1) * pageSize, page * pageSize);
  return { page, setPage, pages, current };
}

function SortIcon({ dir }) {
  if (!dir) return <span style={{ opacity: 0.4 }}>↕</span>;
  return dir === "asc" ? <span>▲</span> : <span>▼</span>;
}

function ConfirmModal({ show, title, body, onCancel, onConfirm }) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Confirm"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body || "Are you sure?"}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ProductModal({ show, onHide, initial = null, onSave }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        price: initial.price ?? "",
        stock: initial.stock ?? "",
        description: initial.description || "",
        image: initial.image || "",
      });
    } else {
      setForm({ name: "", price: "", stock: "", description: "", image: "" });
    }
  }, [initial, show]);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // minimal validation
    if (!form.name.trim()) return alert("Please provide product name");
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
    };
    onSave(payload);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{initial ? "Edit Product" : "Add Product"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="g-2">
            <Col md={8}>
              <Form.Group className="mb-2">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Label>Price</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    type="number"
                    step="0.01"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  type="number"
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {initial ? "Save changes" : "Create product"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // read products from redux (slice should provide list)
  const productsFromStore = useSelector((s) => (s.products ? s.products.list : []));
  const loading = useSelector((s) => (s.products ? s.products.status === "loading" : false));

  // local copy for UI edits (optimistic). If you want persistence, replace the local updates
  // with dispatches to your API-based actions (e.g., addProduct/updateProduct/deleteProduct).
  const [items, setItems] = useState([]);
  useEffect(() => {
    // populate from redux when available
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // whenever store updates, sync into local UI list (keeps search/pagination stable)
    setItems(Array.isArray(productsFromStore) ? productsFromStore.map(p => ({ ...p })) : []);
  }, [productsFromStore]);

  // UI state
  const [viewMode, setViewMode] = useState("table"); // table | grid
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  // sorting: key => 'asc'|'desc'|null
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState(null);

  // modal/edit/delete state
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState({ show: false, id: null });

  // filtered + sorted list (memoized)
  const filtered = useMemo(() => {
    let list = items.slice();

    // search
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          String(p.id).includes(q) ||
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // price filter
    const min = Number(minPrice) || null;
    const max = Number(maxPrice) || null;
    if (min != null && !Number.isNaN(min)) list = list.filter((p) => Number(p.price || 0) >= min);
    if (max != null && !Number.isNaN(max)) list = list.filter((p) => Number(p.price || 0) <= max);

    // in stock
    if (inStockOnly) list = list.filter((p) => Number(p.stock || 0) > 0);

    // sort
    if (sortKey) {
      list.sort((a, b) => {
        const av = a[sortKey] ?? "";
        const bv = b[sortKey] ?? "";
        if (typeof av === "number" || typeof bv === "number") {
          return (Number(av) - Number(bv)) * (sortDir === "asc" ? 1 : -1);
        }
        return String(av).localeCompare(String(bv)) * (sortDir === "asc" ? 1 : -1);
      });
    }

    return list;
  }, [items, query, minPrice, maxPrice, inStockOnly, sortKey, sortDir]);

  // pagination hook
  const pageSize = 8;
  const { page, setPage, pages, current } = usePaginatedData(filtered, pageSize);

  // table handlers
  const toggleSort = (key) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
      return;
    }
    if (sortDir === "asc") setSortDir("desc");
    else if (sortDir === "desc") {
      setSortKey(null);
      setSortDir(null);
    } else setSortDir("asc");
  };

  const handleAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditing(product);
    setShowModal(true);
  };

  const handleSave = (payload) => {
    if (editing) {
      // update local list (optimistic)
      setItems((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...payload } : p)));
      setShowModal(false);
    } else {
      // create new id (client-side)
      const newItem = { id: Date.now(), ...payload };
      setItems((prev) => [newItem, ...prev]);
      setShowModal(false);
    }
  };

  const handleDelete = (id) => {
    setConfirm({ show: true, id });
  };

  const confirmDelete = () => {
    const id = confirm.id;
    setItems((prev) => prev.filter((p) => p.id !== id));
    setConfirm({ show: false, id: null });
  };

  // navigate view
  const handleView = (id) => navigate(`/products/${id}`);

  return (
    <div>
      <Row className="align-items-center mb-3">
        <Col>
          <h4>Products</h4>
          <div className="text-muted small">Table view with search, pagination & CRUD</div>
        </Col>

        <Col xs="auto" className="d-flex gap-2">
          <Button variant={viewMode === "table" ? "primary" : "outline-secondary"} onClick={() => setViewMode("table")}>
            Table
          </Button>
          <Button variant={viewMode === "grid" ? "primary" : "outline-secondary"} onClick={() => setViewMode("grid")}>
            Grid
          </Button>
          <Button variant="success" onClick={handleAdd}>
            + Add product
          </Button>
        </Col>
      </Row>

      {/* Filters & Search */}
      <Row className="mb-3 g-2">
        <Col md={4}>
          <InputGroup>
            <Form.Control placeholder="Search by name, id or description" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Button variant="outline-secondary" onClick={() => setQuery("")}>Clear</Button>
          </InputGroup>
        </Col>

        <Col md={2}>
          <Form.Control type="number" placeholder="Min price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        </Col>
        <Col md={2}>
          <Form.Control type="number" placeholder="Max price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </Col>

        <Col md={2}>
          <Form.Check type="checkbox" label="In stock only" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
        </Col>

        <Col md={2} className="text-end">
          <Badge bg="info">{filtered.length} items</Badge>
        </Col>
      </Row>

      {/* Table or Grid */}
      {viewMode === "table" ? (
        <div className="table-responsive card shadow-sm p-2">
          <Table hover size="sm" className="mb-2">
            <thead>
              <tr>
                <th style={{ cursor: "pointer" }} onClick={() => toggleSort("id")}>
                  ID <SortIcon dir={sortKey === "id" ? sortDir : null} />
                </th>
                <th style={{ cursor: "pointer" }} onClick={() => toggleSort("name")}>
                  Name <SortIcon dir={sortKey === "name" ? sortDir : null} />
                </th>
                <th style={{ cursor: "pointer" }} onClick={() => toggleSort("price")}>
                  Price <SortIcon dir={sortKey === "price" ? sortDir : null} />
                </th>
                <th style={{ cursor: "pointer" }} onClick={() => toggleSort("stock")}>
                  Stock <SortIcon dir={sortKey === "stock" ? sortDir : null} />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {current.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>${Number(p.price || 0).toFixed(2)}</td>
                  <td>{p.stock ?? 0}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button size="sm" variant="outline-primary" onClick={() => handleView(p.id)}>
                        View
                      </Button>
                      <Button size="sm" variant="outline-secondary" onClick={() => handleEdit(p)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {current.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No results
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">Page {page} of {pages}</small>
            </div>
            <Pagination className="mb-0">
              <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
              <Pagination.Prev onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} />
              {/* simple page numbers */}
              {Array.from({ length: pages }).map((_, i) => (
                <Pagination.Item key={i} active={i + 1 === page} onClick={() => setPage(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => setPage(Math.min(pages, page + 1))} disabled={page === pages} />
              <Pagination.Last onClick={() => setPage(pages)} disabled={page === pages} />
            </Pagination>
          </div>
        </div>
      ) : (
        /* Grid view */
        <div className="row g-3">
          {filtered.map((p) => (
            <div key={p.id} className="col-12 col-md-4">
              <div className="card h-100 shadow-sm">
                <img src={p.image || "https://via.placeholder.com/400x200"} className="card-img-top" style={{ height: 150, objectFit: "cover" }} alt={p.name} />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{p.name}</h6>
                  <div className="text-muted mb-2">${Number(p.price || 0).toFixed(2)}</div>
                  <div className="mb-2">Stock: {p.stock ?? 0}</div>
                  <div className="mt-auto d-flex gap-2">
                    <Button size="sm" variant="outline-primary" onClick={() => handleView(p.id)}>View</Button>
                    <Button size="sm" variant="outline-secondary" onClick={() => handleEdit(p)}>Edit</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="text-center text-muted">No results</div>}
        </div>
      )}

      {/* Add/Edit modal */}
      <ProductModal show={showModal} onHide={() => setShowModal(false)} initial={editing} onSave={handleSave} />

      {/* Delete confirm */}
      <ConfirmModal
        show={confirm.show}
        title="Delete product"
        body="Are you sure you want to delete this product? This action cannot be undone."
        onCancel={() => setConfirm({ show: false, id: null })}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
