import React from 'react'
import Layout from './../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import './admin-dashboard.css'
import { useAuth } from '../../context/auth';
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
    <div className='admin-dashboard'>
      <div className='admin-col-1'>
        <AdminMenu />
      </div>
      <div className='admin-col-2'>
       <div className='admin-card'>
         <h3>Name : {auth?.user?.name}</h3>
         <h3>Email : {auth?.user?.email}</h3>
         <h3>Mob No. : {auth?.user?.phone}</h3>
       </div>
      </div>
    </div>
    </Layout>
  )
}

export default AdminDashboard