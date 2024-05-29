import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const data = [
    {
      cateImg: "./images/category/cat1.svg",
      cateName: "uniforms",
    },
    {
      cateImg: "./images/category/cat1.svg",
      cateName: "Ladies Shirts",
    },
    {
      cateImg: "./images/category/cat1.svg",
      cateName: "Ladies Kurta",
    },
    {
      cateImg: "./images/category/cat1.svg",
      cateName: "Abaya",
    },

    {
      cateImg: "./images/category/cat1.svg",
      cateName: "Kids",
    },
    {
      cateImg: "./images/category/cat1.svg",
      cateName: "Socks",
    },
    {
      cateImg: "./images/category/cat1.svg",
      cateName: "sweater",
    },
    {
      cateImg: "./images/category/cat1.svg",
      cateName: "Shawl",
    },
  ];

  const navigate = useNavigate();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const handleCategoriesMenu = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleSelectCategory = (value) => {
    setIsCategoriesOpen(!isCategoriesOpen);
    const keyword = value.cateName;
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <React.Fragment>
      <section className="relative z-10">
        <h3
          onClick={() => handleCategoriesMenu()}
          className=" py-3 select-none cursor-pointer flex justify-center items-center gap-2  px-8 bg-[#e94560] rounded text-white"
        >
          All Categories
          {isCategoriesOpen ? (
            ""
          ) : (
            <FontAwesomeIcon className="mt-1" icon={faAngleDown} />
          )}
          {isCategoriesOpen ? (
            <FontAwesomeIcon className="mt-1" icon={faAngleUp} />
          ) : (
            ""
          )}
        </h3>
        <div
          className={`${
            isCategoriesOpen ? "" : "hidden"
          } flex  flex-col items-center w-[184px] rounded-b-md absolute bg-white py-1  text-black shadow-lg`}
        >
          {data.map((value, index) => {
            return (
              <div
                onClick={() => handleSelectCategory(value)}
                className="box f_flex hover:bg-[#e94560] hover:text-white cursor-pointer  rounded-sm w-full h-10 flex justify-center items-center"
                key={index}
              >
                <img src={value.cateImg} alt="" />
                <span>{value.cateName}</span>
              </div>
            );
          })}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Categories;
