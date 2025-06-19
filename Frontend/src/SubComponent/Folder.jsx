import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const Folder = ({ folderData, parentId, setParentId, setPath, path, getFolder }) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

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

  const freezeFolder = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8081/FolderService/freezeFolder/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      const folData = await getFolder();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id, name) => {
    setParentId(id);
    setPath([...path, { id: id, name: name }]);
  };

  useEffect(() => {}, [parentId, folderData]);

  return (
    <div
      className="relative text-white border h-60 border-gray-400 rounded-md"
      id="folderData"
    >
      <div className="flex flex-wrap text-white absolute top-0 left-0 w-full bg-blue-500 border-b border-gray-400 rounded-t-md">
        <div className="w-[10%] border-r border-gray-400 p-2">Uuid</div>
        <div className="w-[30%] border-r border-gray-400 p-2">Folder Name</div>
        <div className="w-[20%] border-r border-gray-400 p-2">Created By</div>
        <div className="w-[30%] border-r border-gray-400 p-2">Created Date</div>
        <div className="w-[5%] p-2">Freeze</div>
      </div>
      <div className="w-full pt-10 overflow-auto h-[calc(100%-2rem)] no-scrollbar">
        {folderData.length != 0 ? (
          folderData.map((ele, index) => (
            <div
              className={`${index%2 == 0?"bg-gray-200":"bg-white" }  hover:bg-gray-100 flex flex-wrap text-sm overflow-auto no-scrollbar text-black  border-b border-gray-400`}
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
                {ele.freeze == 0 ? (
                  <FontAwesomeIcon
                    className="shadow-xl text-xs text-white p-1 rounded-md border border-blue-500  bg-blue-400"
                    onClick={() => {
                      freezeFolder(ele.uuid);
                    }}
                    icon={faLockOpen}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="shadow-xl text-xs text-white p-1 rounded-md border border-blue-500  bg-blue-400"
                    onClick={() => {
                      freezeFolder(ele.uuid);
                    }}
                    icon={faLock}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-200 text-black items-center flex flex-wrap justify-center">
            No Folder Found
          </div>
        )}
      </div>
      <div className="h-8 bg-blue-500 absolute bottom-0 left-0 w-full rounded-b-md"></div>
    </div>
  );
};

export default Folder;
