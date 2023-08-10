import React from 'react'
import Layout from '../components/Layout/Layout'
import contactus from '../components/images/contactus.jpeg'
import {LuMail,LuPhoneCall, LuHeadphones} from "react-icons/lu";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
        <div className='contact-row'>
            <img src={contactus} alt='contactus_logo'></img>
          <div className='contact-row-col-2'>
            <h1>Contact US</h1>
            <p>any query and info about prduct feel free to call anttime we 24X7 available</p>
            <ul>
              <li><LuMail />  : www.help@ecommerceapp.com</li>
              <li><LuPhoneCall /> : 012-3456789</li>
              <li><LuHeadphones /> : 1800-0000-0000 (toll free)</li>
              <li></li>
            </ul>
            </div>
          </div>
    </Layout>
  )
}

export default Contact