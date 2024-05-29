import React from 'react';
import OrderDetailsCard from '../../components/orderDetail/OrderDetailsCard';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const OrderDetail = () => {
  const { id } = useParams()



  return (

    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="orderDetail">
          <OrderDetailsCard id={id} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
