import React ,{useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Component/Navbar";
import { Login } from "./Component/Login";
import Home from "./Component/Home";
import Browse from "./Component/Browse";
import Search from "./Component/Search";
import Recycle from "./Component/Recycle";
import GetDocument from "./DocumentViewer/GetDocument"
import { UserContextProvider } from "./States/userContext";

function App() {

  const[username,setUsername] = useState("");
  const[activeState,setActivestate] = useState(1);

  const setUserName = (value) => {
    setUsername(value);
  }

  const setActiveState = (value) => {
    setActivestate(value);
  }

  return (
    <UserContextProvider value={{username,activeState,setUserName,setActiveState}}>
      <Router>
        <div className="mulish-font h-screen w-full bg-white text-black dark:bg-black dark:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recycle" element={<Recycle />} />
            <Route path="/viewDocument" element={<GetDocument />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
