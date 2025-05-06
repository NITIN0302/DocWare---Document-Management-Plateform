import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "../features/userSlice";

export const Navbar = () => {
  const user = useSelector((state) => state.user.userName);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [btnState, setBtnState] = useState(false);
  const [userTag, setTag] = useState(user);

  const logout = () => {
    setTag("");
    dispatch(setUsername(""));
    navigate("/");
  };

  return (
    <div className="h-12 text-black bg-white items-center px-4 flex flex-wrap justify-between ">
      <div className="text-2xl font-bold text-red-700 mr-4 text-shadow-lg">
        Doc<span className="text-blue-600">Ware</span>
      </div>
      <div
        className={`items-center text-sm hidden md:block ${
          userTag == "" ? "invisible" : "visible"
        }`}
      >
        Welcome {userTag}, Last Login Time is - 17:15:49 21-04-2025
      </div>
      <div className="items-center">
        <div
          onClick={() => {
            setBtnState(!btnState);
          }}
          className={`${
            userTag == "" ? "invisible" : "visible"
          } border-2 w-8 h-8 items-center text-white flex flex-wrap justify-center bg-pink-600 border-pink-600 rounded-full px-1`}
        >
          {userTag.charAt(0).toUpperCase()}
        </div>
        {(userTag === "" && !btnState) ? (
          ""
        ) : (
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
        )}
      </div>
    </div>
  );
};
