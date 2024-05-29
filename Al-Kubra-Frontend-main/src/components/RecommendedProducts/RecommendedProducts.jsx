import React from "react";
import ProductPageCard from "../ProductCard/ProductPageCard";
import { useQuery } from "@tanstack/react-query";
import { recommend } from "../../api/products";
import SkeletonProductCard from "../SkeletonLoadingComponents/SkeletonProductCard";
import { useSelector } from "react-redux";

const RecommendedProducts = () => {
  const { interaction } = useSelector((state) => state.interaction);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["RecommendedProducts"],
    queryFn: () => recommend({ products: interaction }),
  });

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="heading">Recommended For You</h1>
        <div className="flex flex-wrap">
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((i) => <SkeletonProductCard />)
            : data?.data
                ?.slice(0, 8)
                .map((productItem) => (
                  <ProductPageCard
                    key={productItem._id}
                    productItem={productItem}
                  />
                ))}
        </div>
        {isError ? (
          <div className="w-full h-[400px] flex justify-center items-center">
            <h1>An Error occured while fetching the products</h1>
          </div>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default RecommendedProducts;
