import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders", {
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
    if (auth?.token) getOrders();
    
    // eslint-disable-next-line
  }, [auth?.token]);

  return (
    <Layout title={"dashboard-orders"}>
      <div className="admin-dashboard">
        <div className="admin-col-1">
          <UserMenu />
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
                      <ul id="collection-name" key={i}>
                        <li>{i + 1}</li>
                        <li>{o?.status}</li>
                        <li>{o?.buyer?.name}</li>
                        <li>{moment(o?.createdAt).fromNow()}</li>
                        <li>{o?.payment?.success ? "Success" : "Failed"}</li>
                        <li>{o?.products?.length}</li>
                      </ul>

                      {o?.products?.map((p, i) => {
                        return (
                          <div className="item-row" key={i}>
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
  );
};

export default Orders;
