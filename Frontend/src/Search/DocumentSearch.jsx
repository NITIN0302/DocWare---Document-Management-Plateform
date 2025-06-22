import React, { useState, useEffect } from "react";

const DocumentSearch = () => {
  const [DocumentData, setDocumentdata] = useState([]);
  const [docId, setDocid] = useState();
  const [docName, setDocname] = useState("");
  const [searchType, setSearchType] = useState("name");

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
      setDocname("");
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
      setDocid("");
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
            checked={searchType === "name"}
            name="search"
            onClick={() => setSearchType("name")}
          />
          <label className="text-xs">Search By Name</label>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="radio"
            name="search"
            checked={searchType === "id"}
            onClick={() => setSearchType("id")}
          />
          <label className="text-xs">Search By Id</label>
        </div>
      </div>
      <div className="grid grid-col-1 md:grid-cols-1 mt-2">
        <div
          id="searchbyname"
          className={`${
            searchType == "name" ? "" : "hidden"
          } border border-gray-300 rounded-md m-1 bg-white shadow-xl p-4`}
        >
          <h3>Search By Name</h3>
          <div className="flex flex-wrap">
            <input
              onChange={(e) => {
                setDocname(e.target.value);
              }}
              className="md:w-[90%] my-2 border-2 border-blue-400 rounded-sm py-1 bg-gray-100 focus:border-blue-500 px-2"
              placeholder="Enter Document Name"
            />
            <div className="md:w-[10%] flex items-center flex-wrap justify-center">
              <button
                onClick={() => {
                  getDocByName();
                }}
                className="text-xs bg-blue-500 py-2 px-2 rounded-md border border-blue-500 text-white"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div
          id="searchbyid"
          className={`${
            searchType == "id" ? "" : "hidden"
          } border border-gray-300 rounded-md m-1 bg-white shadow-xl p-4`}
        >
          <h3>Search By ID</h3>
          <div className="flex flex-wrap">
            <input
              onChange={(e) => {
                setDocid(e.target.value);
              }}
              className="md:w-[90%] my-2 border-2 border-blue-400 py-1 rounded-md bg-gray-100 focus:border-blue-500 px-2"
              placeholder="Enter Document ID"
            />
            <div className="md:w-[10%] py-1 flex items-center flex-wrap justify-center">
              <button
                onClick={() => {
                  getDocById();
                }}
                className="text-xs bg-blue-500 py-2 px-2 rounded-md border border-blue-500 text-white"
              >
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
        <div className="bg-white h-60 overflow-auto no-scrollbar rounded-b-md border border-gray-200 shadow-xl">
          {DocumentData.map((ele) => (
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
              <div className="w-[40%] p-2">
                {formatDate(ele.createdDate)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentSearch;
