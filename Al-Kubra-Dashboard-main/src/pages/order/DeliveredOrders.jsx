import "./order.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { configureApiInstance } from "../../redux/apiIntance";
import { useQuery } from "react-query";
import { getOrders, useGetOrders } from "../../api/orders";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";



const DeliveredOrders = () => {
  // const dispatch = useDispatch();
  // const [status, setStatus] = useState('Processing');
  // const { data } = useSelector((state) => state.orders.orders);


    // console.log(orders);

    const { data } = useGetOrders();




  // const handleStatusChange = (newStatus) => {
  //   // setStatus(newStatus);
  // };

//   useEffect(() => {
//     getAllOrders(dispatch);
//   }, []); 
  

//  if(isFetching === true) return <h1>Loading...</h1>

//  if(error=== true) return <h1>{error}</h1>

  return (
    <>
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatableTitle">
              <div className="search">
                <input type="text" placeholder="Search..." />
                <SearchOutlinedIcon />
              </div>
              <div>Delivered Orders</div>
              <Link to="/orders" className="link">
               Processing Orders
              </Link>
            </div>
            <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Tracking ID</TableCell>
                <TableCell className="tableCell">Product</TableCell>
                {/* <TableCell className="tableCell">Customer</TableCell> */}
                <TableCell className="tableCell">Date</TableCell>
                <TableCell className="tableCell">Price</TableCell>
                <TableCell className="tableCell">Status</TableCell>
                <TableCell className="tableCell">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.orders.map((order) => 
                order.orderStatus === "Delivered"?
                (<TableRow key={order._id}>
                  <TableCell className="tableCell">{order._id}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      {/* <img src={order.images[0].url} alt="" className="image" /> */}
                      {order.orderItems.name}
                    </div>
                  </TableCell>
                  {/* <TableCell className="tableCell">
                  {users.find(user => user._id === order.user)?.name || "N/A"}
                  </TableCell> */}
                  <TableCell className="tableCell">{format(order.createdAt)}</TableCell>
                  <TableCell className="tableCell">{order.totalPrice}</TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${order.orderStatus}`}>{order.orderStatus}</span>
                  </TableCell>
                  <TableCell className="tableCell" style={{display:"flex", alignItems:"center", gap:"5px"}}>
                  <Link to={`/OrderDetail/${order._id}`} style={{ textDecoration: "none" }}>
                          <div className="viewButton">View</div>
                        </Link>
                  </TableCell>
                </TableRow>):""
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    </>
  );
};

export default DeliveredOrders;
