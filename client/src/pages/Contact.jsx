import React from "react";
import Layout from "../components/layout/Layout";
import contactImg from "../assets/images/contactus.jpeg";
import { MdOutlineMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { PiHeadphonesFill } from "react-icons/pi";

const Contact = () => {
  return (
    <Layout title={"Contact Us - ECommerce App"}>
      <div className="flex justify-center gap-10 m-4 md:flex-wrap sm:flex-wrap ">
        <div className="w-[600px] ">
          <img className=" object-contain" src={contactImg} alt="" />
        </div>

        <div className="flex flex-col gap-3 h-[400px] lg:justify-center ">
          <h1 className="lg:text-5xl font-semibold text-white bg-black text-center p-3">
            CONTACT US
          </h1>
          <p className="text-md font-medium">
            any query and info about product feel free to call anytime we 24x7{" "}
          </p>

          <p className="flex gap-3 items-center">
            <MdOutlineMail className="font-bold text-2xl text-black" />
            <span className="text-md font-medium cursor-pointer hover:text-blue-700">
              www.help@ecommereceapp.com
            </span>
          </p>

          <p className="flex gap-3 items-center">
            <IoCallOutline className="font-bold text-2xl text-black" />
            <span className="text-md font-medium">0532-342456</span>
          </p>

          <p className="flex gap-3 items-center">
            <PiHeadphonesFill className="font-bold text-2xl text-black" />
            <span className="text-md font-medium">
              1800-22222-4545 (toll free)
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
