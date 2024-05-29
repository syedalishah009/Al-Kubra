import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useGetUsers } from "../../api/users";
import { useEffect, useState } from "react";
import { useGetOrders } from "../../api/orders";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  const [userCount, setUserCount] = useState();
  const [totalOrders, setTotalOrders] = useState();
  const [totalEarn, setTotalEarn] = useState();


  let cardData;

  const { data, status, error } = useGetUsers();
  const { data: orders } = useGetOrders();
  // console.log("ordrs", orders);


  // const usersArray = data?.data;
  // const usersArrayLength = usersArray.length;
  // console.log("lenth", usersArrayLength);

  // console.log("ghhg",data.data.users);

  useEffect(() => {
    if (data || orders) {
      setUserCount(data?.data.users.length);
      setTotalOrders(orders?.data.orders.length);
      setTotalEarn(orders?.data.totalAmount);
    }
  }, [data,orders])

  // console.log("ttt", typeof totalEarn);
  // console.log("ummm",totalOrders);

  //temporary
  // const amount = 10;
  const diff = 20;

  switch (type) {
    case "user":
      cardData = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        route: "/users",
        amount: userCount,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      cardData = {
        title: "ORDERS",
        isMoney: false,
        amount: totalOrders,
        link: "View all orders",
        route: "/orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      cardData = {
        title: "EARNINGS",
        isMoney: true,
        amount: totalEarn?.toFixed(2),
        // link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      cardData = {
        title: "BALANCE",
        isMoney: true,
        amount: 10,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{cardData.title}</span>
        <span className="counter">
          {cardData.isMoney && "Rs"} {cardData.amount}
        </span>
        <Link to={cardData.route} style={{ textDecoration: "none" }}>
          <span className="link">{cardData.link}</span>
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          {/* <KeyboardArrowUpIcon /> */}
          {/* {diff} % */}
        </div>
        {cardData.icon}
      </div>
    </div>
  );
};

export default Widget;
