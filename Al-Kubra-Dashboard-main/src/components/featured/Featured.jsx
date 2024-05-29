import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import { useGetOrders } from "../../api/orders";




const Featured = () => {
  
  // const [ earnToday, setEarnToday] = useState();
  const { data } = useGetOrders();
// console.log(data);
  
  const now = new Date(); // Current date and time
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(now.getHours() - 24); // 24 hours ago from now



  const deliveredOrdersLast24Hours = data?.data.orders
    .filter(order => order.orderStatus === 'Delivered' && order.deliveredAt)
    .filter(order => new Date(order.deliveredAt) >= twentyFourHoursAgo)
    .map(order => ({ ...order, total: order.totalPrice }));


  const totalAmountLast24Hours = deliveredOrdersLast24Hours?.reduce(
    (total, order) => total + order.total,
    0
  );

  // useEffect(() => {
  //   if (data) {
  //     setEarnToday()
  //   }
  // }, [data])

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={60} text={"60%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">Rs {totalAmountLast24Hours}</p>
        {/* <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p> */}
        {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Featured;
