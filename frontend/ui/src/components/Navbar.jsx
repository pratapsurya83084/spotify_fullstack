import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold ">
        <div className="flex items-center gap-2">
          <img
            src="/left_arrow.png"
            className="w-8 bg-black p-2
        rounded-2xl cursor-pointer 
        "
            onClick={() => navigate(-1)}
            alt=""
          />

          <img
            src="/right_arrow.png"
            className="w-8 bg-black p-2
        rounded-2xl cursor-pointer 
        "
            onClick={() => navigate(+1)}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4">
          <p className=" px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full hidden md:block">
            Explore Premium{" "}
          </p>
          <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full hidden md:block">
            Install App
          </p>
          <p className="px-4 py-1 cursor-pointer bg-white text-black text-[15px] rounded-full hidden md:block">
            Logout{" "}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <p
          className="bg-white text-black px-4 py-1 rounded-2xl 
              cursor-pointer"
        >
          All
        </p>

          <p
          className="bg-white text-black px-4 py-1 rounded-2xl 
              cursor-pointer hidden md:block"
        >
          Music
        </p>

          <p
          className="bg-white text-black px-4 py-1 rounded-2xl 
              cursor-pointer hidden md:block"
        >
          Podcasts
        </p>

          <p
          className="bg-white text-black px-4 py-1 rounded-2xl 
              cursor-pointer md:hidden" 
              onClick={()=>navigate('/playlist')}
        >
          PlayList
        </p>
      </div>
    </>
  );
};

export default Navbar;
