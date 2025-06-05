import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex justify-center items-center bg-[#ff5733]  p-52">
      <div className="bg-white p-20 text-center">
        <h1 className="text-6xl text-red-500">!!404!!</h1>
        <p className="text-2 p-5">Oops! Page not found</p>
        <NavLink to={"/"} className="bg-[#ff5733] m-3 p-2 text-white ">
          Go Back
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
