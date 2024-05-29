import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard/ProductCard";

const WishList = () => {
  const wishListItems = useSelector((state) => state.wishList.items);

  return (
    <React.Fragment>
      <h1 className="heading">Wish List</h1>
      <div className="w-full flex flex-wrap justify-center md:justify-start">
        {wishListItems.map((item) => (
          <ProductCard productItem={item} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default WishList;
