import React from 'react';
import './App.css';
import Dashboard from "./secure/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import Users from "./secure/users/Users";
import Login from "./public/Login";
import Register from "./public/Register";
import RedirectToDashboard from "./secure/RedirectToDashboard";
import UserCreate from "./secure/users/UserCreate";
import UserEdit from "./secure/users/UserEdit";
import Roles from "./secure/roles/Roles";
import RoleCreate from "./secure/roles/RoleCreate";
import RoleEdit from "./secure/roles/RoleEdit";
import Products from "./secure/products/Products";
import ProductCreate from "./secure/products/ProductCreate";
import ProductEdit from "./secure/products/ProductEdit";
import Orders from "./secure/orders/Orders";
import OrderItems from "./secure/orders/OrderItems";
import Profile from "./secure/profile/Profile";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<RedirectToDashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile /> }/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/create" element={<UserCreate />} />
                <Route path="/users/:id/edit" element={<UserEdit />} />
                <Route path="/roles" element={<Roles /> } />
                <Route path="/roles/create" element={<RoleCreate /> } />
                <Route path="/roles/:id/edit" element={<RoleEdit /> } />
                <Route path="/products" element={<Products />} />
                <Route path="/products/create" element={<ProductCreate />} />
                <Route path="/products/:id/edit" element={<ProductEdit />} />
                <Route path="/orders" element={<Orders /> } />
                <Route path="/orders/:id" element={<OrderItems /> } />
            </Routes>
        </div>
    );
}

export default App;
