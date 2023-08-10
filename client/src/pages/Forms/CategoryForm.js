import React, { useState } from 'react'
import './forms.css'
const CategoryForm = ({submitHandler,value,setValue}) => {

  return (
    <form onSubmit={submitHandler}>
        <input  type='text' placeholder='Enter new category' value={value} onChange={(e)=>setValue(e.target.value)}></input>
        <button className='edit-button'>Submit</button>
    </form>
  )
}

export default CategoryForm
