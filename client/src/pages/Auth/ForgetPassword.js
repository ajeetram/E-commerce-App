import React,{useState} from 'react'
import Layout from "../../components/Layout/Layout";
import {toast }from 'react-toastify';
import axios from 'axios'
import {useNavigate} from "react-router-dom";


const ForgetPassword = () => {

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  

  const navigate = useNavigate();

  const submitHander = async(e)=>{
    e.preventDefault();
         try {
               const res = await axios.post('/api/v1/auth/resetpassword',{
                email,newPassword,answer
               });
               if(res && res.data.success )
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
    <Layout title={"forget-password"}>
      <div className="form_container">
        <form onSubmit={submitHander}>
              <h2 className="title">Reset Form</h2>
            <input 
            type="email" 
            placeholder="Enter Your Email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            ></input>
            <input
              type="password"
              placeholder="Enter Your New Password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              required
            ></input>
            <input
              type="text"
              placeholder="Enter Your Favourite Sport"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              required
            ></input>
            <button>Reset Password</button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgetPassword