import React from 'react';
import OrderDetailsCard from '../../components/orderDetail/OrderDetailsCard';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import SingleTraini from '../../components/singleTraini/SingleTrani';

const TrainiDetail = () => {
    const {trainiId} = useParams();




  return (

    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="orderDetail">
          <SingleTraini trainiId={trainiId} />
        </div>
      </div>
    </div>
  );
};

export default TrainiDetail;
