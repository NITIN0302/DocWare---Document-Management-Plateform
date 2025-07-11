import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useCounterContext from "../States/userContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { username, setUserName } = useCounterContext();

  const logout = () => {
    localStorage.clear();
    setUserName("");
    navigate("/");
  };

  useEffect(() => {
    console.log(localStorage.getItem("username"));
    setUserName(localStorage.getItem("username"));
  }, []);

  return (
    <div className="h-12 bg-white px-6 flex items-center justify-between shadow-sm border-b border-gray-200">
      <div className="text-2xl font-bold tracking-wide text-red-600">
        Doc<span className="text-indigo-600">Ware</span>
      </div>

      {username !== "" && username !== undefined && username !== null ? (
        <div className="text-gray-600 text-sm hidden md:block">
          Welcome{" "}
          <span className="font-medium text-indigo-600">{username}</span>, Last
          Login:{" "}
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm flex items-center px-3 py-1.5 rounded-md shadow transition duration-300"
            onClick={logout}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className="mr-2 text-sm"
            />
            Logout
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
