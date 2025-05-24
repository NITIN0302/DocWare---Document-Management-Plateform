import React, { useState } from "react";

const DocumentSearch = () => {
  const [DocumentData, setDocumentdata] = useState([1]);

  return (
    <>
      <div className="grid grid-col-1 md:grid-cols-2 mt-2">
        <div
          id="searchbyname"
          className="border border-gray-300 rounded-md m-1 bg-white shadow-xl p-4"
        >
          <h3>Search By Name</h3>
          <div className="flex flex-wrap">
            <input
              className="md:w-[80%] my-2 border-2 border-blue-400 rounded-sm py-1 bg-gray-100 focus:border-blue-500 px-2"
              placeholder="Enter Document Name"
            />
            <div className="md:w-[20%] flex items-center flex-wrap justify-center">
              <button className="text-xs bg-blue-500 py-1 px-1 rounded-md border border-blue-500 text-white">
                Search
              </button>
            </div>
          </div>
        </div>
        <div
          id="searchbyid"
          className="border border-gray-300 rounded-md m-1 bg-white shadow-xl p-4"
        >
          <h3>Search By ID</h3>
          <div className="flex flex-wrap">
            <input
              className="md:w-[80%] my-2 border-2 border-blue-400 py-1 rounded-md bg-gray-100 focus:border-blue-500 px-2"
              placeholder="Enter Document ID"
            />
            <div className="md:w-[20%] flex items-center flex-wrap justify-center">
              <button className="text-xs bg-blue-500 py-1 px-1 rounded-md border border-blue-500 text-white">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${DocumentData.length == 0 ? "hidden" : "block"} mx-1 mt-4`}
        id="DocumentData"
      >
        <div className="flex border border-gray-400 flex-wrap text-white bg-blue-500 rounded-t-md">
          <div className="w-[10%] border-r border-black p-2">Uuid</div>
          <div className="w-[30%] border-r border-black p-2">Document Name</div>
          <div className="w-[20%] border-r border-black p-2">Created By</div>
          <div className="w-[40%] p-2">Created Date</div>
        </div>
        <div className="bg-white h-72 overflow-auto no-scrollbar rounded-b-md border border-gray-400 shadow-xl">
          {/* {DocumentData.map((ele) => (
            <div
              className="flex flex-wrap text-sm mx-1 mt-4 text-black bg-gray-300 border-b border-black"
              key={ele.id}
            >
              <div className="w-[10%] border-r border-black p-2">
                {ele.uuid}
              </div>
              <div
                className="w-[30%] border-r border-black p-2 cursor-pointer"
                onClick={() => handleClick(ele.uuid, ele.name)}
              >
                {ele.name}
              </div>
              <div className="w-[20%] border-r border-black p-2">
                {ele.createdBy}
              </div>
              <div className="w-[30%] border-r border-black p-2">
                {formatDate(ele.createdDate)}
              </div>
            </div>
          ))}*/}
        </div>
      </div>
    </>
  );
};

export default DocumentSearch;
