import React, { useState } from 'react';


export default function Chat() {
const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');


const handleSend = (e) => {
e.preventDefault();
if (!input) return;
setMessages([...messages, { sender: 'Admin', text: input }]);
setInput('');
};


return (
<div className="card p-4" style={{ height: '80vh' }}>
<h4>Team Chat</h4>
<div className="border p-3 mb-3 overflow-auto" style={{ height: '60vh' }}>
{messages.map((msg, idx) => (
<div key={idx} className="mb-2">
<strong>{msg.sender}: </strong>{msg.text}
</div>
))}
</div>
<form onSubmit={handleSend} className="d-flex">
<input className="form-control me-2" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type message..." />
<button className="btn btn-primary">Send</button>
</form>
</div>
);
}