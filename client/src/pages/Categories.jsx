import React from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="mt-10">
        <div className="flex flex-wrap justify-center">
          {categories.map((c) => (
            <Link key={c.id} to={`/category/${c.slug}`}>
              <button className="m-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg">
                {c.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
