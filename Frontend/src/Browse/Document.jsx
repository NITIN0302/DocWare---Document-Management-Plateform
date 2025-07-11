// import React, { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";

// const Document = ({ docData, parentId, setDocData, getDocument }) => {
//   const navigate = useNavigate();

//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     const options = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       timeZoneName: "short",
//     };
//     return date.toLocaleDateString("en-US", options);
//   }

//   const handleClick = (uuid) => {
//     localStorage.setItem("DocId", uuid);
//     window.open(`${window.location.origin}/viewDocument`, "_blank");
//   };

//   const deleteDocument = async (documentId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8082/DocumentService/deleteDocumentById/${documentId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("Token")}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const result = await response.json();
//       const docData = await getDocument();
//     } catch (err) {}
//   };

//   useEffect(() => {}, [parentId]);

//   return (
//     // <div
//     //   className="relative text-white h-60 border border-gray-400 rounded-md"
//     //   id="documentData"
//     // >
//     //   <div className="w-full flex flex-wrap absolute top-0 left-0 text-white border-b border-gray-400 bg-blue-500 rounded-t-md">
//     //     <div className="w-[10%] border-r border-gray-400 p-2">Uuid</div>
//     //     <div className="w-[30%] border-r border-gray-400 p-2">Document Name</div>
//     //     <div className="w-[20%] border-r border-gray-400 p-2">Created By</div>
//     //     <div className="w-[30%] border-r border-gray-400 p-2">Created Date</div>
//     //     <div className="w-[5%] p-2">Delete</div>
//     //   </div>
//     //   <div className="w-full pt-10 overflow-auto h-[calc(100%-2rem)] no-scrollbar">
//     //     {docData.length != 0 ? (
//     //       docData.map((ele, index) => (
//     //         <div
//     //           className="bg-gray-100 hover:bg-gray-200 flex flex-wrap text-sm text-black  border-b border-gray-400"
//     //           id={index}
//     //         >
//     //           <div className="w-[10%] border-r border-gray-400 items-center p-2">
//     //             {ele.uuid}
//     //           </div>
//     //           <div
//     //             className="w-[30%] border-r border-gray-400 items-center cursor-pointer p-2"
//     //             onClick={() => handleClick(ele.uuid, ele.name)}
//     //           >
//     //             {ele.name}
//     //           </div>
//     //           <div className="w-[20%] border-r border-gray-400 items-center p-2">
//     //             {ele.createdBy}
//     //           </div>
//     //           <div className="w-[30%] border-r border-gray-400 items-center p-2">
//     //             {formatDate(ele.createdDate)}
//     //           </div>
//     //           <div className="w-[10%] items-center flex flex-wrap justify-center p-2">
//     //             <FontAwesomeIcon
//     //               onClick={() => {
//     //                 deleteDocument(ele.uuid);
//     //               }}
//     //               className="shadow-xl text-xs text-red-500 p-1 rounded-md"
//     //               icon={faTrash}
//     //             />
//     //           </div>
//     //         </div>
//     //       ))
//     //     ) : (
//     //       <div className="bg-gray-200 text-black w-full items-center flex flex-wrap justify-center">
//     //         {" "}
//     //         No Document Found
//     //       </div>
//     //     )}
//     //   </div>
//     //   <div className="h-8 bg-blue-500 absolute bottom-0 left-0 w-full rounded-b-md"></div>
//     // </div>
//     <div
//       className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
//       id="documentData"
//     >
//       {/* Header */}
//       <div className="flex text-white text-sm font-medium bg-gradient-to-r from-indigo-500 to-blue-500 rounded-t-xl">
//         <div className="w-[10%] px-3 py-2 border-r border-blue-300">UUID</div>
//         <div className="w-[30%] px-3 py-2 border-r border-blue-300">
//           Document Name
//         </div>
//         <div className="w-[20%] px-3 py-2 border-r border-blue-300">
//           Created By
//         </div>
//         <div className="w-[30%] px-3 py-2 border-r border-blue-300">
//           Created Date
//         </div>
//         <div className="w-[10%] px-3 py-2 text-center">Delete</div>
//       </div>

//       {/* Content */}
//       <div className="max-h-[400px] overflow-y-auto">
//         {docData.length !== 0 ? (
//           docData.map((ele, index) => (
//             <div
//               key={index}
//               className={`flex items-center text-sm transition-colors ${
//                 index % 2 === 0 ? "bg-gray-50" : "bg-white"
//               } hover:bg-blue-50 border-b border-gray-200`}
//             >
//               <div className="w-[10%] px-3 py-2 truncate border-r border-gray-100">
//                 {ele.uuid}
//               </div>
//               <div
//                 className="w-[30%] px-3 py-2 truncate border-r border-gray-100 text-blue-700 font-medium hover:underline cursor-pointer"
//                 onClick={() => handleClick(ele.uuid, ele.name)}
//               >
//                 {ele.name}
//               </div>
//               <div className="w-[20%] px-3 py-2 truncate border-r border-gray-100">
//                 {ele.createdBy}
//               </div>
//               <div className="w-[30%] px-3 py-2 truncate border-r border-gray-100">
//                 {formatDate(ele.createdDate)}
//               </div>
//               <div className="w-[10%] flex justify-center items-center px-3 py-2">
//                 <FontAwesomeIcon
//                   onClick={() => deleteDocument(ele.uuid)}
//                   icon={faTrash}
//                   className="cursor-pointer text-red-500 text-md hover:text-red-600 transition-transform hover:scale-110"
//                 />
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-400 py-10 font-medium">
//             No Documents Found
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="h-8 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs text-center flex items-center justify-center rounded-b-xl">
//         Showing {docData.length} item{docData.length !== 1 && "s"}
//       </div>
//     </div>
//   );
// };

// export default Document;

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Document = ({ docData, parentId, setDocData, getDocument }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(docData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pagedData = docData.slice(startIndex, endIndex);

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
      await getDocument();
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  useEffect(() => {}, [parentId]);

  return (
    <div
      className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
      id="documentData"
    >
      {/* Header */}
      <div className="flex text-white text-sm font-medium bg-gradient-to-r from-indigo-500 to-blue-500 rounded-t-xl">
        <div className="w-[10%] px-3 py-2 border-r border-blue-300">UUID</div>
        <div className="w-[30%] px-3 py-2 border-r border-blue-300">
          Document Name
        </div>
        <div className="w-[20%] px-3 py-2 border-r border-blue-300">
          Created By
        </div>
        <div className="w-[30%] px-3 py-2 border-r border-blue-300">
          Created Date
        </div>
        <div className="w-[10%] px-3 py-2 text-center">Delete</div>
      </div>

      {/* Content */}
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
                  onClick={() => deleteDocument(ele.uuid)}
                  icon={faTrash}
                  className="cursor-pointer text-red-500 text-md hover:text-red-600 transition-transform hover:scale-110"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-10 font-medium">
            No Documents Found
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {docData.length > itemsPerPage && (
        <div className="flex justify-between items-center px-4 py-2 text-sm border-t border-gray-200 bg-white rounded-b-xl">
          <span>
            Showing {startIndex + 1} - {Math.min(endIndex, docData.length)} of{" "}
            {docData.length} items
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
  );
};

export default Document;
