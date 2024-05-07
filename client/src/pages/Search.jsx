import React from "react";
import Layout from "../components/layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={"Search Results"}>
      <div>
        <div className="items-center">
          <h1>Search Results</h1>
          <h6 className="text-2xl text-blue-500 font-semibold items-center">
            {values?.results.length < 1
              ? "No Products"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {values?.results.map((p) => (
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
      </div>
    </Layout>
  );
};

export default Search;
