import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {toast }from 'react-toastify';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const submitHander = async(e)=>{
    e.preventDefault();
         try {
               const res = await axios.post('/api/v1/auth/register',{
                name,email,password,phone,address,answer
               });
               if(res && res.data.success)
               {
                toast.success(res.data.message);
                navigate("/login");
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
              <h2 className="title">Register Form</h2>
            <input 
            type="text" 
            placeholder="Enter Your Name" 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
            ></input>
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
            <input
              type="text"
              placeholder="Enter Your Mobile Number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              required
            ></input>
            <input
              type="text"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              required
            ></input>
            <input
              type="text"
              placeholder="Enter Your Favourite Sports"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              required
            ></input>
            <button>Register</button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
