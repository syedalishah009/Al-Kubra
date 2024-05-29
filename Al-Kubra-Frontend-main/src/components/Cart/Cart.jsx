import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const user = useSelector((state) => state.user.user);

  const {
    items: cartItems,
    shippingCost,
    subTotal,
    total,
  } = useSelector((state) => state.cart);

  return (
    <React.Fragment>
      <ToastContainer />
      <section className="container">
        <div className="grid md:grid-cols-3 gap-4 my-4">
          <div className="md:col-span-2 rounded-md bg-[#f8f3f4] py-4">
            {cartItems.length === 0 ? (
              <p className="w-full h-full text-3xl font-bold text-center">
                Cart is Empty
              </p>
            ) : (
              cartItems.map((i) => <Card i={i} />)
            )}
          </div>
          <aside className="md:col-span-1 flex flex-col items-center py-4 rounded-md bg-[#f8f3f4]">
            <div className="w-[90%] mx-auto my-[20px] bg-white p-4 shadow-md rounded-md">
              <h1 className="heading">Cart Summary</h1>
              <hr />
              <div className="flex justify-between mt-2">
                <span className="text-lg">Sub Total:</span>
                <span className="text-xl">Rs. {subTotal}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-lg">Shipping:</span>
                <span className="text-xl">Rs. {shippingCost}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-lg">Tax:</span>
                <span className="text-xl">Rs. 0.00</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-lg">Total:</span>
                <span className="text-2xl text-primary font-bold">
                  Rs. {total}
                </span>
              </div>
            </div>
            {cartItems.length > 0 ? (
              <Link
                className="w-[90%] py-2 border-2 border-[#e94560] text-center font-bold text-white rounded-md bg-primary hover:bg-white hover:text-[#e94560]"
                to={user ? "/shipping-details" : "/login"}
              >
                Checkout
              </Link>
            ) : (
              <Link
                className="w-[90%] cursor-not-allowed py-2 border-2 border-[#e94560] text-center font-bold text-white rounded-md bg-primary"
                onClick={() =>
                  toast("Please add items to the Cart", {
                    type: "info",
                  })
                }
                to={"/cart"}
              >
                Checkout
              </Link>
            )}
          </aside>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Cart;
