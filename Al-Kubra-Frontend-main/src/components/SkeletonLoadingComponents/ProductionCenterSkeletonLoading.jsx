import React from 'react'
import { Link } from 'react-router-dom'

export const ProductionCenterSkeletonLoading = () => {
    return (
        <div className="w-[380px] h-[260px] flex-shrink-0 rounded-md shadow-md overflow-hidden">
            <div className="relative w-full h-[202px] opacity-[0.9] overflow-hidden border-b py-[17px] px-[30px]">
                <div className="absolute inset-0 bg-[#2B3445] bg-opacity-90 rounded-md hover:hidden transition-all ease-in delay-500">
                    {/* Skeleton loading animation */}
                    <div className="animate-pulse absolute inset-0 flex flex-col justify-center items-center text-white py-[17px] px-[30px]">
                        <div className="w-[60%] h-[20px] bg-[#2B3445] rounded-md mb-2"></div>
                        <div className="w-[80%] h-[16px] bg-[#2B3445] rounded-md mb-1"></div>
                        <div className="w-[50%] h-[16px] bg-[#2B3445] rounded-md"></div>
                    </div>
                </div>
                <img
                    className="w-full absolute z-[-10] top-0 left-0"
                    src="./images/arrivals/arrivals2.png"
                    alt=""
                />
            </div>
            <div className="relative h-[58px] flex justify-end items-center">
                <span className="absolute overflow-hidden flex justify-center items-center left-3 top-[-40px] w-[80px] h-[80px] border rounded-full">
                    {/* Skeleton loading animation */}
                    <div className="animate-pulse w-[80px] h-[80px] bg-[#2B3445] rounded-full"></div>
                </span>
                <Link className="h-8 w-8" to={`/production-centers/`}>
                    {/* Arrow icon */}
                </Link>
            </div>
        </div>
    )
}
