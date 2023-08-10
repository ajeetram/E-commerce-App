import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { FaUpload } from 'react-icons/fa'
import { toast } from "react-toastify";
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/auth'



const UpdateProduct = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto]= useState("");
  const [name, setName]= useState("");
  const [price, setPrice]= useState("");
  const [category, setCategory]= useState("");
  const [description, setDescription]= useState("");
  const [quantity, setQuantity]= useState("");
  const [shipping, setShipping] = useState(false);
  const [id,setId] = useState("");

  // get single product
  const getSingleProduct = async()=>{
    try {
        const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
         setName(data.product.name);
         setId(data.product._id);
         setDescription(data.product.description);
         setPrice(data.product.price);
         setQuantity(data.product.quantity);
         setShipping(data.product.shipping);
         setCategory(data.product.category._id);
         console.log(data.product.name);
        
    } catch (error) {
        console.log(error);
        toast.error("something went wrong");
    }
  }
 
  useEffect(()=>{
    getSingleProduct();
    //eslint-disable-next-line
  },[])

   // fetch all category
   const getAllCategory = async () => {
    try {
      const { data } = await axios("/api/v1/category/getAll-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update product handler
  const updateProductHandler = async(e)=>{
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      photo && productData.append("photo",photo);
      productData.append("quantity",quantity);
      productData.append("category",category);
      
      const {data} = await axios.put(`/api/v1/product/update-product/${id}`,productData,{
        
          headers: {
            Authorization: auth?.token,
          }
      });
      if(data?.success)
      {
        toast?.success(data?.message);
        navigate("/dashboard/admin/products");
      }
      else
      {
        toast.error(data?.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating product")
    }
  }

  // delete product handler

  const deleteProductHandler = async()=>{
    try {
        const answer = window.prompt("Type 'yes' to delete this product");
        if(!answer) return 
        await axios.delete(`/api/v1/product/delete-product/${id}`)
        toast.success("product deleted successfully");
        navigate('/dashboard/admin/products')
        
    } catch (error) {
        console.log(error)
        toast.error("something went wrong")
        
    }
  }

  return (
    <Layout title={"admin-create-product"}>
    <div className='admin-dashboard'>
      <div className='admin-col-1'>
        <AdminMenu />
      </div>
      <div className='admin-col-2'>
       <div className='admin-card'>
        <h2>Update Product</h2>
        <Select 
        placeholder="Select a category"
        size="large"
        showSearch
        className='form-select'
        onChange={(value)=>{setCategory(value)}}
        value={category}
        >
        {
          categories?.map((item)=>(
            <Option key={item._id} value={item._id}>
             {item.name}
            </Option>
          ))
        }

        </Select>
        
        <div className='create-product-form'>
          <input type='text' placeholder='Enter Product Name' value={name} onChange={(e)=>setName(e.target.value)}></input>
          <textarea type='text' placeholder='Enter Product Description...' value={(description)} onChange={(e)=>setDescription(e.target.value)}></textarea>
          <input type='number' placeholder='Enter Product Price' min={0} value={price} onChange={(e)=>setPrice(e.target.value)}></input>
          <input type='number' placeholder='Enter Product Quantity'min={0}  value={quantity} onChange={(e)=>setQuantity(e.target.value)}></input>
          <Select
          placeholder="Select shipping"
          size="large"
          className='form-select'
          value={shipping?"Yes":"No"}
          onChange={(value)=>{setShipping(value)}}>
          <Option value="0">No</Option>
          <Option value="1">Yes</Option>
          </Select>
          <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
          <button className='edit-button' onClick={updateProductHandler}>Update Product</button>
          
          <button className='delete-button' onClick={deleteProductHandler}>Delete Product</button>
          
          <label className='upload-button'>
            {photo?photo.name:<>Upload Photo <FaUpload /></>}
            <input
            type='file'
            name="photo"
            accept='image/*'
            onChange={(e)=>setPhoto(e.target.files[0])}
            hidden>
            </input>
          </label>
          </div>
          <div style={{textAlign:"center"}}>
          {photo ?(
              <img 
              src={URL.createObjectURL(photo)}
              alt='product_phtot'
              style={{height:"150px", width:"100px"}}></img>
          ):(
              <img 
              src={`/api/v1/product/product-photo/${id}`}
              alt='product_phtot'
              style={{height:"150px", width:"100px"}}></img>
          )}
        </div>
        </div>
       </div>
      </div>
    </div>
    </Layout>
  )
}

export default UpdateProduct