import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="w-full bg-blue-700 ">
        <ul className="flex flex-col text-xl text-white px-4 py-4 gap-1">
          <li className=" px-5 py-3 text-center hover:bg-blue-800">
            <Link
              className="  rounded-lg hover:bg-blue-800 cursor-pointer text-center  "
              to="/dashboard/user/profile"
            >
              Profile
            </Link>
          </li>

          <li className=" px-5 py-3 text-center hover:bg-blue-800">
            <Link
              className="rounded-lg hover:bg-blue-800 cursor-pointer text-center "
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
