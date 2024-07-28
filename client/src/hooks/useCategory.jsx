import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //   getcategory
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-shoes-website-backend.onrender.com/api/v1/category/get-category`
      );
      setCategories(data?.category);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
