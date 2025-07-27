import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const Folder = ({
  folderData,
  parentId,
  setParentId,
  setPath,
  path,
  getFolder,
  itemsPerPage
}) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(folderData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pagedData = folderData.slice(startIndex, endIndex);

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
      await getFolder();
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

  useEffect(() => {}, [parentId, folderData, itemsPerPage]);

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
      id="folderData"
    >
      {/* Header Row */}
      <div className="flex text-white text-sm font-medium bg-gradient-to-r from-indigo-500 to-blue-500 rounded-t-xl">
        <div className="w-[10%] px-3 py-2 border-r border-blue-300">UUID</div>
        <div className="w-[30%] px-3 py-2 border-r border-blue-300">
          Folder Name
        </div>
        <div className="w-[20%] px-3 py-2 border-r border-blue-300">
          Created By
        </div>
        <div className="w-[30%] px-3 py-2 border-r border-blue-300">
          Created Date
        </div>
        <div className="w-[10%] px-3 py-2 text-center">Freeze</div>
      </div>

      {/* Content Rows */}
      <div className="max-h-[400px] overflow-y-auto">
        {pagedData.length !== 0 ? (
          pagedData.map((ele, index) => (
            <div
              key={index}
              className={`flex items-center text-sm transition-colors ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 border-b border-gray-200`}
            >
              <div className="w-[10%] px-3 py-2 truncate border-r border-gray-100">
                {ele.uuid}
              </div>
              <div
                className="w-[30%] px-3 py-2 truncate border-r border-gray-100 text-blue-700 font-medium hover:underline cursor-pointer"
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
              <div className="w-[10%] flex justify-center items-center px-3 py-2">
                <FontAwesomeIcon
                  icon={ele.freeze === 0 ? faLockOpen : faLock}
                  onClick={() => freezeFolder(ele.uuid)}
                  className={`cursor-pointer text-lg transition-transform hover:scale-110 ${
                    ele.freeze === 0 ? "text-green-500" : "text-red-500"
                  }`}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-10 font-medium">
            No Folders Found
          </div>
        )}
      </div>

      {/* Footer with Pagination */}
      <div className="flex justify-between items-center px-4 py-2 text-sm border-t border-gray-200 bg-white rounded-b-xl">
        <span>
          Showing {startIndex + 1} - {Math.min(endIndex, folderData.length)} of{" "}
          {folderData.length} items
        </span>
        {folderData.length > itemsPerPage && (
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
