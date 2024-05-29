import React from "react";
import Slider from "../../components/Slider/Slider";
import PopularProducts from "../../components/PopularProducts/PopularProducts";
import RecommendedProducts from "../../components/RecommendedProducts/RecommendedProducts";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import Sponsers from "../../components/Sponsers/Sponsers";
import WinterColl from "../../components/Collections/WinterColl";
import DeliveryProcess from "../../components/DeliveryProcess/DeliveryProcess";

const Home = () => {
  return (
    <React.Fragment>
      <Slider />
      <DeliveryProcess />
      <PopularProducts />
      <RecommendedProducts />
      <WinterColl />
      <NewArrivals />
      {/* <Sponsers /> */}
    </React.Fragment>
  );
};

export default Home;
