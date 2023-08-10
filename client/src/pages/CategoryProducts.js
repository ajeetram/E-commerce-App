import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CategoryProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="admin-col-2">
        <div className="admin-card">
          <h2> Category-{category?.name}</h2>
          <h5>
            {products?.length < 1
              ? "No Product Found"
              : `${products?.length} product is available`}
          </h5>
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
                  <button id="add-to-cart">ADD TO CART</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
