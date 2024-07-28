import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (e) {
      console.log(e);
    }
  };
  // get payment gateway
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `https://e-commerce-shoes-website-backend.onrender.com/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `https://e-commerce-shoes-website-backend.onrender.com/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        },
        {
          headers: {
            // Include JWT token in the Authorization header
            Authorization: auth?.token,
          },
        }
      );
      setLoading(false);
      console.log("before remove cart");
      localStorage.removeItem("cart");
      console.log("after remove cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="my-16">
        {auth?.token ? (
          <h2>{`Hello ${auth?.token && auth?.user?.name}`}</h2>
        ) : (
          ""
        )}
        <h4>
          {cart?.length > 1
            ? `You have ${cart.length} products in your cart ${
                auth?.token ? "" : `please login to checkout...`
              }
                `
            : "Your cart is empty."}
        </h4>
      </div>

      {/* ------- */}
      <div className="flex flex-col md:flex-row justify-between">
        {/* Cart items */}
        <div className="flex flex-col w-full md:w-2/3 p-4 gap-4">
          {cart?.map((p) => (
            <div
              key={p._id}
              className="flex p-4 bg-white shadow-md rounded-md overflow-hidden"
            >
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-36 h-32 object-cover"
              />
              <div className="p-4 flex flex-col justify-between gap-4">
                <div className="text-lg font-semibold">{p.name}</div>
                <div className="text-gray-700 font-semibold">${p.price}</div>
                <div>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold rounded-md py-1 w-24"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full gap-4">
          {/* Cart summary */}
          <div className="w-full md:w-1/2 p-4 flex flex-col gap-4">
            <h4 className="text-3xl font-semibold">Cart Summary</h4>
            <p className="text-2xl font-semibold text-amber-700">
              Total | Checkout | Payment
            </p>
            <hr />
            <h4 className="text-xl font-medium">Total: {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div>
                  <h4 className="font-semibold">Current Address:</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="border-2 border-amber-500 p-2 hover:bg-amber-700 hover:text-white"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div>
                {auth?.token ? (
                  <button
                    className="border-2 border-amber-500 p-2 hover:bg-amber-700 hover:text-white"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="border-2 border-amber-500 p-2 hover:bg-amber-700 hover:text-white"
                    onClick={() => {
                      navigate("/login"), { state: "/cart" };
                    }}
                  >
                    Login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Make payment */}
          <div className="w-full md:w-1/2 p-4">
            {!clientToken || !cart?.length ? (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />

                <button
                  className="bg-blue-500 text-white rounded-md hover:bg-blue-700 border-0 p-2"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? "Processing ...." : "Make Payment"}
                </button>
              </>
            )}
          </div>
        </div>
        {/*  */}
      </div>
    </Layout>
  );
};

export default CartPage;
