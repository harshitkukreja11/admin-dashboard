import React from 'react';


export default function Profile() {
return (
<div className="card p-4">
<h4>My Profile</h4>
<form>
<div className="mb-3">
<label>Name</label>
<input className="form-control" value="Admin User" />
</div>
<div className="mb-3">
<label>Email</label>
<input type="email" className="form-control" value="admin@example.com" />
</div>
<button className="btn btn-primary">Update Profile</button>
</form>
<hr />
<h5>Change Password</h5>
<form>
<div className="mb-3">
<label>Old Password</label>
<input type="password" className="form-control" />
</div>
<div className="mb-3">
<label>New Password</label>
<input type="password" className="form-control" />
</div>
<button className="btn btn-warning">Change Password</button>
</form>
</div>
);
}