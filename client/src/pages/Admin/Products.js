import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import images from '../../components/images/a1.png'
import Dashboard from './../User/Dashboard';
const Products = () => {
const [products, setProducts] = useState([]);
    // get all products
    const getAllProducts = async()=>{
        try {
            const {data} = await axios.get("/api/v1/product/all-product");
            if(data?.success)
            {
                setProducts(data.product)
            }
            
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    }
useEffect(()=>{
    getAllProducts();
},[])

  return (
    <Layout title={"products"}>
    <div className='admin-dashboard'>
      <div className='admin-col-1'>
        <AdminMenu />
      </div>
      <div className='admin-col-2'>
       <div className='admin-card'>
         <h3>Products</h3>
       </div>
       <div className='product-list'>
        {
            products?.map((p)=>(
                <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`}>
                   <div className='product-menu'>
                    <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name}></img>
                    <div>
                        <h5>{p.name}</h5>
                        <p>{p.description}</p>
                    </div>
                   </div>
                </Link>
            ))    
        }
       </div>
      </div>
    </div>
    </Layout>
  )
}

export default Products