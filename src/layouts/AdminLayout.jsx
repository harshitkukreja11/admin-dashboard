import React from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import Sidebar from '../components/Sidebar';


export default function AdminLayout(){
return (
<div className="d-flex" style={{minHeight:'100vh'}}>
<Sidebar />
<div className="flex-fill">
<AppNavbar />
<main className="p-4">
<Outlet />
</main>
</div>
</div>
);
}