import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './adminmenu.css'
const AdminMenu = () => {
  const [activeLink, setActiveLink] = useState("");
  const linkClickHandler=(link)=>{
    setActiveLink(link);
  }
  return (
    <>
        <div className='admin-menu'>
            <h1>Admin Panel</h1>
            <NavLink to="/dashboard/admin/create-category" 
            className={activeLink === "create-cat" ? "activeLink" :""}
            onClick={() => linkClickHandler("create-cat")}
            >Create Category</NavLink>
            <NavLink to="/dashboard/admin/create-product" 
            className={activeLink === "create-product" ? "activeLink" :""}
            onClick={() => linkClickHandler("create-product")}
            >Create Product</NavLink>
            <NavLink to="/dashboard/admin/products" 
             className={activeLink === "products" ? "activeLink" :""}
            onClick={() => linkClickHandler("products")}
            >Products</NavLink>
            <NavLink to="/dashboard/admin/orders"
             className={activeLink === "orders" ? "activeLink" :""}
            onClick={() => linkClickHandler("orders")}
            >Orders</NavLink>
            <NavLink to="/dashboard/admin/users" 
             className={activeLink === "create-product" ? "activeLink" :""}
            onClick={() => linkClickHandler("create-product")}
            >Users</NavLink>
        </div>
    </>
  )
}

export default AdminMenu