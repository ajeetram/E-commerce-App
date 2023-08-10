import React, {useState } from "react";
import { FaBars, FaTimes,FaAngleDown } from 'react-icons/fa';
import "./header.css";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth.js";
import SearchInput from "../../pages/Forms/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
const Header = () => {
 const [showMenu, setShowMenu] = useState(false)
 const [activeLink, setActiveLink] = useState("");
 const categories = useCategory();
 const [auth,setAuth] = useAuth();
 const [cart] = useCart([]);

  // active link function
  const linkClickHandler=(link)=>{
    setActiveLink(link);
  }


  // logout handler
  const logoutHandler = ()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem("auth");
  };
  return (
    <>
      <div className="nav">
          <p>🛒 E-Commerce App</p>
          <div className="Fabar-menu">
           <Link>
           {
            showMenu?<FaTimes onClick={()=>setShowMenu(false)}/>:<FaBars onClick={()=>setShowMenu(true)} />
           }
           </Link>
          </div>
    
        <div className={!showMenu?"nav-right":"sidebar-container"}>
          <ul>
          <li>
          <SearchInput></SearchInput>
          </li>
            <li>
              <NavLink
                to="/"
                onClick={() => linkClickHandler("home")}
                className={activeLink === "home" ? "activeLink" :""}
              >
                Home
              </NavLink>
            </li>
            <li>
            <div className="dropdown">
              <Link  to ="/" className="dropbtn" style={{ color: '#3BBA9C' }}>Category<FaAngleDown /></Link>
                <div className="dropdown-content">
                <Link
                    to={`/categories`}
                    >
                 All Categories
                
                 </Link>
                {
                  categories?.map((c)=>(
                    <Link
                    to={`/category/${c.slug}`} key={c._id}
                    >
                {
                  c.name
                }
              </Link>
                  ))
                }
               
              </div>
              </div>
              {/* <NavLink
                to="/category"
                className={activeLink === "category" ? "activeLink" :""}
                onClick={() => linkClickHandler("category")}
              >
                Category
              </NavLink> */}
            </li>
           {
            !auth.user?(<>
              <li>
              <Link
                to="/register"
                className={activeLink === "register" ? "activeLink" :""}
                onClick={() => linkClickHandler("register")}
              >
                Register
              </Link>
            </li>
            <li>
              <NavLink
                to="/login"
                className={activeLink === "login" ? "activeLink" :""}
                onClick={() => linkClickHandler("login")}
              >
                Login
              </NavLink>
            </li>
            </>):
            (
              <>
              <li>
              <div className="dropdown">
              <p className="dropbtn">{auth?.user?.name}<FaAngleDown /></p>
                <div className="dropdown-content">
                <NavLink
                to="/login"
                className={activeLink === "login" ? "activeLink" :""}
                onClick={logoutHandler}
              >
                Logout
              </NavLink>
                <NavLink
                to={`/dashboard/${
                  auth?.user?.role===1?"admin":"user"
                }`}
              >
                Dashboard
              </NavLink>
              </div>
              </div>

            </li>
              </>
            )
           }
            <li>
            <Badge count={cart?.length} showZero>
            <Link
                to="/cart"
                className={activeLink === "cart" ? "activeLink" :""}
                onClick={() => linkClickHandler("cart")}
                style={{fontSize:"20px", fontWeight:"bold"}}
              >
                Cart
              </Link>
            </Badge>
            </li>
          </ul>
          
        </div>
      </div>
    </>
  );
};

export default Header;
