import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  //   life cycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    // <Layout title={"Dashboard - All Product"}>
    //   <div className="relative bottom-10">
    //     <AdminMenu />
    //     {/* ====== */}
    //     <div className="p-6">
    //       <h1 className="text-3xl font-bold mb-8">All Products List</h1>
    //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    //         {products?.map((p) => (
    //           <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
    //             <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
    //               <img
    //                 src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
    //                 alt={p.name}
    //                 className="w-full h-40 object-contain rounded-t-lg mb-4"
    //               />
    //               <div>
    //                 <h5 className="font-semibold text-lg mb-2">{p.name}</h5>
    //                 <p className="text-gray-600">{p.description}</p>
    //               </div>
    //             </div>
    //           </Link>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </Layout>

    // <Layout title={"Dashboard - All Product"}>
    //   <div className="relative bottom-10">
    //     <AdminMenu />
    //     {/* ====== */}
    //     <div className="p-6">
    //       <h1 className="text-3xl font-bold mb-8">All Products List</h1>
    //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    //         {products?.map((p) => (
    //           <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
    //             <div className="w-full h-full">
    //               <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg h-full">
    //                 <img
    //                   src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
    //                   alt={p.name}
    //                   className="w-full h-40 object-contain rounded-t-lg mb-4"
    //                   style={{ aspectRatio: "16/9" }} // Maintain aspect ratio
    //                 />
    //                 <div>
    //                   <h5 className="font-semibold text-lg mb-2">{p.name}</h5>
    //                   <p className="text-gray-600">{p.description}</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </Link>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </Layout>

    <Layout title={"Dashboard - All Product"}>
      <div className="relative bottom-10">
        <AdminMenu />
        {/* ====== */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-8">All Products List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products?.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                <div className="w-full h-full">
                  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg h-full">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-40 object-cover rounded-t-lg mb-4"
                      style={{ aspectRatio: "16/9" }} // Maintain aspect ratio
                    />
                    <div className="flex flex-col flex-grow">
                      <h5 className="font-semibold text-lg mb-2">{p.name}</h5>
                      <p className="text-gray-600 flex-grow">
                        {p.description.substring(0, 150)}...
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
