import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Table from "./components/table/Table";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Products from "./pages/products/Products";
import Users from "./pages/users/Users";
import Orders from "./pages/order/Orders";
import AddProductCard from "./pages/addProduct/AddProductCard";
import Traine from "./pages/traine/Traine";
import DeliveredOrders from "./pages/order/DeliveredOrders";
import OrderDetail from "./pages/order/OrderDetail";
import EditeProduct from "./pages/addProduct/EditProduct";
import TrainiDetail from "./pages/traine/TrainiDetail";
import Profile from "./pages/profile/Profile";
import ProfileUpdate from "./pages/profile/ProfileUpdate";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  
  // const {user} = JSON.parse(localStorage.getItem("currentUser"))
  

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<Users />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<Products />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="orders" element={< Orders/>} />
            <Route path="DeliveredOrders" element={< DeliveredOrders/>} />
            <Route path="OrderDetail/:id" element={< OrderDetail/>} />
            <Route path="AddProductCard" element={< AddProductCard/>} />
            <Route path="AddProductCard/:productId" element={< AddProductCard/>} />
            <Route path="EditeProduct/:productId" element={< EditeProduct/>} />
            <Route path="traine" element={< Traine/>} />
            <Route path="singleTraini/:trainiId" element={< TrainiDetail/>} />
            <Route path="profile" element={< Profile/>} />
            <Route path="profileUpdate/:id" element={< ProfileUpdate/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
