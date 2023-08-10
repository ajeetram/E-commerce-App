import React from 'react'
import Layout from './../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
    const [auth] = useAuth();
  return (
    <Layout title={"dashboard"}>
    <div className='admin-dashboard'>
      <div className='admin-col-1'>
        <UserMenu />
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

export default Dashboard