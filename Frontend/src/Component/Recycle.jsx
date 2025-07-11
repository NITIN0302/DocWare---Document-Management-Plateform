// import React, { useState, useEffect } from "react";
// import { Sidebar } from "./Sidebar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashRestore } from "@fortawesome/free-solid-svg-icons";

// const Recycle = () => {
//   const [allDocuments, setAllDocument] = useState([]);

//   const getAllDeletedDocument = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8082/DocumentService/getAllRecycledDocument`,
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
//       setAllDocument(result);
//     } catch (err) {}
//   };

//   const restoreDocument = async (uuid) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8082/DocumentService/recycleDocument/${uuid}`,
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
//       getAllDeletedDocument();
//     } catch (err) {}
//   };

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

//   useEffect(()=>{
//     getAllDeletedDocument();
//   },[]);

//   return (
//     <div className="h-[91%] w-full flex flex-wrap">
//       <div className="w-[12%] md:w-[15%] bg-gray-50 pt-8 m-1 rounded-sm">
//         <Sidebar />
//       </div>
//       <div className="grow pt-8 my-1 bg-white rounded-sm">
//         <div className="flex grow flex-wrap justify-between mx-1 border-b-1 border-gray-400">
//           <h1 className="w-fit text-xl text-black">Recycle Document</h1>
//         </div>
//         <div
//           className="relative grow text-white h-60 border border-gray-400 rounded-md mt-4 mx-1"
//           id="documentData"
//         >
//           <div className="w-full flex flex-wrap absolute top-0 left-0 text-white border-b border-gray-400 bg-blue-500 rounded-t-md">
//             <div className="w-[10%] border-r border-gray-400 p-2">Uuid</div>
//             <div className="w-[30%] border-r border-gray-400 p-2">
//               Document Name
//             </div>
//             <div className="w-[20%] border-r border-gray-400 p-2">
//               Created By
//             </div>
//             <div className="w-[30%] border-r border-gray-400 p-2">
//               Created Date
//             </div>
//             <div className="w-[5%] p-2">Restore</div>
//           </div>
//           <div className="w-full pt-10 overflow-auto h-[calc(100%-2rem)] no-scrollbar">
//             {allDocuments.length != 0 ? (
//               allDocuments.map((ele, index) => (
//                 <div
//                   className="bg-gray-100 hover:bg-gray-200 flex flex-wrap text-sm  text-black  border-b border-gray-400"
//                   id={index}
//                 >
//                   <div className="w-[10%] border-r border-gray-400 items-center p-2">
//                     {ele.uuid}
//                   </div>
//                   <div
//                     className="w-[30%] border-r border-gray-400 items-center cursor-pointer p-2"
//                     onClick={() => handleClick(ele.uuid, ele.name)}
//                   >
//                     {ele.name}
//                   </div>
//                   <div className="w-[20%] border-r border-gray-400 items-center p-2">
//                     {ele.createdBy}
//                   </div>
//                   <div className="w-[30%] border-r border-gray-400 items-center p-2">
//                     {formatDate(ele.createdDate)}
//                   </div>
//                   <div className="w-[10%] items-center flex flex-wrap justify-center p-2">
//                     <FontAwesomeIcon
//                       onClick={() => {
//                         restoreDocument(ele.uuid);
//                       }}
//                       className="shadow-xl text-sm text-green-400 p-1 rounded-md"
//                       icon={faTrashRestore}
//                     />
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="bg-gray-200 text-black w-full items-center flex flex-wrap justify-center">
//                 {" "}
//                 No Document Found
//               </div>
//             )}
//           </div>
//           <div className="h-8 bg-blue-500 absolute bottom-0 left-0 w-full rounded-b-md"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Recycle;

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
    <div className="h-[91%] w-full flex flex-wrap bg-gray-50">
      {/* Sidebar */}
      <div className="w-[12%] md:w-[15%] bg-white pt-8 m-1 rounded-md shadow-sm">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="grow pt-8 my-1 bg-white rounded-md shadow-sm p-4 mx-1">
        <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
          <h1 className="text-xl font-semibold text-gray-800">Recycle Document</h1>
        </div>

        {/* Table */}
        <div className="relative border border-gray-300 rounded-md bg-white shadow overflow-hidden" id="documentData">
          {/* Header */}
          <div className="flex text-white text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500 rounded-t-md">
            <div className="w-[10%] px-3 py-2 border-r border-blue-400">Uuid</div>
            <div className="w-[30%] px-3 py-2 border-r border-blue-400">Document Name</div>
            <div className="w-[20%] px-3 py-2 border-r border-blue-400">Created By</div>
            <div className="w-[30%] px-3 py-2 border-r border-blue-400">Created Date</div>
            <div className="w-[10%] px-3 py-2 text-center">Restore</div>
          </div>

          {/* Body */}
          <div className="max-h-60 overflow-y-auto text-black">
            {allDocuments.length !== 0 ? (
              allDocuments.map((ele, index) => (
                <div
                  key={index}
                  className={`flex text-sm items-center ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors border-b border-gray-200`}
                >
                  <div className="w-[10%] px-3 py-2 truncate border-r border-gray-100">{ele.uuid}</div>
                  <div
                    className="w-[30%] px-3 py-2 truncate border-r border-gray-100 text-blue-600 font-medium hover:underline cursor-pointer"
                    onClick={() => handleClick(ele.uuid, ele.name)}
                  >
                    {ele.name}
                  </div>
                  <div className="w-[20%] px-3 py-2 truncate border-r border-gray-100">{ele.createdBy}</div>
                  <div className="w-[30%] px-3 py-2 truncate border-r border-gray-100">{formatDate(ele.createdDate)}</div>
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

          {/* Footer */}
          <div className="h-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs flex items-center justify-center rounded-b-md">
            Showing {allDocuments.length} item{allDocuments.length !== 1 && "s"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recycle;
