import React, { useEffect } from "react";

const Document = ({ docData, parentId }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {}, [parentId]);

  return (
    <div
      className="text-white h-60 overflow-auto no-scrollbar bg-gray-600 border-b border-gray-400 rounded-md"
      id="documentData"
    >
      <div className="flex flex-wrap text-white border-b border-gray-400 bg-gray-600 rounded-t-md">
        <div className="w-[10%] border-r border-gray-400 p-2">Uuid</div>
        <div className="w-[30%] border-r border-gray-400 p-2">
          Document Name
        </div>
        <div className="w-[20%] border-r border-gray-400 p-2">Created By</div>
        <div className="w-[30%] border-r border-gray-400 p-2">Created Date</div>
        <div className="w-[5%] p-2">Delete</div>
      </div>
      {docData.map((ele, index) => (
        <div
          className="bg-gray-700 hover:bg-gray-600 flex flex-wrap text-sm  text-white  border-b border-gray-400"
          id={index}
        >
          <div className="w-[10%] border-r border-gray-400 items-center p-2">
            {ele.uuid}
          </div>
          <div
            className="w-[30%] border-r border-gray-400 items-center cursor-pointer p-2"
            onClick={() => handleClick(ele.uuid, ele.name)}
          >
            {ele.name}
          </div>
          <div className="w-[20%] border-r border-gray-400 items-center p-2">
            {ele.createdBy}
          </div>
          <div className="w-[30%] border-r border-gray-400 items-center p-2">
            {formatDate(ele.createdDate)}
          </div>
          <div className="w-[10%] items-center flex flex-wrap justify-center p-2">
            {}
          </div>
        </div>
      ))}
      <div className="h-8 bg-gray-600 rounded-b-md"></div>
    </div>
  );
};

export default Document;
