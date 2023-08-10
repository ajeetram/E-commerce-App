import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
  return (
    <Layout title={"admin-dashboard-users"}>
    <div className='admin-dashboard'>
      <div className='admin-col-1'>
        <AdminMenu />
      </div>
      <div className='admin-col-2'>
       <div className='admin-card'>
         <h3>All User</h3>
       </div>
      </div>
    </div>
    </Layout>
  )
}

export default Users