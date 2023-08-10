import React, { useState,useEffect } from 'react'
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import axios from 'axios';
import { Select} from 'antd';
import { Option } from 'antd/es/mentions';
const AdminOrders = () => {

    const [status] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"]);

    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders", {
        headers: {
          Authorization: auth?.token,
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllOrders();
    // eslint-disable-next-line
  }, [auth?.token]);

  const handleChange = async(orderId, value)=>{
    try {
         await axios.put(`/api/v1/auth/order-status/${orderId}`,{status:value},{
            headers:{
                Authorization:auth?.token,
            }
        });
        getAllOrders();
        
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Layout title={"all orders"}>
      <div className="admin-dashboard">
        <div className="admin-col-1">
          <AdminMenu />
        </div>
        <div className="admin-col-2">
          <div className="admin-card">
            <h2>All Orders</h2>
            <div className="item-section">
              <div className="items">
                <ul>
                  <li>#</li>
                  <li>Status</li>
                  <li>Buyer</li>
                  <li>Date</li>
                  <li>Payment</li>
                  <li>Quantity</li>
                </ul>
                {orders?.map((o, i) => {
                  return (
                    <>
                      <ul id="collection-name" key={o._id}>
                        <li>{i + 1}</li>
                        <li>
                            <Select 
                            onChange={(value,orderId)=>handleChange(o._id, value)} 
                            defaultValue={o?.status}>
                            {
                                status.map((s,i)=>(
                                    <Option key={i+1} value={s}>
                                        {s}
                                    </Option>
                                ))
                            }
                            </Select>
                        </li>
                        <li>{o?.buyer?.name}</li>
                        <li>{moment(o?.createdAt).fromNow()}</li>
                        <li>{o?.payment?.success ? "Success" : "Failed"}</li>
                        <li>{o?.products?.length}</li>
                      </ul>

                      {o?.products?.map((p, i) => {
                        return (
                          <div className="item-row" key={p._id}>
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              alt={p.name}
                              style={{ width: "100px", height: "150px" }}
                            ></img>
                            <div className="item-col">
                              <p>{p.name}</p>
                              <p>{p.description.substring(0, 30)}...</p>
                              <p>₹{p.price}</p>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  );
                })}
              </div>
              </div>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default AdminOrders
