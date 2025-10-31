import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import ProductForm from '../pages/ProductForm';
import ProductDetails from '../pages/ProductDetails';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Error404 from '../pages/Error404';
import Error500 from '../pages/Error500';
import ComingSoon from '../pages/ComingSoon';


import { useSelector } from 'react-redux';


const PrivateRoute = ({ children }) => {
const { user } = useSelector(state => state.auth);
return user ? children : <Navigate to="/login" replace />;
};


export default function AppRoutes(){
return (
<Routes>
<Route path="/login" element={<Login/>} />
<Route path="/register" element={<Register/>} />
<Route path="/forgot-password" element={<ForgotPassword/>} />
<Route path="/reset-password" element={<ResetPassword/>} />


<Route path="/" element={<PrivateRoute><AdminLayout/></PrivateRoute>}>
<Route index element={<Dashboard/>} />
<Route path="products" element={<Products/>} />
<Route path="products/new" element={<ProductForm/>} />
<Route path="products/:id" element={<ProductDetails/>} />
<Route path="chat" element={<Chat/>} />
<Route path="profile" element={<Profile/>} />
<Route path="settings" element={<Settings/>} />
</Route>


<Route path="/coming-soon" element={<ComingSoon/>} />
<Route path="/500" element={<Error500/>} />
<Route path="*" element={<Error404/>} />
</Routes>
);
}