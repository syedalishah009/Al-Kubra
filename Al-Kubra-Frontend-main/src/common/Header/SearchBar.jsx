import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faSearch, faShoppingBag, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [keyword, setKeyword] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();


  const handleClick = () => {

  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };



  return (
    <React.Fragment>
      <section className="container py-3">
        <div className="flex justify-between items-center">
          {!showSearch ? (
            <Link to={"/"} className="text-3xl font-bold text-[#e94560] md:mr-10">
            AlKubra
          </Link>
          ): ""}
          
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="md:w-full hidden sm:flex sm:w-[350px] sm:h-12 md:mx-10 focus-within:border-[#e94560] flex items-center ml-2 border-2 border-gray-300 rounded-full overflow-hidden"
          >
            <div className="flex items-center w-full">
              <FontAwesomeIcon onClick={handleClick} icon={faSearch} className="text-gray-600 ml-5" />

              <input
                className="flex-grow  py-2 px-3 sm:pr-0 placeholder-gray-400 bg-transparent focus:outline-none"
                type="text"
                placeholder="Search and hit enter..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#e94560] flex items-center text-white sm:flex py-3 px-6 rounded-full hover:bg-[#d13a53] focus:outline-none ml-2 relative"
              >
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Search
              </button>
            </div>
          </form>

          {showSearch ? ( 
             <form
            onSubmit={(e) => handleSubmit(e)}
            className="md:w-full w-full sm:hidden sm::h-12 md:mx-10 focus-within:border-[#e94560] flex items-center ml-2 border-2 border-gray-300 rounded-full overflow-hidden"
          >
            <div className="flex items-center w-full">
              {/* <FontAwesomeIcon onClick={handleClick} icon={faSearch} className="text--600 ml-5" /> */}
              <FontAwesomeIcon onClick={()=> setShowSearch(false)} className="ml-4 text-xl" icon={faXmark} />
              <input
                className="flex-grow  py-2 px-3 pr-12 placeholder-gray-400 bg-transparent focus:outline-none"
                type="text"
                placeholder="Search and hit enter..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#e94560]   text-white p-2 px-6 rounded-full hover:bg-[#d13a53] focus:outline-none ml-2 relative"
              >
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Search
              </button>
            </div>
          </form>) : (
            
              <FontAwesomeIcon onClick={()=> setShowSearch(!showSearch)} icon={faSearch} className="ml-[200px] text-2xl sm:hidden" />
           

          ) }

        {!showSearch ? ( 
           <div>
           <Link to={"/cart"} className="relative ">
             <FontAwesomeIcon className="text-secondry transform hover:scale-110 transition-transform" size="2x" icon={faShoppingBag} />
             <span className="absolute top-[-20px] right-[-12px] h-[20px] w-[20px] rounded-full bg-[#e94560] text-white flex justify-center items-center">
               {cartItems.length}
             </span>
           </Link>
         </div>
        ):""}
         
        </div>
      </section>
    </React.Fragment>
  );
};

export default SearchBar;
