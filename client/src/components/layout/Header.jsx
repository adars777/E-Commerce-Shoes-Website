import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import Search from "../../pages/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropOpen, setIsDropOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropOpen(!isDropOpen);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
    localStorage.removeItem("auth");
    toast.success("logout Successfully");
  };

  return (
    <nav className="bg-gray-800 fixed top-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center w-full justify-between">
            <div>
              <Link to="/" className="flex-shrink-0 text-white">
                Logo
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* home  */}

                <SearchInput />

                <Link
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  to="/"
                >
                  HOME
                </Link>

                {/* category  */}
                {/* <Link
                  className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  to="/category"
                >
                  CATEGORY
                </Link> */}

                <div className="relative">
                  <button
                    className="text-gray-300 flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                    onClick={toggleDropdown}
                  >
                    CATEGORY <span className="text-2xl">▾</span>
                  </button>

                  {isDropOpen && (
                    <div className="absolute z-10 mt-2 bg-white rounded-md shadow-lg">
                      <Link
                        to={`/categories`}
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      >
                        All Categories
                      </Link>
                      {categories.map((c) => (
                        <Link
                          key={c.id}
                          to={`/category/${c.slug}`}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          {c.name}
                        </Link>
                      ))}

                      {/* <Link
                            to="/category"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          >
                            Category 2
                          </Link> */}
                      {/* Add more categories as needed */}
                    </div>
                  )}
                </div>

                {/* --- */}

                {!auth.user ? (
                  <>
                    {/* register  */}
                    <Link
                      className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      to="/register"
                    >
                      REGISTER
                    </Link>
                    {/* login  */}
                    <Link
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      to="/login"
                    >
                      LOGIN
                    </Link>
                  </>
                ) : (
                  <>
                    {/* --- */}

                    {/* dashboard  */}
                    <Link
                      className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      {auth?.user?.name}
                    </Link>
                    {/* logout  */}
                    <Link
                      onClick={handleLogout}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      to="/login"
                    >
                      LOGOUT
                    </Link>

                    {/* --- */}
                  </>
                )}

                {/* cart  */}
                <Link
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  to="/cart"
                >
                  CART ({cart?.length})
                </Link>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 flex flex-col pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            to="/"
          >
            Home
          </Link>

          {/* category */}
          <Link
            className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            to="/category"
          >
            Category
          </Link>

          {!auth.user ? (
            <>
              {/* register  */}
              <Link
                className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/register"
              >
                REGISTER
              </Link>

              {/* login  */}
              <Link
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/login"
              >
                LOGIN
              </Link>
            </>
          ) : (
            <>
              {/* dashboard  */}
              <Link
                className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              >
                {auth?.user?.name}
              </Link>

              {/* logout  */}
              <Link
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                to="/login"
              >
                Logout
              </Link>
            </>
          )}

          <Link
            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            to="/cart"
          >
            Cart ({cart?.length})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
