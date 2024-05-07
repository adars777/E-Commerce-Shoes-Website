import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

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

  return (
    <Layout>
      <div className="mt-10">
        <h2>{`Hello ${auth?.token && auth?.user?.name}`}</h2>
        <h4>
          {cart?.length > 1
            ? `You have ${cart.length} products in your cart ${
                auth?.token ? "" : "please login to checkout"
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

        {/* Cart summary */}
        <div className="w-full md:w-1/3 p-4 flex flex-col gap-4">
          <h4 className="text-3xl font-semibold">Cart Summary</h4>
          <p className="text-2xl font-semibold text-amber-700">
            Total | Checkout | Payment
          </p>
          <hr />
          <h4 className="text-xl font-medium">Total: {totalPrice()} </h4>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
