import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import useCounterContext from "../States/userContext";

export const Login = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const [input, setInput] = useState("password");
  const [icons, setIcon] = useState(faLock);
  const {username,setUserName} = useCounterContext();

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
      })
    });
    const result = await response.json();
    if (response.ok) {
      navigate("/home");
      setUsername("");
      setPassword("");
      localStorage.setItem("Token",result.data.jwtToken)
      setUserName(userName);
    } else {
      alert("Bad Credentials");
    }
  };

  return (
    <div className="flex flex-wrap items-center h-[91%] grow">
      <div className="md:w-[50%]"></div>
      <div className="w-[70%]  md:w-[25%] md:h-fit bg-gray-600 mx-auto rounded-md py-12 inset-shadow-sm border-2 border-gray-600 hover:border-blue-400 transition duration-500">
        <div className="w-full flex flex-wrap justify-center">
          <h1 className="w-[80%] text-xl px-1">Login To DocuWare</h1>
        </div>
        <div className="w-full py-4 flex flex-wrap justify-center">
          <div className="flex items-center bg-black rounded-md border-2 border-transparent focus-within:border-blue-500 transition duration-200">
            <div className="flex items-center bg-black rounded-l-md px-1 border-r border-white">
              <FontAwesomeIcon
                className="shadow-xl text-white p-1 rounded-full border border-blue-500  bg-blue-400"
                icon={faUser}
              />
            </div>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="md:w-[80%] bg-black text-white px-2 py-2 rounded-r-md focus:outline-none"
              placeholder="Enter Your Username"
            />
          </div>
        </div>
        <div className="w-full py-4 flex flex-wrap justify-center ">
          <div className="flex items-center bg-black rounded-md border-2 border-transparent focus-within:border-blue-500 transition duration-200">
            <div className="flex items-center bg-black rounded-l-md px-1 border-r border-white">
              <FontAwesomeIcon
                className="shadow-xl text-white p-1 rounded-full border border-blue-500 bg-blue-400"
                icon={icons}
                onClick={() => {
                  handleChange(icons);
                }}
              />
            </div>
            <input
              type={input}
              onChange={(e) => setPassword(e.target.value)}
              className="md:w-[80%] bg-black text-white px-2 py-2 rounded-r-md focus:outline-none"
              placeholder="Enter Your Password"
            />
          </div>
        </div>
        <div className="w-full py-4 flex flex-wrap justify-center">
          <button
            className="bg-indigo-500 border border-blue-500 px-8 py-1 rounded-md shadow-lg shadow-indigo-500/50 transition duration-500 hover:shadow-none"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
