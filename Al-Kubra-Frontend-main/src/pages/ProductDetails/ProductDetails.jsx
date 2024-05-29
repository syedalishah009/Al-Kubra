import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { feedback, getProduct } from "../../api/products";
import Review from "../../components/Review/Review";
import Rating from "@mui/material/Rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import SkeletonProductDetails from "../../components/SkeletonLoadingComponents/SkeletonProductDetails";
import { add_to_cart } from "../../redux/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToWishList } from "../../redux/wishList/wishListSlice";
import Button from "../../components/Button/Button";
import { addToInteraction } from "../../redux/interaction/interactionSlice";
// import { addToInteraction } from "../../redux/userInteraction/userInteractionSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { token, user } = useSelector((state) => state.user);

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

  const feedbackData = {
    productId: id,
    comment,
    rating,
  };

  const { isSuccess, data, error, isLoading, refetch } = useQuery({
    queryKey: ["products", parseInt(id)],
    queryFn: () => getProduct(id),
  });

  const { mutate } = useMutation(feedback, {
    onSuccess: () => {
      console.log("feedback success");
      refetch();
      setComment("");
      setRating(0);
    },
    onError: (error) => {
      console.log("Err: ", error);
    },
  });

  if (isLoading) {
    return (
      <div className="body-font container overflow-hidden">
        <SkeletonProductDetails />
      </div>
    );
  }

  if (error) return <h1>{error.message}</h1>;

  const { product } = data;

  const existInWishList = wishListItems.some(
    (item) => item._id === product._id
  );

  if (isSuccess) {
    dispatch(
      addToInteraction({
        productId: product._id,
        category: product.category,
      })
    );
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <section className="body-font container overflow-hidden">
        <div className=" px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full py-4 rounded border border-gray-200 flex justify-center align-center">
              <img
                alt="ecommerce"
                className="w-[80%]"
                src={product.images[0].url}
              />
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <div className="flex items-center mb-2">
                <Rating
                  value={product.ratings}
                  readOnly={true}
                  precision={0.1}
                />
                <span className="ml-3 text-gray-700">
                  {product.numOfReviews ? product.numOfReviews : "No"} Reviews
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <hr className="my-4" />
              <div className="flex justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {`$${product.price}`}
                </span>
                <span className="flex items-center">
                  <Button
                    text={"Add to Cart"}
                    onClick={() => addItemToCart(product)}
                  />
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 hover:text-primary ml-4">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className={
                        existInWishList
                          ? `w-5 h-5 text-[#e94560]`
                          : `w-5 h-5 hover:text-[#e94560]`
                      }
                      onClick={() => dispatch(addToWishList(product))}
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <h1 className="text-gray-600 font-bold tracking-widest">Reviews</h1>
            <hr className="my-2" />
            <div className="flex flex-col gap-2 mb-6 md:w-[80%] mx-auto">
              {product.reviews.map((review) => (
                <div>
                  <Review review={review} />
                </div>
              ))}
            </div>
          </div>
          {
            user?<div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-gray-600 font-bold tracking-widest">
              My Feedback
            </h1>
            <hr className="my-2" />
            <div className="w-full flex flex-col">
              <Rating
                value={rating}
                precision={0.5}
                onChange={(e) => setRating(e.target.value)}
              />
              <textarea
                type="text"
                name="comment"
                id="comment"
                className="w-full my-2 p-2 border-2 border-gray-500 outline-none rounded-md"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                text={"Submit Feedback"}
                width={"full"}
                onClick={() => mutate({ feedbackData, token })}
              />
            </div>
          </div>:""
          }
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductDetails;
