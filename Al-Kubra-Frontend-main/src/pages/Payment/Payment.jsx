import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../redux/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrder } from "../../api/orders";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
// import { addToInteraction } from "../../redux/userInteraction/userInteractionSlice";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(false);

  const { items, total, subTotal, shippingCost, shippingDetails } = useSelector(
    (state) => state.cart
  );
  const { user, token } = useSelector((state) => state.user);

  const paymentData = {
    amount: Math.round(total * 100),
  };

  const order = {
    shippingInfo: shippingDetails,
    orderItems: items,
    itemsPrice: subTotal,
    taxPrice: 20,
    shippingPrice: shippingCost,
    totalPrice: total,
    noOfItems: items?.length,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true)

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/process/payment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: shippingDetails.name,
            email: user.email,
            address: {
              line1: shippingDetails.address,
              city: "Rawalpindi",
              state: "Punjab",
              postal_code: shippingDetails.pinCode,
              country: "PK",
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        setLoading(false)
        toast(result.error.message, {
          type: "error",
        });
      } 
      // if (result.paymentIntent.status !== "succeeded"){
      //   <div>Loading</div>
      // }
       
      else {
        if (result.paymentIntent.status === "succeeded") {
          setLoading(false)
          toast("Order Successfuly placed!", {
            type: "success",
          });

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          // items.forEach((item) => {
          //   // dispatch(
          //   //   addToInteraction({
          //   //     productId: item.product,
          //   //     category: item.category,
          //   //   })
          //   // );
          // });
          dispatch(emptyCart());
          createOrder({ order, token });
          setTimeout(() => {
            navigate("/profile");
          }, 5000);
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast(error.message, {
        type: "error",
      });
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="container relative my-8 flex justify-center items-center">
        <form
          onSubmit={(e) => submitHandler(e)}
          className="w-[90%] md:w-[400px] shadow-md rounded-md my-8 p-4"
        >
          <h1 className="heading">Card Info</h1>
          <div>
            <CardNumberElement className="border-2 w-[100%] px-2 py-2 rounded-md text-2xl mb-4" />
          </div>
          <div className="flex justify-between">
            <CardExpiryElement className="border-2 w-[40%] px-2 py-2 rounded-md text-2xl mb-4" />
            <CardCvcElement className="border-2 w-[40%] px-2 py-2 rounded-md text-2xl mb-4" />
          </div>
          <input
            value={`Pay $${total}`}
            type="submit"
            className="w-full transition duration-300 ease-in-out hover:bg-[#e94560] bg-white hover:text-white font-bold text-[#e94560] border-2 border-[#e94560] px-4 py-2 mt-2 rounded-md cursor-pointer"
            ref={payBtn}
          />
        </form>

        {loading && (
          <Loader />
        )}
      </div>
    </React.Fragment>
  );
};

export default Payment;
