import React, { useEffect, useState } from 'react'
import './spinner.css'
import { useNavigate,useLocation } from 'react-router-dom';
const Spinner = ({path="login"}) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const interval = setInterval(()=>{
              setCount((preValue)=>--preValue)
        },1000);
        count===0 && navigate(`/${path}`,{
            state:location.pathname
        })
        return ()=> clearInterval(interval);
        
    },[count,navigate,location,path])
  return (
    <div className='spinner-container'>
    <h1>Redirecting to you in {count} second</h1>
      <div className="spinner-3"></div>
    </div>
    
  )
}

export default Spinner