import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { json, useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();

  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // initial product details

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  // get products
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-shoes-website-backend.onrender.com/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (err) {
      console.error(err);
    }
  };

  // get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-shoes-website-backend.onrender.com/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className="w-full h-[500px] object-contain p-10"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col p-4">
          <h1 className="text-xl font-semibold mb-2">Product Details</h1>
          <h5 className="text-xl font-semibold mb-2">
            <span className="text-xl font-semibold">Name:</span> {product.name}
          </h5>
          <p className="text-gray-600 mb-2 font-medium">
            <span className="text-xl text-black font-semibold">
              {" "}
              Description:{" "}
            </span>
            {product.description}
          </p>
          <p className="text-black-600 font-medium mb-2">
            <span className="text-xl text-black font-semibold"> Price: </span>$
            {product.price}
          </p>
          <p className="text-gray-800 font-medium mb-2">
            <span className="text-xl text-black font-semibold">
              {" "}
              Category:{" "}
            </span>
            {product.category?.name}
          </p>
          <button className="bg-blue-500 text-sm p-2 text-white py-2 rounded-md mb-4 hover:bg-blue-600 transition duration-300 self-start">
            ADD TO CART
          </button>
        </div>
      </div>

      <div className="mt-10 p-10">
        <h3 className="text-2xl font-semibold m-4 text-blue-500 items-center align-middle">
          similar products
        </h3>
        {/* <h1>{JSON.stringify(relatedProduct, null, 4)}</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {relatedProduct?.map((p) => (
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

export default ProductDetails;
