import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCompass,
  faSearch,
  faRecycle,
  faUserShield
} from "@fortawesome/free-solid-svg-icons";
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
    <div className="bg-gradient-to-b from-white to-gray-100 pt-6 px-2 m-1 rounded-xl shadow-md border border-gray-200">
      {[
        { label: "Home", icon: faHome, path: "/home", id: 1 },
        { label: "Browse", icon: faCompass, path: "/browse", id: 2 },
        { label: "Search", icon: faSearch, path: "/search", id: 3 },
        { label: "AccessRight", icon: faUserShield, path: "/access", id: 4 },
        { label: "Recycled", icon: faRecycle, path: "/recycle", id: 5 },
      ].map((item) => (
        <div
          key={item.id}
          onClick={() => handleNavigation(item.path, item.id)}
          className={`group cursor-pointer border border-gray-300 rounded-lg mb-3 py-3 px-4 flex items-center justify-start gap-4 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.015] ${
            activeState === item.id
              ? "bg-indigo-500 text-white shadow-lg"
              : "bg-white text-gray-800"
          }`}
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 group-hover:bg-white transition">
            <FontAwesomeIcon
              icon={item.icon}
              className={`${
                activeState === item.id ? "text-white" : "text-indigo-600"
              } text-base`}
            />
          </div>
          <span
            className={`text-sm font-medium md:block hidden ${
              activeState === item.id ? "text-white" : "text-gray-700"
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
