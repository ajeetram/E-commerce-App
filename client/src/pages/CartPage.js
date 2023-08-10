import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Layout from "../components/Layout/Layout";
import "./cartpage.css";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // remove cart item
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // total cart amount
  const totalAmount = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
        return total;
    });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gatway token

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post("/api/v1/product//braintree/payment", {
        nonce,
        cart,
      },{
        headers:{
          Authorization:auth?.token,
        }
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="cart-container">
        <div className="cart-row-1">
          <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
          <h3>
            {cart?.length > 1
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "Please login to checkout"
                }`
              : "Your Cart Is Empty"}
          </h3>
        </div>
        <hr />
        <div className="cart-row-2">
          <div className="cart-col-1">
            {cart?.map((p) => (
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
                  <div className="remove-button">
                    <button
                      className="delete-button"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-col-2">
            <h1>Cart Summary</h1>
            <p>Total | Cart | Payment</p>
            <hr />
            {cart?.map((item) => (
              <div className="cart-list" key={item._id}>
                <p>{item.name}</p>
                <p>₹{item.price}</p>
              </div>
            ))}
            <div className="cart-list">
              <h3>Total Amount:</h3>
              <h3>₹{totalAmount()}</h3>
            </div>
            <div>
              {!clientToken || !auth?.token || !cart?.length ? "" : <>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button
                className="edit-button"
                onClick={handlePayment}
                disabled={loading || !instance || !auth?.user?.address}
              >
                {loading ? "proccessing..." : "Make Payment"}
              </button>
              </>}
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
