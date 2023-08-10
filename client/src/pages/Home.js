import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "antd";
import { Checkbox, Radio } from "antd";
import { PriceRange } from "../components/PriceRange";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios("/api/v1/category/getAll-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(false);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(true);
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("something went wrong");
    }
  };

  // filter by category
  const handleFilter = (val, id) => {
    let all = [...checked];
    if (val) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  //get filtered product

  const productFilter = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/filter-product", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) productFilter();
    //eslint-disable-next-line
  }, [checked, radio]);

  //load more fucntion
  const LoadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
      console.log(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    LoadMore();
    //eslint-disable-next-line
  }, [page]);

  return (
    <Layout>
      <div className="home-container">
        <div className="container-col-1">
          <h2>Filter By Categories</h2>
          {categories?.map((item) => (
            <Checkbox
            style={{ color: 'pink' }}
              key={item._id}
              onChange={(e) => handleFilter(e.target.checked, item._id)}
            >
              {item.name}
            </Checkbox>
          ))}
          <h2>Filter By Price</h2>
          <Radio.Group
          
            onChange={(e) => setRadio(e.target.value)}
            className="radio"
          >
            {PriceRange?.map((item) => (
              <Radio style={{ color: 'pink' }} key={item._id} value={item.array}>
                {item.name}
              </Radio>
            ))}
          </Radio.Group>
          <Button onClick={() => window.location.reload()}>RESET Filter</Button>
        </div>
        <div className="admin-col-2">
          <div className="admin-card">
            <h1>All Product list</h1>
          </div>
          <div className="product-list">
            {products?.map((p) => (
              <div className="product-menu" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                ></img>
                <div className="product-details">
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <h4>₹ {p.price}</h4>
                  <div className="product-btn">
                    <button
                      id="more-details"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button 
                    id="add-to-cart"
                    onClick={()=>{setCart([...cart,p]);
                    toast.success("Item added to cart");
                    localStorage.setItem('cart',JSON.stringify([...cart,p]))}}
                    >ADD TO CART</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="loadmore-section">
          {products && products.length < total && (
            <button
              id="loadmore-btn"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {!loading ? (
                "Loading ..."
              ) : (
                <>
                  {" "}
                  Loadmore <AiOutlineReload />
                </>
              )}
            </button>
          )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
