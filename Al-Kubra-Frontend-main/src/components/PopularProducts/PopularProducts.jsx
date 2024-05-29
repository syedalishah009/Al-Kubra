import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getPopularProducts, getProducts } from "../../api/products";
import SkeletonProductCard from "../SkeletonLoadingComponents/SkeletonProductCard";
import ProductPageCard from "../ProductCard/ProductPageCard";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-[150px] right-[-5px] w-[35px] h-[35px] flex justify-center items-center bg-secondary rounded-full text-white"
      onClick={onClick}
    >
      <button className="next">
        <FontAwesomeIcon icon={faLongArrowAltRight} />
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="absolute z-10 top-[150px] left-[-5px] w-[35px] h-[35px] flex justify-center items-center bg-secondary rounded-full text-white"
      onClick={onClick}
    >
      <button className="prev">
        <FontAwesomeIcon icon={faLongArrowAltLeft} />
      </button>
    </div>
  );
};

const PopularProducts = () => {
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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["popularProducts"],
    queryFn: getPopularProducts,
  });

  return (
    <React.Fragment>
      <div className="container py-[20px]">
        <h1 className="heading">Popular Products</h1>
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

export default PopularProducts;
