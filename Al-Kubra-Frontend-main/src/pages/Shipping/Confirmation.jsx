import React from "react";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emptyCart } from "../../redux/cart/cartSlice";
import { createOrder } from "../../api/orders";

const Confirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, shippingCost, subTotal, total, shippingDetails } = useSelector(
    (state) => state.cart
  );

  const { user, token } = useSelector((state) => state.user);

  const order = {
    shippingInfo: shippingDetails,
    orderItems: items,
    itemsPrice: subTotal,
    taxPrice: 20,
    shippingPrice: shippingCost,
    totalPrice: total,
    paymentInfo: {
      id: "cashondelivery",
      status: "Cash on delivery",
    },
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(emptyCart());
    createOrder({ order, token });
    setTimeout(() => {
      toast("Order Successfuly placed!", {
        type: "success",
      });
    }, 10);
    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  return (
    <React.Fragment>
      <div className="container py-6">
        <h1 className="heading">Order Details</h1>
        <section className="my-4 flex flex-col lg:flex-row justify-between">
          <div className="w-full lg:w-[60%]">
            <h1 className="text-xl font-bold py-2 text-center w-full">
              Shipping Details
            </h1>
            <table className="w-full  border-collapse border border-gray-300 mt-4">
              <tbody>
                <tr className="bg-white">
                  <td className="bg-gray-100 py-2 px-4 border border-gray-300 text-center font-bold">
                    name
                  </td>
                  <td className="py-2 px-4 text-center border border-gray-300 text-gray-400">
                    {shippingDetails.name}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="bg-gray-100 py-2 px-4 border border-gray-300 text-center font-bold">
                    Country
                  </td>
                  <td className="py-2 px-4 text-center border border-gray-300 text-gray-400">
                    {shippingDetails.country}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="bg-gray-100 py-2 px-4 border border-gray-300 text-center font-bold">
                    State/Province
                  </td>
                  <td className="py-2 px-4 text-center  border border-gray-300 text-gray-400">
                    {shippingDetails.state}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="bg-gray-100 py-2 px-4 border border-gray-300 text-center font-bold">
                    City
                  </td>
                  <td className="py-2 px-4 text-center  border border-gray-300 text-gray-400">
                    {shippingDetails.city}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="bg-gray-100 py-2 px-4 border border-gray-300 text-center font-bold">
                    Address
                  </td>
                  <td className="py-2 px-4 text-center  border border-gray-300 text-gray-400">
                    {shippingDetails.address}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="bg-gray-100 py-2 px-4 border border-gray-300 text-center font-bold">
                    Pin-Code
                  </td>
                  <td className="py-2 px-4 text-center  border border-gray-300 text-gray-400">
                    {shippingDetails.pinCode}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="bg-gray-100 py-2 px-4 border border-gray-300 text-center font-bold">
                    Phone No.
                  </td>
                  <td className="py-2 px-4 text-center  border border-gray-300 text-gray-400">
                    {shippingDetails.phoneNo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-full lg:w-[35%]">
            <h1 className="text-xl font-bold py-2 text-center w-full">Items</h1>
            <table className="w-full  border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="bg-gray-100 py-2 px-4 border border-gray-300">
                    Name
                  </th>
                  <th className="bg-gray-100 py-2 px-4 border border-gray-300">
                    Quantity
                  </th>
                  <th className="bg-gray-100 py-2 px-4 border border-gray-300">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((i, index) => (
                  <tr key={index} className="bg-white">
                    <td className="py-2 px-4 text-center border border-gray-300 text-gray-400">
                      {i.name}
                    </td>
                    <td className="py-2 px-4 text-center border border-gray-300 text-gray-400">
                      {i.quantity}
                    </td>
                    <td className="py-2 px-4 text-center border border-gray-300 text-gray-400">
                      ${i.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="w-full  border-collapse border border-gray-300 my-4">
              <thead>
                <tr>
                  <th className="bg-gray-100 py-2 px-4 border border-gray-300"></th>
                  <th className="bg-gray-100 py-2 px-4 border border-gray-300">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="bg-gray-100 py-2 px-4 border border-gray-300 text-center font-bold">
                    SubTotal
                  </td>
                  <td className="py-2 px-4 text-center border border-gray-300 text-gray-400">
                    ${subTotal}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="bg-gray-100 py-2 px-4 border border-gray-300 text-center font-bold">
                    Shipping Cost
                  </td>
                  <td className="py-2 px-4 text-center border border-gray-300 text-gray-400">
                    ${shippingCost}
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="bg-gray-100 py-2 px-4 border border-gray-300 text-center font-bold">
                    Total
                  </td>
                  <td className="py-2 px-4 text-center text-xl font-bold border border-gray-300 text-gray-400">
                    ${total}
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              text={"Proceed to Payment"}
              onClick={() => navigate("/process/payment")}
              width={"full"}
            />
            <Button
              text={"Cash On Delivery"}
              onClick={(e) => submitHandler(e)}
              width={"full"}
            />
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Confirmation;
