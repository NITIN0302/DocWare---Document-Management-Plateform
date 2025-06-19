import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import FolderSearch from "./FolderSearch";
import DocumentSearch from "./DocumentSearch";

const Search = () => {
  const [type, setType] = useState("D");

  return (
    <div className="h-[91%] w-full flex flex-wrap">
      <div className="w-[12%] md:w-[15%] bg-gray-50 pt-8 m-1 rounded-sm">
        <Sidebar />
      </div>
      <div className="text-black bg-gray-100 my-1 rounded-sm p-4 grow">
        <div className="grid grid-cols-11 gap-0.5">
          <div
            className={`${
              type == "D" ? "bg-blue-500 text-white" : "bg-white"
            } border-l flex justify-center border-t border-r border-blue-500 rounded-t-md text-sm px-2 cursor-pointer py-0.5`}
            onClick={()=>{setType("D")}}
          >
            Document
          </div>
          <div
            className={`${
              type == "F" ? "bg-blue-500 text-white" : "bg-white"
            } border-l flex justify-center  border-t border-r border-blue-500 rounded-t-md text-sm px-2 cursor-pointer py-0.5`}
            onClick={()=>{setType("F")}}
          >
            Folder
          </div>
        </div>
        <div className="h-2px border border-blue-500"></div>
        
        {
          type == "D" ? <DocumentSearch/>:<FolderSearch/>
        }

      </div>
    </div>
  );
};

export default Search;
