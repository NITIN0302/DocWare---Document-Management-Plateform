import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompass, faSearch, faRecycle} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useCounterContext from "../States/userContext";

export const Sidebar = () => {
  const { activeState, setActiveState } = useCounterContext();
  const navigate = useNavigate();

  const handleNavigation = (route, state) => {
    setActiveState(state);
    navigate(route);
  };

  return (
    <div className="bg-gray-50 pt-8 m-1 rounded-sm">
      <div
        onClick={() => handleNavigation("/home", 1)}
        className={`border my-1 hover:bg-white hover:text-black hover:transform hover:scale-102 transition duration-500 ease-in border-gray-500 rounded-md h-[10%] items-center w-full md:w-[100%] mx-auto flex flex-wrap justify-around ${
          activeState === 1
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black "
        } py-2`}
      >
        <div className="md:w-[30%] w-full items-center flex flex-wrap justify-center">
          <FontAwesomeIcon
            className="bg-white text-blue-500 p-1 rounded-full"
            icon={faHome}
          />
        </div>
        <span className="md:w-[50%] invisible md:visible font-bold">Home</span>
      </div>

      <div
        onClick={() => handleNavigation("/browse", 2)}
        className={`border hover:bg-white hover:text-black hover:transform hover:scale-102 transition duration-500 border-gray-500 my-1 h-[10%] rounded-md  items-center w-full md:w-[100%] mx-auto flex flex-wrap justify-around ${
          activeState === 2
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black "
        } py-2`}
      >
        <div className="md:w-[30%] w-full items-center flex flex-wrap justify-center">
          <FontAwesomeIcon
            className="bg-white text-blue-500 p-1 rounded-full"
            icon={faCompass}
          />
        </div>
        <span className="md:w-[50%] invisible md:visible  font-bold">
          Browse
        </span>
      </div>

      <div
        onClick={() => handleNavigation("/search", 3)}
        className={`border hover:bg-white hover:text-black hover:transform hover:scale-102 transition duration-500 border-gray-500 my-1 h-[10%] rounded-md  items-center w-full md:w-[100%] mx-auto flex flex-wrap justify-around ${
          activeState === 3
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black "
        } py-2`}
      >
        <div className="md:w-[30%] w-full flex flex-wrap justify-center">
          <FontAwesomeIcon
            className="bg-white text-blue-500 p-1 rounded-full"
            icon={faSearch}
          />
        </div>
        <span className="md:w-[50%] invisible md:visible font-bold">
          Search
        </span>
      </div>

      <div
        onClick={() => handleNavigation("/recycle", 4)}
        className={`border hover:bg-white hover:text-black hover:transform hover:scale-102 transition duration-500 border-gray-500 my-1 h-[10%] rounded-md  items-center w-full md:w-[100%] mx-auto flex flex-wrap justify-around ${
          activeState === 4
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        } py-2`}
      >
        <div className="md:w-[30%] w-full flex flex-wrap justify-center">
          <FontAwesomeIcon
            className="bg-white text-blue-500 p-1 rounded-full"
            icon={faRecycle }
          />
        </div>
        <span className="md:w-[50%] invisible md:visible font-bold">
          Recycled
        </span>
      </div>
    </div>
  );
};
