import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import useCounterContext from "../States/userContext";
import CustomAlert from "../SubComponent/Customealert";

export const Login = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const [input, setInput] = useState("password");
  const [icons, setIcon] = useState(faLock);
  const { username, setUserName } = useCounterContext();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState();
  const [status, setStatus] = useState();

  const handleChange = (icons) => {
    if (icons == faLock) {
      setIcon(faLockOpen);
      setInput("text");
    } else {
      setIcon(faLock);
      setInput("password");
    }
  };

  const login = async () => {
    const response = await fetch("http://localhost:8080/UserService/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: passWord,
      }),
    });
    const result = await response.json();
    if (response.ok) {
      if (result.status == "1") {
        setUsername("");
        setPassword("");
        localStorage.setItem("username", userName);
        localStorage.setItem("Token", result.data.jwtToken);
        const now = new Date();
        const formattedTime =
          now.toLocaleTimeString("en-GB") +
          " " +
          now.toLocaleDateString("en-GB");
        localStorage.setItem("lastLoginTime", formattedTime);
        navigate("/home");
        setUserName(localStorage.getItem("username"));
      } else {
        setShowAlert(true);
        setMessage(result.message);
        setStatus(0);
      }
    } else {
      setShowAlert(true);
      setMessage("Something Went Wrong!");
      setStatus(0);
    }
  };

  return (
    <>
      {showAlert && (
        <CustomAlert
          status={status}
          message={message}
          onClose={() => setShowAlert(false)}
        />
      )}

      <div className="flex items-center justify-center h-[91%] bg-gradient-to-br from-[#f9fafb] to-[#e2e8f0] px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 sm:p-10 transition-all duration-300 ease-in-out">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Login to <span className="text-indigo-600">DocWare</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Access your secure document space
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <FontAwesomeIcon
                icon={faUser}
                className="text-indigo-500 text-base mr-2"
              />
              <input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full bg-transparent text-sm text-gray-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 transition">
              <FontAwesomeIcon
                icon={icons}
                onClick={() => handleChange(icons)}
                className="text-indigo-500 text-base mr-2 cursor-pointer"
              />
              <input
                type={input}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent text-sm text-gray-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={login}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white py-2.5 rounded-lg font-semibold shadow-md"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
