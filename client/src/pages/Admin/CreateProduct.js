import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { FaUpload } from 'react-icons/fa'
import { toast } from "react-toastify";
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'


const CreateProduct = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto]= useState("");
  const [name, setName]= useState("");
  const [price, setPrice]= useState("");
  const [category, setCategory]= useState("");
  const [description, setDescription]= useState("");
  const [quantity, setQuantity]= useState("");
  const [shipping, setShipping] = useState(false);

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

  // create product handler
  const createProductHandler = async(e)=>{
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("photo",photo);
      productData.append("quantity",quantity);
      productData.append("category",category);

      const {data} = await axios.post("/api/v1/product/create-product",productData,{
        
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

  return (
    <Layout title={"admin-create-product"}>
    <div className='admin-dashboard'>
      <div className='admin-col-1'>
        <AdminMenu />
      </div>
      <div className='admin-col-2'>
       <div className='admin-card'>
        <h2>Create Product</h2>
        <Select 
        placeholder="Select a category"
        size="large"
        showSearch
        className='form-select'
        onChange={(value)=>{setCategory(value)}}
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
          onChange={(value)=>{setShipping(value)}}>
          <Option value="0">No</Option>
          <Option value="1">Yes</Option>
          </Select>
          <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
          <button className='edit-button' onClick={createProductHandler}>Create Product</button>
          
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
          {photo &&(
              <img 
              src={URL.createObjectURL(photo)}
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

export default CreateProduct