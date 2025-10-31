import React from 'react';
import { Link } from 'react-router-dom';


export default function Error404() {
return (
<div className="text-center d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
<h1 className="display-3">404</h1>
<p className="lead">Page Not Found</p>
<Link to="/" className="btn btn-primary">Go Home</Link>
</div>
);
}