import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMyOrders } from "../../api/orders";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const { token } = useSelector((state) => state.user);

  const { status, error, data } = useQuery({
    queryKey: ["myOrders"],
    queryFn: () => getMyOrders(token),
  });

  if (status === "loading") return <h1>Loading...</h1>;

  if (status === "error") return <h1>{error}</h1>;

  const { orders } = data;

  return (
    <React.Fragment>
      <div>
        {orders?.length === 0 ? (
          <h1 className="text-center w-full text-xl font-bold">
            No Orders Found
          </h1>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2 text-center">Order ID</th>
                <th className="border p-2 text-center">No. of items</th>
                <th className="border p-2 text-center">Price</th>
                <th className="border p-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`${index > 0 ? "border-t" : ""}`}
                >
                  <td className="p-2 text-center">{order._id}</td>
                  <td className="p-2 text-center">{order.orderItems.length}</td>
                  <td className="p-2 text-center">Rs {order.totalPrice}</td>
                  <td className="p-2 text-center">{order.orderStatus}</td>

                 // <td className="p-2 text-center">${order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};

export default MyOrders;
