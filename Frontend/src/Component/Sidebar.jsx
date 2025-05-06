import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompass, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPagecount } from "../features/userSlice";

export const Sidebar = () => {
  let activeState = useSelector((state) => state.user.pageCount)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = (route, state) => {
    dispatch(setPagecount(state));
    navigate(route);
  };

  return (
    <div className="bg-gray-50 pt-8 m-1 rounded-sm">
      <div
        onClick={() => handleNavigation("/home", 1)}
        className={`border-y border-gray-500 h-[10%] items-center w-full md:w-[100%] mx-auto flex flex-wrap justify-around ${
          activeState === 1 ? "bg-blue-400" : "bg-white"
        } py-2`}
      >
        <div className="md:w-[30%] w-full items-center flex flex-wrap justify-center">
          <FontAwesomeIcon
            className="bg-blue-500 text-white p-1 rounded-full"
            icon={faHome}
          />
        </div>
        <span className="md:w-[50%] invisible md:visible text-black font-bold">
          Home
        </span>
      </div>

      <div
        onClick={() => handleNavigation("/browse", 2)}
        className={`border-b border-gray-500 h-[10%] items-center w-full md:w-[100%] mx-auto flex flex-wrap justify-around ${
          activeState === 2 ? "bg-blue-400" : "bg-white"
        } py-2`}
      >
        <div className="md:w-[30%] w-full items-center flex flex-wrap justify-center">
          <FontAwesomeIcon
            className="bg-blue-500 text-white p-1 rounded-full"
            icon={faCompass}
          />
        </div>
        <span className="md:w-[50%] invisible md:visible text-black font-bold">
          Browse
        </span>
      </div>

      <div
        onClick={() => handleNavigation("/search", 3)}
        className={`border-b border-gray-500 h-[10%] items-center w-full md:w-[100%] mx-auto flex flex-wrap justify-around ${
          activeState === 3 ? "bg-blue-400" : "bg-white"
        } py-2`}
      >
        <div className="md:w-[30%] w-full flex flex-wrap justify-center">
          <FontAwesomeIcon
            className="bg-blue-500 text-white p-1 rounded-full"
            icon={faSearch}
          />
        </div>
        <span className="md:w-[50%] invisible md:visible text-black font-bold">
          Search
        </span>
      </div>
    </div>
  );
};
