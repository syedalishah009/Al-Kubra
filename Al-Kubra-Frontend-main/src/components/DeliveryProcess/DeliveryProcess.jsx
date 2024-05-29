import React from 'react'
import { FaTruck, FaCheckCircle } from 'react-icons/fa';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const DeliveryProcess = () => {
  return (
    
 <div class="w-[85%] mx-auto flex mt-16 mb-3 justify-center">
 <div class="grid sm:grid-cols-3 gap-2">
     <div class="text-center flex flex-col items-center bg-slate-200 p-3 rounded-lg">
         <div class="text-4xl text-blue-500 mb-4">
         <FontAwesomeIcon icon={faTruckFast} />
         </div>
         <h3 class="text-xl font-semibold mb-2">Shipping</h3>
         <p class="text-gray-600">We ship your products with care and speed.</p>
     </div>
     <div class="text-center flex flex-col items-center bg-slate-200 p-3 rounded-lg">
         <div class="text-4xl text-green-500 mb-4">
             <FaTruck />
         </div>
         <h3 class="text-xl font-semibold mb-2">Delivery</h3>
         <p class="text-gray-600">Our reliable delivery partners ensure timely delivery.</p>
     </div>
     <div class="text-center flex flex-col items-center bg-slate-200 p-3 rounded-lg">
         <div class="text-4xl text-purple-500 mb-4">
             <FaCheckCircle />
         </div>
         <h3 class="text-xl font-semibold mb-2">Confirmation</h3>
         <p class="text-gray-600">Receive confirmation and track your order.</p>
     </div>
 </div>
</div>
  )
}

export default DeliveryProcess