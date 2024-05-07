import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get products list
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);

      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (err) {
      console.error(err);
    }
  };

  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
    }
  };

  // load more function
  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (page == 1) return;
    loadmore();
  }, [page]);

  return (
    <Layout title={"All Products - Best Offers"}>
      {/* {JSON.stringify(checked, 4)} */}
      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-5 gap-6">
        <div className="flex flex-col">
          {/* Filter By Category */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <h4 className="text-xl font-semibold">Filter By Category</h4>
              {/* Add your category filter component here */}
              <div className="flex flex-col">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
            </div>
          </div>

          {/* Filter By Price */}
          <div className="lg:col-span-1">
            {/* {JSON.stringify(radio, 4)} */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold">Filter By Price</h4>
              {/* Add your category filter component here */}
              <div className="flex flex-col">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
          </div>

          {/* reset filter  */}

          <div className="lg:col-span-1">
            <button
              className="bg-red-500 w-[90%] m-auto rounded-md p-2 text-white hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              RESET FILTER
            </button>
          </div>
        </div>

        {/* All Products Section */}
        <div className="lg:col-span-4">
          <div>
            <h1 className="text-3xl font-bold mb-4">All Products</h1>

            {/* Product Grid */}

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
                      <button
                        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Product added to cart.");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              {products && products.length < total && (
                <button
                  className="bg-yellow-400 mt-10 flex flex-row justify-center items-center align-middle px-5 py-3 rounded-full text-3xl"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? <p>Loading...</p> : <p>+</p>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
