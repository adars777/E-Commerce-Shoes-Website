import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="w-full bg-blue-700 ">
        <ul className="flex flex-col text-xl text-white px-4 py-4 gap-4">
          <li className="text-center ">
            <Link
              className=" w-full inline-flex items-center justify-center hover:bg-blue-900 px-5 py-3 rounded-lg cursor-pointer  "
              to="/dashboard/admin/create-category"
            >
              Create Category
            </Link>
          </li>

          <li className="text-center">
            <Link
              className="w-full inline-flex items-center justify-center hover:bg-blue-900 px-5 py-3 rounded-lg cursor-pointer"
              to="/dashboard/admin/create-products"
            >
              Create Products
            </Link>
          </li>

          <li className="text-center">
            <Link
              className=" w-full inline-flex items-center justify-center hover:bg-blue-900 px-5 py-3 rounded-lg cursor-pointer"
              to="/dashboard/admin/products"
            >
              All Prodcuts
            </Link>
          </li>

          <li className="text-center">
            <Link
              className="w-full inline-flex items-center justify-center hover:bg-blue-900 px-5 py-3 rounded-lg cursor-pointer"
              to="/dashboard/admin/users"
            >
              All Users Details
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminMenu;
