import "./App.css";
import Footer from "./common/Footer/Footer";
import Header from "./common/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./pages/Products/Products";
import ProductionCenters from "./pages/ProductionCenters/ProductionCenters";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CenterDetails from "./pages/CenterDetails/CenterDetails";
import Apply from "./pages/Training/Apply";
import Signup from "./pages/Authentication/Signup";
import Login from "./pages/Authentication/Login";
import Shipping from "./pages/Shipping/Shipping";
import Confirmation from "./pages/Shipping/Confirmation";
import Payment from "./pages/Payment/Payment";
import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Profile from "./pages/Profile/Profile";
import ForgotPass from "./pages/Authentication/ForgotPass";
import ResetPass from "./pages/Authentication/ResetPass";
import ContactUs from "./pages/ContactUs/ContactUs";
import { useSelector } from "react-redux";
import NotFound from "./components/NotFound/NotFound";
import AboutUs from "./pages/AboutUs/AboutUs";
import Faqs from "./pages/FAQS/Faqs";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get(
      // "https://alkubra.mooo.com/api/v1/stripeapikey"
      "/api/v1/stripeapikey"
    );
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  });

  return (
    <div className="App">
      <Router>
        <Header />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPass />} />
              <Route path="/password/reset/:token" element={<ResetPass />} />
              <Route
                path="/profile"
                element={isAuthenticated ? <Profile /> : <Login />}
              />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:keyword" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/shipping-details"
                element={isAuthenticated ? <Shipping /> : <Login />}
              />
              <Route
                path="/order/confirm"
                element={isAuthenticated ? <Confirmation /> : <Login />}
              />
              <Route
                path="/process/payment"
                element={isAuthenticated ? <Payment /> : <Login />}
              />
              <Route
                path="/production-centers"
                element={<ProductionCenters />}
              />
              <Route
                path="/production-centers/:id"
                element={<CenterDetails />}
              />
              <Route
                path="/apply-for-workshop"
                element={isAuthenticated ? <Apply /> : <Login />}
              />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/Faqs" element={<Faqs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Elements>
        )}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
