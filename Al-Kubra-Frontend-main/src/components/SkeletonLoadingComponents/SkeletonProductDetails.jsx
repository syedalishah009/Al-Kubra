import React from "react";

const SkeletonProductDetails = () => {
  return (
    <div className="px-5 py-24 mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full py-4 rounded border border-gray-200 animate-pulse">
          <div className="aspect-w-16 aspect-h-9"></div>
        </div>
        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 className="text-sm title-font text-gray-500 tracking-widest animate-pulse">
            {/* Placeholder for BRAND NAME */}
          </h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 animate-pulse">
            {/* Placeholder for product name */}
          </h1>
          <div className="flex items-center mb-2 animate-pulse">
            {/* Placeholder for rating */}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed animate-pulse">
            {/* Placeholder for product description */}
          </p>
          <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5 animate-pulse">
            <div className="rounded-full w-10 h-10 bg-gray-300"></div>
            <div className="rounded-full w-10 h-10 bg-gray-300 ml-4"></div>
            <div className="rounded-full w-10 h-10 bg-gray-300 ml-4"></div>
          </div>
          <div className="flex justify-between">
            <span className="title-font font-medium text-2xl text-gray-900 animate-pulse">
              {/* Placeholder for product price */}
            </span>
            <span>
              {/* Placeholder for Add to Cart button */}
              <div className="rounded-full w-10 h-10 bg-gray-300"></div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProductDetails;
