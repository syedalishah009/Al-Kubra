import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { getNewArrivals, getProducts } from "../../api/products";
import SkeletonProductCard from "../SkeletonLoadingComponents/SkeletonProductCard";
import ProductPageCard from "../ProductCard/ProductPageCard";

const NewArrivals = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const { isError, isLoading, data } = useQuery({
    queryKey: ["products", "newArrivals"],
    queryFn: getNewArrivals,
  });

  return (
    <React.Fragment>
      <div className="container">
        <h1 className="heading">New Arrivals</h1>
        <Slider {...settings}>
          {isLoading
            ? [1, 2, 3, 4].map((i) => <SkeletonProductCard key={i} />)
            : data?.products?.map((productItem) => (
                <ProductPageCard
                  key={productItem._id}
                  productItem={productItem}
                />
              ))}
        </Slider>
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

export default NewArrivals;
