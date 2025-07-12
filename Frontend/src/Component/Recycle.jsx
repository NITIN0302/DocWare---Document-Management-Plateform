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
      if (!response.ok) throw new Error("Network response was not ok");
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
      if (!response.ok) throw new Error("Network response was not ok");
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

  useEffect(() => {
    getAllDeletedDocument();
  }, []);

  return (
    <div className="h-[91%] w-full flex flex-wrap bg-dark">
      <div className="w-[12%] md:w-[15%] bg-white pt-8 m-1 rounded-md shadow-sm">
        <Sidebar />
      </div>

      <div className="grow pt-8 my-1 bg-white rounded-md shadow-sm p-4 mx-0.5">
        <div className="flex justify-between items-center mb-6 border-b border-indigo-200 pb-3">
          <h1 className="text-2xl font-semibold text-indigo-600 tracking-wide">
            ♻️ Recycle Document
          </h1>
        </div>

        <div
          className="relative border border-gray-300 rounded-md bg-white shadow overflow-hidden"
          id="documentData"
        >
          <div className="flex text-white text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-md">
            <div className="w-[10%] px-3 py-2 border-r border-blue-400">
              Uuid
            </div>
            <div className="w-[30%] px-3 py-2 border-r border-blue-400">
              Document Name
            </div>
            <div className="w-[20%] px-3 py-2 border-r border-blue-400">
              Created By
            </div>
            <div className="w-[30%] px-3 py-2 border-r border-blue-400">
              Created Date
            </div>
            <div className="w-[10%] px-3 py-2 text-center">Restore</div>
          </div>

          <div className="max-h-60 overflow-y-auto text-black">
            {allDocuments.length !== 0 ? (
              allDocuments.map((ele, index) => (
                <div
                  key={index}
                  className={`flex text-sm items-center ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors border-b border-gray-200`}
                >
                  <div className="w-[10%] px-3 py-2 truncate border-r border-gray-100">
                    {ele.uuid}
                  </div>
                  <div
                    className="w-[30%] px-3 py-2 truncate border-r border-gray-100 text-blue-600 font-medium hover:underline cursor-pointer"
                    onClick={() => handleClick(ele.uuid, ele.name)}
                  >
                    {ele.name}
                  </div>
                  <div className="w-[20%] px-3 py-2 truncate border-r border-gray-100">
                    {ele.createdBy}
                  </div>
                  <div className="w-[30%] px-3 py-2 truncate border-r border-gray-100">
                    {formatDate(ele.createdDate)}
                  </div>
                  <div className="w-[10%] px-3 py-2 flex justify-center items-center">
                    <FontAwesomeIcon
                      onClick={() => restoreDocument(ele.uuid)}
                      className="cursor-pointer text-green-500 text-md hover:text-green-600 transition-transform hover:scale-110"
                      icon={faTrashRestore}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 font-medium">
                No Document Found
              </div>
            )}
          </div>

          <div className="h-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs flex items-center justify-center rounded-b-md">
            Showing {allDocuments.length} item{allDocuments.length !== 1 && "s"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recycle;
