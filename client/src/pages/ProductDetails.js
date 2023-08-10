import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const [product,setProduct] = useState({});
  const params = useParams();
  const [similarProduct, setSimilarProduct] = useState([]);

  useEffect(()=>{
    if(params?.slug)
    getProduct();
  },[params?.slug])

  // get single product
  const getProduct = async()=>
  {
    try {
        const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
        setProduct(data?.product)
        getSimilarProduct(data?.product?._id,data?.product?.category?._id)
        
    } catch (error) {
        console.log(error);   
    }
  }

  // get similar product

  const getSimilarProduct = async(pid,cid)=>{
    try {
        const {data} = await axios.get(`/api/v1/product/similar-product/${pid}/${cid}`);
        setSimilarProduct(data?.products);
    } catch (error) {
        console.log(error)
    }
  }



  return (
    <Layout title={"Products-details"}>
    <div style={{display:"grid"}}>
    <div className='contact-row'>
            <img src={`/api/v1/product/product-photo/${product._id}`} alt='product' style={{maxWidth:'500px', maxHeight:'500px'}}></img>
          <div className='contact-row-col-2'>
            <h1>Product Details</h1>
            <ul>
              <li><span>Name  :</span> {product?.name}</li>
              <li><span>Description :</span> {product?.description}</li>
              <li><span>Price :</span> ₹{product?.price}</li>
              <li><span>Category :</span> {product?.category?.name}</li>
            </ul>
            <button id="add-to-cart">ADD TO CART</button>
            </div>
      </div>
      <div className='admin-col-2'>
       <div className='admin-card'>
         <h2>Similar Products</h2>
         <h5>{similarProduct?.length<1?"Similar Product Not Available ":""}</h5>
       </div>
       <div className='product-list'>
        {
            similarProduct?.map((p)=>(
                
                   <div className='product-menu' key={p._id}>
                    <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name}></img>
                    <div className="product-details">
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                        <h4>₹ {p.price}</h4>
                        <div className="product-btn">
                        <button id="more-details">More Details</button>
                        <button id="add-to-cart">ADD TO CART</button>
                        </div>
                    </div>
                   </div>
            ))    
        }
       </div>
       </div>
    </div>
    </Layout>
  )
}

export default ProductDetails
