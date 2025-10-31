import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function ProductForm() {
const navigate = useNavigate();


const handleSubmit = (e) => {
e.preventDefault();
alert('Product saved successfully!');
navigate('/products');
};


return (
<div className="card p-4">
<h4>Add / Edit Product</h4>
<form onSubmit={handleSubmit}>
<div className="mb-3">
<label>Product Name</label>
<input className="form-control" required />
</div>
<div className="mb-3">
<label>Price</label>
<input type="number" className="form-control" required />
</div>
<div className="mb-3">
<label>Stock</label>
<input type="number" className="form-control" required />
</div>
<button className="btn btn-success">Save</button>
</form>
</div>
);
}