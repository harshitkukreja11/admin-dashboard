import React, { useState } from 'react';


export default function Settings() {
const [darkMode, setDarkMode] = useState(false);


return (
<div className="card p-4">
<h4>System Settings</h4>
<div className="form-check form-switch mb-3">
<input
className="form-check-input"
type="checkbox"
checked={darkMode}
onChange={(e) => setDarkMode(e.target.checked)}
/>
<label className="form-check-label">Dark Mode</label>
</div>
<div className="mb-3">
<label>Notification Preference</label>
<select className="form-select">
<option>Email</option>
<option>SMS</option>
<option>Push Notification</option>
</select>
</div>
<button className="btn btn-success">Save Settings</button>
</div>
);
}