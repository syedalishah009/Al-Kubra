import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

import React, { useState } from "react";
import { faHeart, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from "../../redux/cart/cartSlice";
import { addToWishList } from "../../redux/wishList/wishListSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "@mui/material/Rating/Rating";
import Button from "../Button/Button";
import { addToInteraction } from "../../redux/interaction/interactionSlice";

const ProductPageCard = ({ productItem }) => {
  const dispatch = useDispatch();
  const wishListItems = useSelector((state) => state.wishList.items);

  const addItemToCart = (productItem) => {
    if (productItem.Stock === 0) {
      toast("Out of Stock!", {
        type: "info",
      });
      return;
    } else {
      dispatch(
        addToInteraction({
          productId: productItem._id,
          category: productItem.category,
        })
      );
      dispatch(add_to_cart(productItem));
    }
  };

  const handleLike = (productItem) => {
    dispatch(addToWishList(productItem));
    dispatch(
      addToInteraction({
        productId: productItem._id,
        category: productItem.category,
      })
    );
  };

  const existInWishList = wishListItems.some(
    (item) => item._id === productItem._id
  );

  return (
    <React.Fragment>
      <>
        <ToastContainer />
        <div class="relative h-[430px] w-[270px] m-4 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <Link to={`/product/${productItem._id}`}>
            <div
              class="relative w-[90%]  mx-3 mt-3 flex justify-center h-60 overflow-hidden rounded-xl"
              href="#"
            >
              <img
                class="object-cover "
                src={productItem.images[0].url}
                alt="product image"
              />
              {/* <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                39% OFF
              </span> */}
            </div>
          </Link>
          <div
            onClick={() => handleLike(productItem)}
            className={`absolute cursor-pointer right-4 top-3 ${
              existInWishList ? "text-[#e94560]" : ""
            } hover:text-[#e94560]`}
          >
            <FontAwesomeIcon icon={faHeart} className="icon" />
          </div>
          <div class="mt-4 px-5 pb-5">
            <Link to={`/product/${productItem._id}`}>
              <h5 class="tracking-tight text-slate-900">
                {productItem.name.length < 25
                  ? productItem.name
                  : `${productItem.name.slice(0, 25)}...`}
              </h5>
            </Link>
            <div class="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span class="text-2xl mr-3 font-bold text-slate-900">
                  Rs.{productItem.price}.0
                </span>
                {/* <span class="text-sm text-slate-900 line-through">$699</span> */}
              </p>
              <div class="flex items-center">
                <Rating
                  name="product-rating" // Provide a unique name to identify the Rating component
                  value={productItem.ratings} // The initial rating value
                  precision={0.5} // Set the precision of half stars
                  readOnly // Make the rating display-only
                />
                <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  {productItem.ratings.toFixed(1)}
                </span>
              </div>
            </div>

            <Button
              icon={<AiOutlineShoppingCart style={{ fontSize: "1.5em" }} />}
              onClick={() => addItemToCart(productItem)}
              text={"Add to cart"}
              width={"full"}
              type="submit"
            />
          </div>
        </div>
      </>

      <ToastContainer />
    </React.Fragment>
  );
};

export default ProductPageCard;
