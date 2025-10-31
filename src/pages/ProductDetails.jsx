import React from 'react';
import { useParams } from 'react-router-dom';


export default function ProductDetails() {
const { id } = useParams();


return (
<div className="card p-4">
<h4>Product Details - ID #{id}</h4>
<p><strong>Name:</strong> Product {id}</p>
<p><strong>Price:</strong> $500</p>
<p><strong>Stock:</strong> 20</p>
<p><strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</div>
);
}