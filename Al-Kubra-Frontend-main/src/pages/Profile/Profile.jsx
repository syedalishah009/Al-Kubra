// import React, { useState } from "react";
// import UserDetail from "./UserDetail";
// import ChangePassword from "./ChangePassword";
// import WishList from "./WishList";
// import MyOrders from "./MyOrders";

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState("userDetails");

//   return (
//     <React.Fragment>
//       <div className="container h-[80vh]">
//         <div className="flex h-full flex-col">
//           <section className="w-full md:w-1/4 bg-gray-100 p-4 flex flex-col">
//             <button
//               className={`mb-2 p-2 rounded ${
//                 activeTab === "userDetails"
//                   ? "bg-[#e94560] text-white"
//                   : "hover:text-[#e94560]"
//               }`}
//               onClick={() => setActiveTab("userDetails")}
//             >
//               User Details
//             </button>
//             <button
//               className={`mb-2 p-2 rounded ${
//                 activeTab === "wishList"
//                   ? "bg-[#e94560] text-white"
//                   : "hover:text-[#e94560]"
//               }`}
//               onClick={() => setActiveTab("wishList")}
//             >
//               Wish List
//             </button>
//             <button
//               className={`mb-2 p-2 rounded ${
//                 activeTab === "my-orders"
//                   ? "bg-[#e94560] text-white"
//                   : "hover:text-[#e94560]"
//               }`}
//               onClick={() => setActiveTab("my-orders")}
//             >
//               My Orders
//             </button>
//             <button
//               className={`mb-2 p-2 rounded ${
//                 activeTab === "changePassword"
//                   ? "bg-[#e94560] text-white"
//                   : "hover:text-[#e94560]"
//               }`}
//               onClick={() => setActiveTab("changePassword")}
//             >
//               Change Password
//             </button>
//           </section>
//           <div className="w-full md:w-3/4 p-4 my-8">
//             {activeTab === "userDetails" ? <UserDetail /> : null}
//             {activeTab === "changePassword" ? <ChangePassword /> : null}
//             {activeTab === "wishList" ? <WishList /> : null}
//             {activeTab === "my-orders" ? <MyOrders /> : null}
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import UserDetail from "./UserDetail";
import ChangePassword from "./ChangePassword";
import WishList from "./WishList";
import MyOrders from "./MyOrders";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("userDetails");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setDropdownOpen(false); 
  };

  return (
    <React.Fragment>
      <div className="container min-h-[80vh]">
        <div className="flex h-full flex-col md:flex-row">
          <section className="hidden h-full md:flex md:w-1/4 bg-gray-100 p-4 flex-col">
            <button
              className={`mb-2 p-2 rounded ${
                activeTab === "userDetails"
                  ? "bg-[#e94560] text-white"
                  : "hover:text-[#e94560]"
              }`}
              onClick={() => setActiveTab("userDetails")}
            >
              User Details
            </button>
            <button
              className={`mb-2 p-2 rounded ${
                activeTab === "wishList"
                  ? "bg-[#e94560] text-white"
                  : "hover:text-[#e94560]"
              }`}
              onClick={() => setActiveTab("wishList")}
            >
              Wish List
            </button>
            <button
              className={`mb-2 p-2 rounded ${
                activeTab === "my-orders"
                  ? "bg-[#e94560] text-white"
                  : "hover:text-[#e94560]"
              }`}
              onClick={() => setActiveTab("my-orders")}
            >
              My Orders
            </button>
            <button
              className={`mb-2 p-2 rounded ${
                activeTab === "changePassword"
                  ? "bg-[#e94560] text-white"
                  : "hover:text-[#e94560]"
              }`}
              onClick={() => setActiveTab("changePassword")}
            >
              Change Password
            </button>
          </section>
          <section className="relative w-full md:hidden bg-gray-100">
            <div className="relative">
              <button
                className="w-full py-2 rounded text-center hover:text-[#e94560]"
                onClick={toggleDropdown}
              >
                {activeTab === "userDetails" && "User Details"}
                {activeTab === "wishList" && "Wish List"}
                {activeTab === "my-orders" && "My Orders"}
                {activeTab === "changePassword" && "Change Password"}
                <span className="absolute right-0 inset-y-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    className={`h-5 w-5 ${
                      dropdownOpen ? "transform rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              {dropdownOpen && (
                <div className="absolute z-10 w-full bg-gray-100 border rounded p-2">
                  <button
                    className={`block w-full p-2 rounded ${
                      activeTab === "userDetails"
                        ? "bg-[#e94560] text-white"
                        : "hover:text-[#e94560]"
                    }`}
                    onClick={() => handleTabChange("userDetails")}
                  >
                    User Details
                  </button>
                  <button
                    className={`block w-full p-2 rounded ${
                      activeTab === "wishList"
                        ? "bg-[#e94560] text-white"
                        : "hover:text-[#e94560]"
                    }`}
                    onClick={() => handleTabChange("wishList")}
                  >
                    Wish List
                  </button>
                  <button
                    className={`block w-full p-2 rounded ${
                      activeTab === "my-orders"
                        ? "bg-[#e94560] text-white"
                        : "hover:text-[#e94560]"
                    }`}
                    onClick={() => handleTabChange("my-orders")}
                  >
                    My Orders
                  </button>
                  <button
                    className={`block w-full p-2 rounded ${
                      activeTab === "changePassword"
                        ? "bg-[#e94560] text-white"
                        : "hover:text-[#e94560]"
                    }`}
                    onClick={() => handleTabChange("changePassword")}
                  >
                    Change Password
                  </button>
                </div>
              )}
            </div>
          </section>
          <div className="h-full w-full md:w-3/4 my-4 md:ml-4 ">
            {activeTab === "userDetails" ? <UserDetail /> : null}
            {activeTab === "changePassword" ? <ChangePassword /> : null}
            {activeTab === "wishList" ? <WishList /> : null}
            {activeTab === "my-orders" ? <MyOrders /> : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
