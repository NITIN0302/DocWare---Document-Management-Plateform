import React, { useState, useEffect } from "react";

const DocumentSearch = () => {
  const [DocumentData, setDocumentdata] = useState([]);
  const [docId, setDocid] = useState();
  const [docName, setDocname] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(DocumentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = DocumentData.slice(startIndex, endIndex);

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

  function clear() {
    setDocname("");
    setDocid("");
    setDocumentdata([]);
  }

  const getDocByName = async () => {
    try {
      const response = await fetch(
        `http://localhost:8082/DocumentService/getDocumentByName/${docName}`,
        {
          method: "Get",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setDocumentdata(result);
    } catch (err) {
    } finally {
    }
  };

  const getDocById = async () => {
    try {
      const response = await fetch(
        `http://localhost:8082/DocumentService/getDocumentById/${docId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setDocumentdata(result);
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {}, [docId, docName]);

  return (
    <div className="bg-white p-2 mt-2 rounded-md">
      <div className="grid grid-cols-4 md:grid-cols-8 p-1">
        <div className="flex items-center gap-1">
          <input
            type="radio"
            name="search"
            checked={searchType === "name"}
            onClick={() => {
              setSearchType("name");
              clear();
            }}
            className="accent-indigo-500"
          />
          <label className="text-xs">Search By Name</label>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="radio"
            name="search"
            checked={searchType === "id"}
            onClick={() => {
              setSearchType("id");
              clear();
            }}
            className="accent-indigo-500"
          />
          <label className="text-xs">Search By Id</label>
        </div>
      </div>

      <div className="grid grid-col-1 md:grid-cols-1 mt-2">
        <div
          id="searchbyname"
          className={`${
            searchType == "name" ? "" : "hidden"
          } border border-gray-200 rounded-lg m-1 bg-white shadow-md p-4 transition-all`}
        >
          <h3 className="text-lg font-semibold text-indigo-600 mb-3">
            Search By Name
          </h3>
          <div className="flex flex-wrap gap-2">
            <input
              value={docName}
              onChange={(e) => {
                setDocname(e.target.value);
              }}
              className="md:w-[75%] my-2 border border-indigo-300 rounded-md py-2 px-3 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter Document Name"
            />
            <div className="md:w-[20%] gap-2 flex items-center justify-center">
              <button
                onClick={() => {
                  getDocByName();
                }}
                className="text-sm bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-md text-white border border-indigo-500 transition-all shadow-sm"
              >
                Search
              </button>
              <button
                onClick={() => {
                  clear();
                }}
                className="text-sm bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-md text-white border border-indigo-500 transition-all shadow-sm"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div
          id="searchbyid"
          className={`${
            searchType == "id" ? "" : "hidden"
          } border border-gray-200 rounded-lg m-1 bg-white shadow-md p-4 transition-all`}
        >
          <h3 className="text-lg font-semibold text-indigo-600 mb-3">
            Search By ID
          </h3>
          <div className="flex flex-wrap gap-2">
            <input
              value={docId}
              onChange={(e) => {
                setDocid(e.target.value);
              }}
              className="md:w-[75%] my-2 border border-indigo-300 rounded-md py-2 px-3 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="Enter Document ID"
            />
            <div className="md:w-[20%] gap-2 flex items-center justify-center">
              <button
                onClick={() => {
                  getDocById();
                }}
                className="text-sm bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-md text-white border border-indigo-500 transition-all shadow-sm"
              >
                Search
              </button>
              <button
                onClick={() => {
                  clear();
                }}
                className="text-sm bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded-md text-white border border-indigo-500 transition-all shadow-sm"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          DocumentData.length === 0 ? "hidden" : "block"
        } mx-auto mt-6 max-w-6xl`}
        id="DocumentData"
      >
        <div className="flex border border-gray-300 flex-wrap text-white bg-indigo-600 rounded-t-md shadow-sm font-medium">
          <div className="w-[10%] border-r border-indigo-500 p-2">Uuid</div>
          <div className="w-[30%] border-r border-indigo-500 p-2">
            Document Name
          </div>
          <div className="w-[20%] border-r border-indigo-500 p-2">
            Created By
          </div>
          <div className="w-[40%] p-2">Created Date</div>
        </div>

        <div className="bg-white max-h-96 overflow-y-auto no-scrollbar rounded-b-md border border-gray-200 shadow-md">
          {currentData.map((ele) => (
            <div
              className="flex flex-wrap text-sm text-gray-800 bg-gray-100 border-b border-gray-200 hover:bg-indigo-50 transition-all"
              key={ele.id}
            >
              <div className="w-[10%] border-r border-gray-300 p-2">
                {ele.uuid}
              </div>
              <div
                className="w-[30%] border-r border-gray-300 p-2 cursor-pointer hover:text-indigo-600"
                onClick={() => handleClick(ele.uuid, ele.name)}
              >
                {ele.name}
              </div>
              <div className="w-[20%] border-r border-gray-300 p-2">
                {ele.createdBy}
              </div>
              <div className="w-[40%] p-2">{formatDate(ele.createdDate)}</div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {DocumentData.length > itemsPerPage && (
          <div className="flex justify-between items-center px-4 py-2 text-sm border-t border-gray-200 bg-white rounded-b-xl">
            <span>
              Showing {startIndex + 1} -{" "}
              {Math.min(endIndex, DocumentData.length)} of {DocumentData.length}{" "}
              items
            </span>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentSearch;
