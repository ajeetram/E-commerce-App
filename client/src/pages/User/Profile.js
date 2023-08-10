import React, { useEffect, useState } from "react";
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [auth,setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const {name,email,phone,address} = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  },[auth?.user])

  const submitHander = async(e)=>{
    e.preventDefault();
         try {
               const {data} = await axios.put('/api/v1/auth/profile',{
                name,email,password,phone,address
               },{
                headers:
                {
                  Authorization:auth?.token
                }

               });
               if(data?.error)
               {
                toast.error(data?.error);
                //navigate("/login");
               }
               else
               {
                setAuth({...auth, user: data?.updatedUser});
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("updated profile successfully");
               }

         } catch (error) {
          console.log(error)
          toast.error("somthing went wrong")
         }
  };

  return (
    <Layout title={"dashboard-profile"}>
    <div className='admin-dashboard'>
      <div className='admin-col-1'>
        <UserMenu />
      </div>
      <div className="form_container">
        <form onSubmit={submitHander}>
              <h2 className="title">Update Form</h2>
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
            disabled
            ></input>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
          
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
            <button>Upadte</button>
        </form>
      </div>
    </div>
    </Layout>
  )
}

export default Profile