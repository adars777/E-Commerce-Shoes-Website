import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-screen text-white text-center p-1 fixed bottom-0 bg-black flex justify-around">
      <h2 className="   ">
        All Right Reserved &copy; {new Date().getFullYear()}
      </h2>
      <p className=" text-sm font-light flex gap-4">
        <Link className="hover:border-b-2" to="/about">
          About
        </Link>
        |
        <Link className="hover:border-b-2" to="/contact">
          Contact
        </Link>
        |
        <Link className="hover:border-b-2" to="/policy">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
