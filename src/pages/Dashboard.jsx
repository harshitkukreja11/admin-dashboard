import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import StatCard from '../components/StatCard';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


export default function Dashboard() {
const dispatch = useDispatch();
const { list } = useSelector((state) => state.products);


useEffect(() => {
dispatch(fetchProducts());
}, [dispatch]);


const chartData = [
{ name: 'Jan', users: 100, sales: 2400 },
{ name: 'Feb', users: 200, sales: 1398 },
{ name: 'Mar', users: 300, sales: 9800 },
{ name: 'Apr', users: 400, sales: 3908 },
];


return (
<div>
<h3 className="mb-4">Dashboard Overview</h3>
<div className="d-flex gap-3 mb-4">
<StatCard title="Total Users" value="1,234" />
<StatCard title="Revenue" value="$52,000" />
<StatCard title="Products" value={list.length} />
</div>


<div className="card p-3">
<h5>Sales Chart</h5>
<div style={{ height: 300 }}>
<ResponsiveContainer>
<LineChart data={chartData}>
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Line type="monotone" dataKey="sales" stroke="#007bff" />
</LineChart>
</ResponsiveContainer>
</div>
</div>
</div>
);
}