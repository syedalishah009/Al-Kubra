import Rating from "@mui/material/Rating/Rating";
import React from "react";
import profilePng from "../../images/Profile.png";

const Review = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-end mb-2">
        <img src={profilePng} alt="User" className="w-[40px] mr-2" />
        <p>{review.name}</p>
      </div>
      <div className="flex flex-col ml-10">
        <Rating {...options} />
        <span className="mt-1 text-gray-700">{review.comment}</span>
      </div>
    </div>
  );
};

export default Review;
