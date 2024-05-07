import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="w-full bg-blue-700 ">
        <ul className="flex flex-col text-xl text-white px-4 py-4 gap-4">
          <li className="text-center ">
            <Link
              className=" px-5 py-3 rounded-lg hover:bg-blue-900 cursor-pointer text-center  "
              to="/dashboard/user/profile"
            >
              Profile
            </Link>
          </li>

          <li className="text-center">
            <Link
              className=" w-full hover:bg-blue-900 px-5 py-3 rounded-lg cursor-pointer"
              to="/dashboard/user/orders"
            >
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
