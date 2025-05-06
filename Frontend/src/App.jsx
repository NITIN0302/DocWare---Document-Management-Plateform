import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Component/Navbar";
import { Login } from "./Component/Login";
import Home from "./Component/Home";
import Browse from "./Component/Browse";
import Search from "./Component/Search";

function App() {
  return (
  
      <Router>
        <div className="mulish-font h-screen w-full bg-white text-black dark:bg-black dark:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
