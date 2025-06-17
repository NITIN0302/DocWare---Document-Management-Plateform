import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Document = ({ docData, parentId, setDocData, getDocument }) => {
  const navigate = useNavigate();

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

  const handleClick = (uuid) => {
    localStorage.setItem("DocId", uuid);
    window.open(`${window.location.origin}/viewDocument`, "_blank");
  };

  const deleteDocument = async (documentId) => {
    try {
      const response = await fetch(
        `http://localhost:8082/DocumentService/deleteDocumentById/${documentId}`,
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
      const docData = await getDocument();
    } catch (err) {}
  };

  useEffect(() => {}, [parentId]);

  return (
    <div
      className="relative text-white h-60 border border-gray-400 rounded-md"
      id="documentData"
    >
      <div className="w-full flex flex-wrap absolute top-0 left-0 text-white border-b border-gray-400 bg-blue-500 rounded-t-md">
        <div className="w-[10%] border-r border-gray-400 p-2">Uuid</div>
        <div className="w-[30%] border-r border-gray-400 p-2">
          Document Name
        </div>
        <div className="w-[20%] border-r border-gray-400 p-2">Created By</div>
        <div className="w-[30%] border-r border-gray-400 p-2">Created Date</div>
        <div className="w-[5%] p-2">Delete</div>
      </div>
      <div className="w-full pt-10 overflow-auto h-[calc(100%-2rem)] no-scrollbar">
        {docData.length != 0 ? (
          docData.map((ele, index) => (
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
                    deleteDocument(ele.uuid);
                  }}
                  className="shadow-xl text-xs text-white p-1 rounded-md border border-blue-500  bg-blue-400"
                  icon={faTrash}
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
  );
};

export default Document;
