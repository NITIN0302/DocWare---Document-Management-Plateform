import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave
} from "@fortawesome/free-solid-svg-icons";

const Access = () => {
  const [metaList, setMetaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);
  const [id, setId] = useState();

  const getAllMetaData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8085/AccessService/getAllMetaData`,
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
      setMetaList(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllUserMapped = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8085/AccessService/getMetaMapUser/${id}`,
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
      setUserList([...result]);
      console.log(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const enableModify = (id) => {
    console.log(id);
    const rightsDiv = document.getElementById(id);
    const selects = rightsDiv.querySelectorAll("select");
    selects.forEach((select) => {
      select.disabled = false;
      select.classList.remove("bg-gray-100", "text-gray-500", "cursor-not-allowed");
      select.classList.add("bg-white", "text-gray-800", "cursor-pointer");
    });
  }

  const updateRights = (e, userId, metaId, rightType) => {

  }


  useEffect(() => {
    getAllMetaData();
  }, []);

  return (
    <div className="h-[91%] w-full flex flex-wrap">
      <div className="w-[12%] md:w-[15%] bg-gray-50 pt-8 m-1 rounded-sm">
        <Sidebar />
      </div>
      <div className="text-black bg-white my-1 rounded-sm p-4 grow">
        <div className="flex justify-between items-center mb-1 border-b border-indigo-200 pb-2">
          <h1 className="text-2xl font-semibold text-indigo-600 tracking-wide">
            MetaData Rights
          </h1>
        </div>

        <div className="flex items-end gap-4 bg-white p-4 rounded-xl shadow-md w-full max-w-2xl">

          {/*             <div class="flex flex-col w-1/3"> */}
          {/*                 <label class="text-xs font-medium text-gray-600 mb-1">User</label> */}
          {/*                 <select id="userList" */}
          {/*                     class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"> */}
          {/*                     <option>Select User</option> */}
          {/*                 </select> */}
          {/*             </div> */}

          <div className="flex flex-col w-1/3">
            <label className="text-xs font-medium text-gray-600 mb-1">
              MetaData
            </label>

            <select
              id="metaList"
              onChange={(e) => setId(e.target.value)}
              defaultValue=""
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select</option>

              {metaList.map((ele, index) => (
                <option key={index} value={ele.id}>
                  {ele.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/3">
            <button
              onClick={() => getAllUserMapped(id)}
              className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Filter
            </button>
          </div>
        </div>

        <div className="mt-6 bg-white shadow-md rounded-xl overflow-hidden">
          <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">

            <div className="flex text-white text-sm font-medium bg-gradient-to-r from-indigo-500 to-blue-500 rounded-t-xl">
              <div className="w-[20%] px-3 py-2 border-r border-blue-300">User</div>
              <div className="w-[15%] px-3 py-2 border-r border-blue-300">Upload</div>
              <div className="w-[15%] px-3 py-2 border-r border-blue-300">Download</div>
              <div className="w-[15%] px-3 py-2 border-r border-blue-300">View</div>
              <div className="w-[15%] px-3 py-2 border-r border-blue-300">Delete</div>
              <div className="w-[20%] px-3 py-2 text-center">Modify</div>
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {userList.length !== 0 ? (
                userList.map((ele, index) => (
                  <div
                    id={`rights-${ele.userId}`}
                    key={ele.userId}
                    className={`flex items-center text-sm transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50 border-b border-gray-200`}
                  >
                    <div className="w-[20%] px-3 py-2 truncate border-r border-gray-100 font-medium text-gray-800">
                      {ele.userId}
                    </div>

                    <div className="w-[15%] px-3 py-2 border-r border-gray-100">
                      <select
                        disabled
                        defaultValue={ele.uploadRights}
                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm 
                        bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>

                    <div className="w-[15%] px-3 py-2 border-r border-gray-100">
                      <select
                        disabled
                        defaultValue={ele.downloadRights}
                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm 
              bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>

                    <div className="w-[15%] px-3 py-2 border-r border-gray-100">
                      <select
                        disabled
                        defaultValue={ele.readRights}
                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm 
              bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>

                    <div className="w-[15%] px-3 py-2 border-r border-gray-100">
                      <select
                        disabled
                        defaultValue={ele.deleteRights}
                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm 
              bg-gray-100 text-gray-500 cursor-not-allowed focus:outline-none"
                      >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                    </div>

                    <div className="w-[20%] gap-4 flex justify-center items-center px-3 py-2">
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => { enableModify(`rights-${ele.userId}`) }}
                        className="cursor-pointer text-lg text-indigo-500 hover:scale-110 transition-transform"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-10 font-medium">
                  No Users Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Access;
