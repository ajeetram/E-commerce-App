import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './adminmenu.css'

const UserMenu = () => {

  const [activeLink, setActiveLink] = useState("");
  const linkClickHandler=(link)=>{
    setActiveLink(link);
  } 

  return (
    <>
        <div className='admin-menu'>
            <h1>Dashboard</h1>
            <NavLink to="/dashboard/user/orders" 
             className={activeLink === "orders" ? "activeLink" :""}
            onClick={() => linkClickHandler("orders")}
            >Orders</NavLink>
            <NavLink to="/dashboard/user/profile" 
             className={activeLink === "profile" ? "activeLink" :""}
            onClick={() => linkClickHandler("profile")}>Profile</NavLink>
          
        </div>
    </>
  )
}

export default UserMenu