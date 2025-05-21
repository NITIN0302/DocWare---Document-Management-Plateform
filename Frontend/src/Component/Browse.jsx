import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFolderPlus, faLock,faLockOpen} from "@fortawesome/free-solid-svg-icons";

const Browse = () => {
  const [path, setPath] = useState([{ id: 0, name: "root" }]);
  const [folderData, setFolderData] = useState([]);
  const [parentId, setParentId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const createFolder = () => {
    
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/FolderService/getFolder/${parentId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setFolderData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [parentId]);

  const handleClick = (id, name) => {
    setParentId(id);
    setPath([...path, { id: id, name: name }]);
  };

  const handleRouting = (id) => {
    setParentId(id);
    let data = [];
    for (let i = 0; i < path.length; i++) {
      data.push(path[i]);
      if (path[i]["id"] == id) {
        break;
      }
    }
    setPath(data);
  };

  return (
    <div className="h-[91%] w-full flex flex-wrap">
      <div className="w-[12%] md:w-[15%] bg-gray-50 pt-8 m-1 rounded-sm">
        <Sidebar />
      </div>
      <div className="bg-gray-200 text-black my-1 rounded-sm p-4 grow">
        <div className="flex flex-wrap justify-between border-b-1 border-gray-400">
          <h1 className="w-[90%] text-xl">Browse Your Folder</h1>
          <div className="w-[6%] flex flex-wrpa justify-around">
            {parentId !== 0 ? (
              <FontAwesomeIcon
                className="shadow-xl text-sm text-white p-1 rounded-full border border-blue-500  bg-blue-400"
                icon={faFolderPlus}
              />
            ) : (
              ""
            )}
            {parentId !== 0 ? (
              <FontAwesomeIcon
                className="shadow-xl text-sm text-white p-1 rounded-full border border-blue-500  bg-blue-400"
                icon={faUpload}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        {path.map((ele) => (
          <p
            className="hover:underline inline text-xs my-1 cursor-pointer text-blue-500"
            onClick={() => {
              handleRouting(ele.id);
            }}
          >
            /{ele.name}
          </p>
        ))}
        <div className="border border-black rounded-t-md" id="folderData">
          <div className="flex flex-wrap text-white bg-blue-500 rounded-t-md">
            <div className="w-[10%] border-r border-black p-2">Uuid</div>
            <div className="w-[30%] border-r border-black p-2">Folder Name</div>
            <div className="w-[20%] border-r border-black p-2">Created By</div>
            <div className="w-[30%] border-r border-black p-2">
              Created Date
            </div>
            <div className="w-[5%] p-2">Freeze</div>
          </div>
          {folderData.map((ele) => (
            <div
              className="flex flex-wrap text-sm text-black bg-gray-300 border-b border-black"
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
              <div className="w-[10%] p-2 flex flex-wrap justify-center">
                {ele.freeze == 0 ? (
                  <FontAwesomeIcon
                    className="shadow-xl text-sm text-white p-1 rounded-full border border-blue-500  bg-blue-400"
                    icon={faLockOpen}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="shadow-xl text-sm text-white p-1 rounded-full border border-blue-500  bg-blue-400"
                    icon={faLock}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
