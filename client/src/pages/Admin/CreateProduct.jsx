import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Input, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // get all categorty
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-shoes-website-backend.onrender.com/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `https://e-commerce-shoes-website-backend.onrender.com/api/v1/product/create-product`,
        productData,
        {
          headers: {
            // Include JWT token in the Authorization header
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        toast.success("Product Created Successfully..");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong..");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="relative bottom-10">
        <AdminMenu />

        <h2 className="text-2xl font-bold mb-4">Create Product</h2>

        <div className="mx-auto w-3/4">
          {/* Select Category */}
          <select
            className="border border-gray-300 rounded-lg p-2 focus:outline-none w-full mb-4"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="" hidden>
              Choose Category
            </option>
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Upload Photo */}
          <label
            htmlFor="upload images"
            className="block border border-gray-300 p-2 rounded-md cursor-pointer mb-4"
          >
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              id="upload images"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="hidden"
            />
          </label>

          {/* Display Uploaded Photo */}
          <div className="mb-4">
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="product image"
                className="border border-blue-700"
                style={{ maxHeight: "200px" }}
              />
            )}
          </div>

          {/* Product Name */}
          <div className="border border-gray-300 rounded-md p-2 mb-4">
            <input
              className="border-none w-full focus:outline-none"
              type="text"
              value={name}
              placeholder="Enter Product Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Product Description */}
          <div className="border border-gray-300 rounded-md p-2 mb-4">
            <textarea
              className="border-none w-full h-40 resize-none focus:outline-none"
              value={description}
              placeholder="Enter Product Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Product Price */}
          <div className="border border-gray-300 rounded-md p-2 mb-4">
            <input
              className="border-none w-full focus:outline-none"
              type="number"
              value={price}
              placeholder="Enter Product Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Product Quantity */}
          <div className="border border-gray-300 rounded-md p-2 mb-4">
            <input
              className="border-none w-full focus:outline-none"
              type="number"
              value={quantity}
              placeholder="Enter Product Quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Product Shipping */}
          <div className="border border-gray-300 rounded-md p-2 mb-4">
            <select
              className="border-none w-full focus:outline-none"
              onChange={(e) => {
                setShipping(e.target.value);
              }}
            >
              <option value="" hidden>
                Select Shipping
              </option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Create Product Button */}
          <div className="border border-gray-300 rounded-md p-2">
            <button
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none"
              onClick={handleCreate}
            >
              CREATE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
