import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add_to_cart } from "../../redux/cart/cartSlice";
import { addToWishList } from "../../redux/wishList/wishListSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "@mui/material/Rating/Rating";
import Button from "../Button/Button";
import { addToInteraction } from "../../redux/interaction/interactionSlice";

const ProductCard = ({ productItem }) => {
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
      <div className="h-[400px] w-[240px] mb-6 mx-2 shadow-xl p-4">
        <div className="relative h-[75%] flex justify-center items-center">
          {/* <span className="absolute top-1 left-1 bg-primary py-1 px-2 rounded-full text-white">
            30% Off
          </span> */}
          <img
            className="max-h-[250px] mx-auto py-2 object-contain"
            src={productItem.images[0].url}
            alt=""
          />
          <div
            onClick={() => handleLike(productItem)}
            className={`absolute cursor-pointer top-1 right-1 ${
              existInWishList ? "text-[#e94560]" : ""
            } hover:text-[#e94560]`}
          >
            <FontAwesomeIcon icon={faHeart} className="icon" />
          </div>
        </div>
        <div className="flex justify-between flex-col">
          <Link className="w-full" to={`/product/${productItem._id}`}>
            <h3 className="hover:text-primary">
              {productItem.name.length < 20
                ? productItem.name
                : `${productItem.name.slice(0, 20)}...`}
            </h3>
          </Link>
          <p className="mt-1">
            <Rating
              name="product-rating" // Provide a unique name to identify the Rating component
              value={productItem.ratings} // The initial rating value
              precision={0.5} // Set the precision of half stars
              readOnly // Make the rating display-only
            />
          </p>
          <div className="flex justify-between mt-0 items-end">
            <h4>Rs {productItem.price}.00 </h4>
            <button
              onClick={() => addItemToCart(productItem)}
              className="w-[35px] py-1 px-1 border border-gray-600 rounded-md shadow-none hover:border-[#e94560] hover:bg-[#e94560] hover:text-white "
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
      <></>

      <ToastContainer />
    </React.Fragment>
  );
};

export default ProductCard;
