import React from "react";
import { Sidebar } from "./Sidebar";

const Browse = () => {
  return (
    <div className="h-[91%] w-full flex flex-wrap">
      <div className="w-[12%] md:w-[15%] bg-gray-50 pt-8 m-1 rounded-sm">
        <Sidebar />
      </div>
      <div className="bg-gray-100 my-1 rounded-sm p-4 grow grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4"></div>
    </div>
  );
};

export default Browse;
