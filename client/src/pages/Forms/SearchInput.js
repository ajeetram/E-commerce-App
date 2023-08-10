import React from 'react'
import {useSearch} from '../../context/search.js'
import { toast } from 'react-toastify';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        const {data} = await axios.get(`/api/v1/product/search/${values.keyword}`);
        setValues({...values, results:data});
        navigate("/Search")
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
        type='search'
        placeholder='Search'
        aria-label='Search'
        // value={values.keyword}
        onChange={(e)=>setValues({...values, keyword:e.target.value})}>
        </input>
        <button type='submit' id='more-details'> Search</button>
      </form>
    </div>
  )
}

export default SearchInput
