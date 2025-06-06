import React, { useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const Folder = ({ folderData, parentId, setParentId, setPath, path }) => {

  const [loading,setLoading] = useState();
  const [error,setError] = useState();

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
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
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

  useEffect(() => {}, [parentId,folderData]);

  return (
    <div
      className=" text-white border border-gray-300 rounded-md"
      id="folderData"
    >
      <div className="flex flex-wrap text-white bg-gray-600 border-b border-gray-400 rounded-t-md">
        <div className="w-[10%] border-r border-gray-400 p-2">Uuid</div>
        <div className="w-[30%] border-r border-gray-400 p-2">Folder Name</div>
        <div className="w-[20%] border-r border-gray-400 p-2">Created By</div>
        <div className="w-[30%] border-r border-gray-400 p-2">Created Date</div>
        <div className="w-[5%] p-2">Freeze</div>
      </div>
      {folderData.map((ele, index) => (
        <div
          className={`bg-gray-700 hover:bg-gray-600 flex flex-wrap text-sm overflow-auto no-scrollbar text-white  border-b border-gray-400`}
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
      ))}
      <div className="h-8 bg-gray-600 rounded-b-md"></div>
    </div>
  );
};

export default Folder;
