import React from "react";
import { Sidebar } from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCompass, faSearch, faRecycle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useCounterContext from "../States/userContext";

const Home = () => {
  const navigate = useNavigate();
  const { setActiveState } = useCounterContext();

  const handleNavigation = (route, state) => {
    navigate(route);
    setActiveState(state);
  };

  return (
    <div className="h-[91%] w-full flex flex-wrap">
      <div className="w-[12%] md:w-[15%] bg-gray-50 pt-8 m-1 rounded-sm">
        <Sidebar />
      </div>
      <div className="bg-gray-100 my-1 rounded-sm p-4 grow grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4">
        <div
          onClick={() => handleNavigation("/home", 1)}
          className="rounded-md grid grid-cols-1 border-2 border-amber-50 bg-white shadow-md hover:scale-105 transition duration-300"
        >
          <div className="w-fit mt-2 mx-auto px-2 rounded-full shadow-lg items-center flex flex-wrap justify-center">
            <FontAwesomeIcon
              className="fa-2x shadow-xl text-white p-4 rounded-full border border-blue-500 bg-blue-400"
              icon={faHome}
            />
          </div>
          <span className="text-gray-600 text-sm mt-1 font-bold flex flex-wrap justify-center">
            Home
          </span>
          <span className="text-xs text-gray-500 w-full flex flex-wrap justify-center ">
            Access all the Tab
          </span>
        </div>
        <div
          onClick={() => handleNavigation("/browse", 2)}
          className="rounded-md grid grid-cols-1 bg-white border-2 border-amber-50 shadow-md hover:scale-105 transition duration-300"
        >
          <div className="w-fit mt-2 mx-auto px-2 rounded-full shadow-lg items-center flex flex-wrap justify-center">
            <FontAwesomeIcon
              className="fa-2x shadow-xl text-white p-4 rounded-full border border-blue-500 bg-blue-400"
              icon={faCompass}
            />
          </div>
          <span className="text-gray-600 text-sm mt-1 font-bold flex flex-wrap justify-center">
            Browse
          </span>
          <span className="text-xs text-gray-500 w-full flex flex-wrap justify-center ">
            Browse to the Folder and Document
          </span>
        </div>
        <div
          onClick={() => handleNavigation("/search", 3)}
          className="rounded-md grid grid-cols-1 bg-white border-2 border-amber-50 shadow-md hover:scale-105 transition duration-300"
        >
          <div className="w-fit mt-2 mx-auto px-2 rounded-full shadow-lg items-center flex flex-wrap justify-center">
            <FontAwesomeIcon
              className="fa-2x shadow-xl text-white p-4 rounded-full border border-blue-500 bg-blue-400"
              icon={faSearch}
            />
          </div>
          <span className="text-gray-600 mt-1 text-sm font-bold flex flex-wrap justify-center">
            Search
          </span>
          <span className="text-xs text-gray-500 w-full flex flex-wrap justify-center ">
            Search Particular Folder and Document
          </span>
        </div>
        <div
          onClick={() => handleNavigation("/recycle", 4)}
          className="rounded-md grid grid-cols-1 bg-white border-2 border-amber-50 shadow-md hover:scale-105 transition duration-300"
        >
          <div className="w-fit mt-2 mx-auto px-2 rounded-full shadow-lg items-center flex flex-wrap justify-center">
            <FontAwesomeIcon
              className="fa-2x shadow-xl text-white p-4 rounded-full border border-blue-500 bg-blue-400"
              icon={faRecycle}
            />
          </div>
          <span className="text-gray-600 mt-1 text-sm font-bold flex flex-wrap justify-center">
            Recycled
          </span>
          <span className="text-xs text-gray-500 w-full flex flex-wrap justify-center ">
            Get all the Delete Document
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
