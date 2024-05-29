import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import {
  add_to_cart,
  decrement,
  remove_from_cart,
  increment,
} from "../../redux/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = ({ i }) => {
  const dispatch = useDispatch();

  const increaseQty = (i) => {
    if (i.quantity === i.stock) {
      toast(`${i.name}'s stock is ${i.stock}, can't be increased`, {
        type: "warning",
      });
      return;
    } else {
      dispatch(increment(i));
    }
  };
  return (
    <React.Fragment>
      <ToastContainer />
      <div className="bg-white mt-[30px] flex justify-between w-[90%] mx-auto shadow-md rounded-md">
        <div className="w-[150px] h-[150px]">
          <img className="w-full h-full object-contain" src={i.image} alt="" />
        </div>
        <div>
          <h3 className="text-[20px] font-[500] mt-[20px]">{i.name}</h3>
          <h4 className="flex flex-col md:flex-row text-[15px] font-[400] md:mt-[50px] text-gray-500">
            <span>{`Rs. ${i.price}.00 *` + i.quantity}</span>
            <span className="text-[#e94560] ml-[20px] font-[500]">
              Rs. {i.price * i.quantity}.00
            </span>
          </h4>
        </div>
        <div className="flex flex-col justify-between">
          <button
            onClick={() => dispatch(remove_from_cart(i))}
            className="bg-none text-[25px] text-right mr-[10px]"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <div className="cartControl d_flex">
            <button
              className="bg-none border border-black text-primary w-[40px] h-[40px] m-[10px] rounded-md text-[20px]"
              onClick={() => increaseQty(i)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button
              className="bg-white border border-black text-primary w-[40px] h-[40px] m-[10px] rounded-md text-[20px]"
              onClick={() => dispatch(decrement(i))}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
