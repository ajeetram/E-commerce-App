import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';


const Search = () => {
    const [values] = useSearch([]);
    const navigate = useNavigate();
  return (
<Layout title={"Search results"}>
        <div className='admin-col-2'>
       <div className='admin-card'>
         <h2>Search Results</h2>
         <h5>
            {values?.results.length<1?"No Product Found":`Found ${values?.results.length} Products`}
        </h5>
       </div>
       <div className='product-list'>
        {
            values?.results.map((p)=>(
                
                   <div className='product-menu' key={p._id}>
                    <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name}></img>
                    <div className="product-details">
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                        <h4>₹ {p.price}</h4>
                        <div className="product-btn">
                        <button id="more-details" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                        <button id="add-to-cart">ADD TO CART</button>
                        </div>
                    </div>
                   </div>
            ))    
        }
       </div>
       </div>
</Layout>
  )
}

export default Search
