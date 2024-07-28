import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import axios, { all } from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  // get orders
  const getOrders = async () => {
    try {
      console.log("hi get order");
      const { data } = await axios.get(
        `https://e-commerce-shoes-website-backend.onrender.com/api/v1/auth/orders`
      );
      console.log("all data");
      setOrders(data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders - ECommerce App"}>
      <div className="mt-10">
        <h2>orders</h2>
        hi
        <p>{JSON.stringify(orders, null, 4)}</p>
      </div>
    </Layout>
  );
};

export default Orders;
