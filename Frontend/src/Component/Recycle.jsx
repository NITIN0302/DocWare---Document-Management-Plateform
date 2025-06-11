import React from "react";
import { Sidebar } from "./Sidebar";

const Recycle = () => {
  return (
    <div className="h-[91%] w-full flex flex-wrap">
      <div className="w-[12%] md:w-[15%] bg-gray-50 pt-8 m-1 rounded-sm">
        <Sidebar />
      </div>
      <div className="text-black bg-gray-100 my-1 rounded-sm p-4 grow">
        Recycle
      </div>
    </div>
  );
};

export default Recycle;
