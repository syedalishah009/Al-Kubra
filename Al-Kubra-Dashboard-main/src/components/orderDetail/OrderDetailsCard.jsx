import React from 'react';
import './orderDetail.scss';
import { format } from "timeago.js";

import { useQuery } from 'react-query';
import { getSingleOrder, useGetOrders, useGetSingleOrder } from '../../api/orders';
import { useSelector } from 'react-redux';


const OrderDetailsCard = ({ id }) => {

  // const orders  = useSelector((state) => state.orders.orders);

  // const data?.data.order = orders.find((order=> order._id === id))


  const { data, status, error } = useGetSingleOrder(id);
  
  // console.log("qsssqq", data);

 

  if (status === "loading") {
    return (<h2>Loading...</h2>)
  }
  if (status === "error") {
    return (<h2>{error}</h2>)
  }

  // const { order } = data;

  return (

    <div className="order-card">
      <div className="order-header">
        <h2>Order Details</h2>
        <p>Order ID: {data?.data.order._id}</p>
        <p>Status: {data?.data.order.orderStatus}</p>
      </div>
      <div className="order-info">
        <div className="address">
          <h3>Address</h3>
          <p>{data?.data.order.shippingInfo.address}</p>
          <p>{data?.data.order.shippingInfo.city}, {data?.data.order.shippingInfo.country}</p>
          <p>{data?.data.order.country} - {data?.data.order.shippingInfo.pinCode}</p>
          <p>Phone: {data?.data.order.shippingInfo.phoneNo}</p>
        </div>
         <div className="payment">
          <h3>Payment Details</h3>
          <p>ID: {data?.data.order.paymentInfo.id}</p>
          <p>Paid At: {format(data?.data.order.paidAt)}</p>
          <p>Total Price: ${data?.data.order.totalPrice.toFixed(2)}</p>
        </div>
        <div className="pricing">
          <h3>Pricing</h3>
          <p>Items Price: ${data?.data.order.itemsPrice.toFixed(2)}</p>
          <p>Tax Price: ${data?.data.order.taxPrice.toFixed(2)}</p>
          <p>Shipping Price: ${data?.data.order.shippingPrice.toFixed(2)}</p>
        </div> 
      </div>
    </div>









  );
};

export default OrderDetailsCard;
