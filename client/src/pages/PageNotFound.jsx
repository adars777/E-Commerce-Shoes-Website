import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={"go back - page not found"}>
      <div className=" flex flex-col justify-center gap-3 text-center items-center relative top-40">
        <h1 className="text-8xl font-semibold text-red-700 tracking-widest">
          404
        </h1>
        <p className="text-red-700 font-medium">Oops! Page Not Found</p>
        <Link to="/">
          <button className="bg-green-400 text-black hover:bg-green-700 hover:text-white font-medium px-3 py-2 rounded-md">
            Go Back
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
