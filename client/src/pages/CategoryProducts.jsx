import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-shoes-website-backend.onrender.com/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="my-10">
        <div className="flex flex-col my-5 justify-center items-center">
          <h1 className="text-xl font-semibold items-center">
            Category - {category?.name}
          </h1>
          <h1 className="text-blue-700 font-semibold">
            {products?.length} Products Founds
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products?.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              style={{ minWidth: "0" }} // Ensure minimum width for responsiveness
            >
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 flex-1">
                <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
                <p className="text-gray-600 mb-4">
                  {p.description.substring(0, 100)} <b>...</b>
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-800 font-semibold">
                    ${p.price}
                  </span>
                  {/* Add Add to Cart button or link here */}
                </div>
                <div className="flex flex-col">
                  <button
                    className="bg-zinc-400 text-white py-2 rounded-md mb-2 hover:bg-zinc-500 transition duration-300"
                    onClick={() => {
                      navigate(`/product/${p.slug}`);
                    }}
                  >
                    More Details
                  </button>
                  <button className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    ADD TO CART
                  </button>
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
