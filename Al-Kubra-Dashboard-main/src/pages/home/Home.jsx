import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";
import { useGetOrders, useUpdateOrder } from "../../api/orders";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {


  const { data } = useGetOrders();

  
    const {mutate} = useUpdateOrder();
  
    // console.log("data", data);
  
    const handleDeliverOrder = (orderId)=>{
      // upateOrder(dispatch,orderId)
      mutate(orderId, {
        onSuccess: () => {
          setTimeout(() => {
            toast("Order Delivered Successfully", {
              type: "success",
            });
          }, 300);
        }},)
  
    }


  return (
    <>
    <ToastContainer/>
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Processing Orders</div>
         
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
                  order.orderStatus === "Processing" ?
                    (<TableRow key={order._id}>
                      <TableCell className="tableCell">{order._id}</TableCell>
                      <TableCell className="tableCell">
                        <div className="cellWrapper">
                          {order.orderItems.name}
                        </div>
                      </TableCell>
                      <TableCell className="tableCell">{format(order.createdAt)}</TableCell>
                      <TableCell className="tableCell">{order.totalPrice}</TableCell>
                      <TableCell className="tableCell">
                        <span className={`status ${order.orderStatus}`}>{order.orderStatus}</span>
                      </TableCell>
                      <TableCell className="tableCell" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Link to={`/OrderDetail/${order._id}`} style={{ textDecoration: "none" }}>
                          <div className="viewButton">View</div>
                        </Link>
                        <div className="DeliverBtn" onClick={()=> handleDeliverOrder(order._id)}>
                          <button>Deliver Order</button>
                        </div>
                      </TableCell>
                    </TableRow>) : "")}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
