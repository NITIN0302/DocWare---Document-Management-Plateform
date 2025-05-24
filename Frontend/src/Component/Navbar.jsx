import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useCounterContext from "../States/userContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const { username, setUserName } = useCounterContext();

  const logout = () => {
    setUserName("");
    navigate("/");
  };

  return (
    <div className="h-12 text-black bg-white items-center px-4 flex flex-wrap justify-between ">
      <div className="text-2xl font-bold text-red-700 mr-4 text-shadow-lg">
        Doc<span className="text-blue-600">Ware</span>
      </div>
      {(username != "" && username != undefined) ? (
        <div className="items-center text-sm hidden md:block">
          Welcome {username}, Last Login Time is - 17:15:49 21-04-2025
        </div>
      ) : (
        <div></div>
      )}
      {(username != "" && username != undefined) ? (
        <div className="items-center">
          <button
            className="bg-blue-500 items-center py-1 px-1 mx-2 rounded-md"
            onClick={logout}
          >
            <FontAwesomeIcon
              className="text-white mx-1"
              icon={faRightFromBracket}
            />
            <span className="text-white">Logout</span>
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
