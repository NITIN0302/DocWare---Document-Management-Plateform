import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import FolderSearch from "../Search/FolderSearch";
import DocumentSearch from "../Search/DocumentSearch";

const Search = () => {
  const [type, setType] = useState("D");

  return (
    <div className="h-[91%] w-full flex flex-wrap">
      <div className="w-[12%] md:w-[15%] bg-gray-50 pt-8 m-1 rounded-sm">
        <Sidebar />
      </div>
      <div className="text-black bg-white my-1 rounded-sm p-4 grow">
        <div className="flex justify-between items-center mb-1 border-b border-indigo-200 pb-2">
          <h1 className="text-2xl font-semibold text-indigo-600 tracking-wide">
            🔍 Search Document
          </h1>
        </div>

        <div className=" bg-gray-200 p-2 rounded-t-md grid grid-cols-2 w-fit text-sm font-medium">
          <div
            className={`${
              type === "D"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-indigo-50"
            } transition-all duration-200 ease-in-out border border-indigo-500 rounded-l-md px-4 py-1 cursor-pointer text-center`}
            onClick={() => setType("D")}
          >
            Document
          </div>
          <div
            className={`${
              type === "F"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-indigo-50"
            } transition-all duration-200 ease-in-out border border-indigo-500 rounded-r-md px-4 py-1 cursor-pointer text-center`}
            onClick={() => setType("F")}
          >
            Folder
          </div>
        </div>

        <div className="bg-gray-200 px-2 pb-2 pt-1 rounded-b-md rounded-tr-md">
          {type == "D" ? <DocumentSearch /> : <FolderSearch />}
        </div>
      </div>
    </div>
  );
};

export default Search;
