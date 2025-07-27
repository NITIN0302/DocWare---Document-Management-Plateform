import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useCounterContext from "../States/userContext";
import docware from "../assets/docware.png";

export const Navbar = () => {
  const navigate = useNavigate();
  const { username, setUserName } = useCounterContext();

  const logout = () => {
    localStorage.clear();
    setUserName("");
    navigate("/");
  };

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, []);

  return (
    <div className="h-12 bg-white px-6 flex items-center justify-between shadow-md border-b border-indigo-100">
      <div className="text-2xl font-bold tracking-tight text-red-600 flex items-center">
        <span>
          <img src={docware} className="border-2 border-blue-500 rounded-full h-8 w-8 mr-1"/>
        </span>
        <span>Doc</span>
        <span className="text-indigo-600">Ware</span>
      </div>

      {username !== "" && username !== undefined && username !== null ? (
        <div className="text-gray-700 text-sm hidden md:block">
          <span className="font-medium text-gray-500">Welcome</span>{" "}
          <span className="font-semibold text-indigo-600">{username}</span>,{" "}
          <span className="font-medium text-gray-500">Last Login:</span>{" "}
          <span className="text-gray-800 font-medium">
            {localStorage.getItem("lastLoginTime")}
          </span>
        </div>
      ) : (
        <div></div>
      )}

      {username !== "" && username !== undefined && username !== null ? (
        <div>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm flex items-center gap-2 px-4 py-2 rounded-md shadow-md transition-all duration-300"
            onClick={logout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="text-sm" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
