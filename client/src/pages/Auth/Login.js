import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {toast }from 'react-toastify';
import axios from 'axios'
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "./auth.css";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const submitHander = async(e)=>{
    e.preventDefault();
         try {
               const res = await axios.post('/api/v1/auth/login',{
                email,password
               });
               if(res && res.data.success )
               {
                toast.success(res.data.message);
                setAuth({...auth,
                  user:res.data.user,
                  token:res.data.token,
                  }
                  )
                  localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state||"/");
               }
               else
               {
                toast.error(res.data.message)
               }

         } catch (error) {
          console.log(error)
          toast.error("somthing went wrong")
         }
  }


  return (
    <Layout>
      <div className="form_container">
        <form onSubmit={submitHander}>
              <h2 className="title">Login Form</h2>
            <input 
            type="email" 
            placeholder="Enter Your Email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            ></input>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            ></input>
            <button>Login</button>
            <Link to='/forget-password'>Forget Password</Link>
        </form>
      </div>
    </Layout>
  )
}

export default Login