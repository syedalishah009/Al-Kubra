import React from 'react'
import Button from "../../components/Button/Button";

const WinterColl = () => {
    return (
        <>
        <div className='flex justify-center'>
        <div class="m-10 w-[90%] mx-4 max-w-screen-lg overflow-hidden rounded-xl border shadow-lg ">
            <div class="flex flex-col bg-gradient-to-b to-[#0f3460] from-[#e94560] overflow-hidden bg-white sm:flex-row md:h-80">
                <div class="flex w-full flex-col p-4  sm:w-1/2 sm:p-8 lg:w-3/5">
                    <h2 class="text-xl font-bold text-white md:text-2xl lg:text-4xl">Winter Collection</h2>
                    <p class="mt-2 text-lg text-white">Elevate Your Style with Our Winter Collection</p>
                    <p class="mt-4 mb-12 max-w-md  text-white">Explore our Winter Collection today and redefine your winter wardrobe with timeless pieces that radiate sophistication and warmth</p>
                    <Button text={"Shop Now"}/>  
                </div>
                <div class="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5 ">
                    <img class="h-full w-full object-cover" src="https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" loading="lazy" />
                </div>
            </div>
        </div>
        </div>
       </>

    )
}

export default WinterColl