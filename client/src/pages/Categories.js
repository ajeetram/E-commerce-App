import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory([]);
  return (
    <Layout title={"all categories"}>
      <div>
        {categories.map((c) => (
          <div key={c._id}>
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
