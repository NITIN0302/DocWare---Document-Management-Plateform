import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashRestore } from "@fortawesome/free-solid-svg-icons";

const Recycle = () => {
  const [allDocuments, setAllDocument] = useState([]);

  const getAllDeletedDocument = async () => {
    try {
      const response = await fetch(
        `http://localhost:8082/DocumentService/getAllRecycledDocument`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setAllDocument(result);
    } catch (err) {}
  };

  const restoreDocument = async (uuid) => {
    try {
      const response = await fetch(
        `http://localhost:8082/DocumentService/recycleDocument/${uuid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      getAllDeletedDocument();
    } catch (err) {}
  };

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

  useEffect(()=>{
    getAllDeletedDocument();
  },[]);

  return (
    <div className="h-[91%] w-full flex flex-wrap">
      <div className="w-[12%] md:w-[15%] bg-gray-50 pt-8 m-1 rounded-sm">
        <Sidebar />
      </div>
      <div className="grow pt-8 my-1 bg-white rounded-sm">
        <div className="flex grow flex-wrap justify-between mx-1 border-b-1 border-gray-400">
          <h1 className="w-fit text-xl text-black">Recycle Document</h1>
        </div>
        <div
          className="relative grow text-white h-60 border border-gray-400 rounded-md mt-4 mx-1"
          id="documentData"
        >
          <div className="w-full flex flex-wrap absolute top-0 left-0 text-white border-b border-gray-400 bg-blue-500 rounded-t-md">
            <div className="w-[10%] border-r border-gray-400 p-2">Uuid</div>
            <div className="w-[30%] border-r border-gray-400 p-2">
              Document Name
            </div>
            <div className="w-[20%] border-r border-gray-400 p-2">
              Created By
            </div>
            <div className="w-[30%] border-r border-gray-400 p-2">
              Created Date
            </div>
            <div className="w-[5%] p-2">Restore</div>
          </div>
          <div className="w-full pt-10 overflow-auto h-[calc(100%-2rem)] no-scrollbar">
            {allDocuments.length != 0 ? (
              allDocuments.map((ele, index) => (
                <div
                  className="bg-gray-100 hover:bg-gray-200 flex flex-wrap text-sm  text-black  border-b border-gray-400"
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
                    <FontAwesomeIcon
                      onClick={() => {
                        restoreDocument(ele.uuid);
                      }}
                      className="shadow-xl text-xs text-white p-1 rounded-md border border-blue-500  bg-blue-400"
                      icon={faTrashRestore}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-200 text-black w-full items-center flex flex-wrap justify-center">
                {" "}
                No Document Found
              </div>
            )}
          </div>
          <div className="h-8 bg-blue-500 absolute bottom-0 left-0 w-full rounded-b-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Recycle;
