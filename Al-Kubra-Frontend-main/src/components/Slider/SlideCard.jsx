import React from "react";
import Sdata from "./Sdata";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const SlideCard = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
  };
  return (
    <>
      <Slider {...settings}>
        {Sdata.map((value, index) => {
          return (
            <span key={value.id}>
              <div className="flex flex-col-reverse md:flex-row justify-between md:mt-[80px] md:mx-12 mx-4 z-0">
                <div className="md:w-[50%]">
                  <h1 className="text-3xl mb-4 font-bold">{value.title}</h1>
                  <p className=" mb-4 text-gray-600">{value.desc}</p>
                  <Button
                    onClick={() => navigate("/products")}
                    text={"Visit Collections"}
                  />
                </div>
                <div className="right flex flex-row-reverse">
                  <img className="w-[70%]" src={value.cover} alt="" />
                </div>
              </div>
            </span>
          );
        })}
      </Slider>
    </>
  );
};

export default SlideCard;
