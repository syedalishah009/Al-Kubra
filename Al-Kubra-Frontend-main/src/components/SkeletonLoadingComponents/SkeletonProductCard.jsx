import React from "react";

const SkeletonProductCard = () => {
  return (
    <div className="h-[400px] w-[240px] md:w-[270px] mb-6 mx-2 shadow-xl p-4">
      <div className="relative h-[75%] flex justify-center items-center">
        <span className="absolute top-1 left-1 bg-primary py-1 px-2 rounded-full text-white animate-pulse">
          &nbsp;
        </span>
        <div className="animate-pulse bg-gray-200 w-full h-[250px] max-h-[250px] mx-auto py-2 object-contain"></div>
        <div className="absolute cursor-pointer top-1 right-1 animate-pulse">
          &nbsp;
        </div>
      </div>
      <div className="flex justify-between flex-col">
        <div className="w-full">
          <div className="animate-pulse bg-gray-200 w-3/4 h-4 mb-1 rounded"></div>
        </div>
        <div className="mt-1">
          <div className="animate-pulse bg-gray-200 w-1/4 h-4 mb-1 rounded"></div>
        </div>
        <div className="flex justify-between mt-0 items-end">
          <div className="animate-pulse bg-gray-200 w-1/5 h-4 mb-1 rounded"></div>
          <div className="animate-pulse bg-gray-200 w-8 h-8 mb-1 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductCard;
