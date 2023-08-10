import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'
const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth();

    useEffect(()=>{
        const checkAuth = async()=>{
            const res = await axios.get("/api/v1/auth/admin-auth",{
                headers:{
                    Authorization:auth?.token,
                },
            })

            if(res.data.ok)
            {
                setOk(true);
            }
            else
            {
                setOk(false);
            }
        };
        if(auth?.token) checkAuth();
    },[auth?.token]);
  return ok?<Outlet />:<Spinner path="" />
  
}

export default AdminRoute