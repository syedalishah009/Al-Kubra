import React from "react";

const Button = ({ icon, text, onClick, width,ref }) => {
  return (
    <button
      className={`w-${width} transition duration-300 ease-in-out bg-[#e94560] hover:bg-white text-white font-bold hover:text-[#e94560] border-2 border-[#e94560] px-4 py-2 mt-2 rounded-md flex justify-center items-center gap-3`}
      onClick={onClick}
      ref={ref}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
