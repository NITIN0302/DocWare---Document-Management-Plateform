import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faMinus
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import CustomAlert from "../SubComponent/Customealert";

const Access = () => {
  const [metaList, setMetaList] = useState([]);
  const [status, setStatus] = useState();
  const [message, setMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState("Read");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);
  const [id, setId] = useState();
  const [metaName, setMetaName] = useState();
  const [selectedOptions, setSelectedOptions] = useState();
  const [properties, setProperties] = useState([
    { propName: "", type: null, size: "" }
  ]);
  const option = [{ "value": "String", label: "String" },
  { "value": "Int", label: "Integer" },
  { "value": "Date ", label: "Timestamp" }];

  const handleAddProperty = () => {
    setProperties([
      ...properties,
      { propName: "", type: null, size: "" }
    ]);
  };

  const handleRemoveProperty = (idx) => {
    if (properties.length <= 1) return;
    const update = properties.filter((_, index) => (index !== idx));
    setProperties(update);
  }

  const handleChange = (index, field, value) => {
    const updated = [...properties];
    if (field == "type") {
      updated[index][field] = value.value;
    }
    else {
      updated[index][field] = value;
      setProperties(updated);
    }
    console.log(updated);
  };



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

  const createMetaData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8085/AccessService/createMetadata`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          body: JSON.stringify({
            "name": metaName,
            "metaDataProp": properties
          })
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setShowAlert(true);
      setStatus(1);
      setMessage(result.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    getAllMetaData();
  }, []);

  return (
    <>
      {showAlert && (
        <CustomAlert
          status={status}
          message={message}
          onClose={() => setShowAlert(false)}
        />
      )}
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
                onClick={() => { setShow("Read"); getAllUserMapped(id) }}
                className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Filter
              </button>
            </div>
            <div className="w-1/3">
              <button
                onClick={() => { setShow("Create") }}
                className="w-full bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                Create MetaData
              </button>
            </div>
          </div>

          <div className={`${show == 'Create' ? "block" : "hidden"} w-full mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-200 mt-4`}>

            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm font-medium text-gray-700 w-40">
                MetaData Name:
              </label>

              <input
                type="text"
                placeholder="Enter metadata name"
                onBlur={(e) => setMetaName(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />

              <button className="whitespace-nowrap px-4 bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-200"
                onClick={handleAddProperty}>
                Add Property
              </button>
            </div>
            <div className="space-y-4">
              {properties.map((prop, index) => (
                <div key={index} className="flex gap-4">

                  <input
                    type="text"
                    placeholder="Property Name"
                    value={properties[index].propName}
                    onChange={(e) =>
                      handleChange(index, "propName", e.target.value)
                    }
                    className="w-[30%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />

                  <Select
                    className="w-[30%]"
                    options={option}
                    onChange={(val) =>
                      handleChange(index, "type", val)
                    }
                    placeholder="Select Value Type"
                  />

                  <input
                    type="text"
                    placeholder="Size"
                    value={properties[index].size}
                    onChange={(e) =>
                      handleChange(index, "size", e.target.value)
                    }
                    className="w-[30%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />

                  <button className="md:w-[5%] rounded-md bg-red-400 hover:bg-red-500 text-white"><FontAwesomeIcon
                    icon={faMinus}
                    onClick={() => { handleRemoveProperty(index) }}
                    className="cursor-pointer text-lg text-white hover:scale-110 transition-transform"
                  /></button>

                </div>
              ))}

              <div className="flex justify-end mt-6">
                <button
                  onClick={createMetaData}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition duration-200 shadow-sm"
                >
                  Create
                </button>
              </div>
            </div>

          </div>

          <div className={`${show == 'Read' ? "block" : "hidden"} mt-6 bg-white shadow-md rounded-xl overflow-hidden`}>
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
    </>
  );
};

export default Access;
