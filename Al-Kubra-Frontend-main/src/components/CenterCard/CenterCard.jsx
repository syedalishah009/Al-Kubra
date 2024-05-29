import {
  ArrowRightIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const CenterCard = ({ center }) => {
  // const isLoading = true;
  return (
    <React.Fragment>
      <div className="w-[380px] h-[260px] flex-shrink-0 rounded-md shadow-md overflow-hidden">
        <div className="relative w-full h-[202px] opacity-[0.9] overflow-hidden border-b py-[17px] px-[30px]">
          <div className="absolute inset-0 bg-[#2B3445] bg-opacity-90 rounded-md hover:hidden transition-all ease-in delay-500">
            <div className="absolute text-white py-[17px] px-[30px]">
              <h1 className="text-xl font-bold mb-2">{center.name}</h1>
              <p></p>
              <p className="flex mb-1">
                <MapPinIcon className="h-6 w-6 mr-1" aria-hidden="true" />
                <span>{center.location}</span>
              </p>
              <p className="flex">
                <PhoneIcon className="h-6 w-6 mr-1 " aria-hidden="true" /> 0300
                0000000
              </p>
            </div>
          </div>
          <img
            className="w-full absolute z-[-10] top-0 left-0"
            src="./images/center-card-img.jpg"
            alt=""
          />
        </div>
        <div className="relative h-[58px] flex justify-end items-center">
          <span className="absolute overflow-hidden flex justify-center items-center left-3 top-[-40px] w-[80px] h-[80px] border rounded-full">
            <img
              className="w-full object-contain"
              src="./images/center-logo.jpeg"
              alt="Logo"
            />
          </span>
          <Link className="h-8 w-8" to={`/production-centers/${center._id}`}>
            <ArrowRightIcon
              className="h-6 w-6 mr-[30px] hover:text-[#ee637a]"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CenterCard;
