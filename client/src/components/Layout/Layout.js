import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import {Helmet} from 'react-helmet'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const Layout = ({children,title,description,keywords,author}) => {

  return (
    <div>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author}/>
      <title>{title}</title>
    </Helmet>


  <Header />
    <main>
    {/* <ToastContainer /> */}
        {children}
        </main>
    <Footer></Footer>
    </div>
  )
}

Layout.defaultProps={
  title:"E-commerce App",
  description:"A E-commerce Application",
  keywords:"shirt, pants, quality, trackpants",
  author:"Ajeet"
}
export default Layout