import React from 'react';


export default function Error500() {
return (
<div className="text-center d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
<h1 className="display-3">500</h1>
<p className="lead">Internal Server Error</p>
<button className="btn btn-danger" onClick={() => window.location.reload()}>Reload</button>
</div>
);
}