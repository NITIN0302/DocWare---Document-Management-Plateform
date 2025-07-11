import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faFolderPlus,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../SubComponent/Modal";
import useCounterContext from "../States/userContext";
import Folder from "../Browse/Folder";
import Document from "../Browse/Document";

const Browse = () => {
  const [path, setPath] = useState([{ id: 0, name: "root" }]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [folderData, setFolderData] = useState([]);
  const [docData, setDocData] = useState([]);
  const [parentId, setParentId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [folderName, setFoldername] = useState("");
  const [docName, setDocName] = useState();
  const [extension, setExtension] = useState();
  const [fileString, setFileString] = useState();
  const [data, setData] = useState("F");
  const [docFol, setDocfol] = useState("F");
  const options = [
    { value: "ROLE_ADMIN", label: "ROLE_ADMIN" },
    { value: "ROLE_USER", label: "ROLE_USER" },
    { value: "ROLE_MANAGEMENT", label: "ROLE_MANAGEMENT" },
  ];

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const getDocument = async () => {
    try {
      const response = await fetch(
        `http://localhost:8082/DocumentService/getDocument/${parentId}`,
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
      setDocData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFolder = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/FolderService/getFolder/${parentId}`,
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
      setFolderData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createFolder = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/FolderService/createFolder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          body: JSON.stringify({
            name: folderName,
            parentId: parentId,
            createdBy: localStorage.getItem("username"),
            freeze: 0,
            roles: selectedOptions.map((role) => role.value),
          }),
        }
      );
      getFolder();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    setModalOpen(false);
    setSelectedOptions([]);
  };

  const uploadDocument = async () => {
    try {
      const response = await fetch(
        `http://localhost:8082/DocumentService/uploadDocument`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          body: JSON.stringify({
            name: docName,
            parentId: parentId,
            createdBy: localStorage.getItem("username"),
            ext: extension,
            fileString: fileString,
            roles: selectedOptions.map((role) => role.value),
          }),
        }
      );
      getDocument();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    setModal1Open(false);
    setSelectedOptions([]);
  };

  useEffect(() => {
    getFolder();
    getDocument();
  }, [parentId]);

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
    setDocfol("F");
  };

  const handleClose = () => {
    setModalOpen(false);
    setModal1Open(false);
    setSelectedOptions([]);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64String = await fileToBase64(file);
        const fullName = file.name;
        const lastDotIndex = fullName.lastIndexOf(".");
        const nameWithoutExtension = fullName.substring(0, lastDotIndex);
        const extension = fullName.substring(lastDotIndex + 1);
        setFileString(base64String);
        setDocName(nameWithoutExtension);
        setExtension(extension);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  return (
    <div className="h-[91%] w-full flex flex-wrap">
      {/* <Modal
        isOpen={modalOpen}
        onClose={() => {
          handleClose();
        }}
        title="Create Folder"
      >
        <div className="">
          <label className="text-black mb-2">Folder Access : </label>
          <Select
            className="w-[90%] rounded-sm border border-blue-400 text-black bg-white"
            isMulti
            options={options}
            value={selectedOptions}
            onChange={setSelectedOptions}
            placeholder="Select Role"
          />
          <label className="text-black mb-2">Folder Name : </label>
          <input
            className="w-[90%] px-1 outline-indigo-500 rounded-sm border border-blue-400 text-black bg-white"
            onChange={(e) => {
              setFoldername(e.target.value);
            }}
            placeholder="Enter Folder Name"
          />
          <div className="flex flex-wrap justify-end">
            <button
              className="bg-indigo-500 border mt-2 border-blue-500 px-2 py-1 rounded-md hover:shadow-lg hover:shadow-indigo-500/50 transition duration-500 shadow-none"
              onClick={createFolder}
            >
              Create
            </button>
          </div>
        </div>
      </Modal> */}

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          handleClose();
        }}
        title="Create Folder"
      >
        <div className="space-y-4 px-2 py-1">
          {/* Folder Access */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Folder Access :
            </label>
            <Select
              className="w-[90%] border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-black text-sm"
              isMulti
              options={options}
              value={selectedOptions}
              onChange={setSelectedOptions}
              placeholder="Select Role"
            />
          </div>

          {/* Folder Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Folder Name :
            </label>
            <input
              className="w-[90%] px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-black bg-white"
              onChange={(e) => {
                setFoldername(e.target.value);
              }}
              placeholder="Enter Folder Name"
            />
          </div>

          {/* Create Button */}
          <div className="flex justify-end pt-2">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition duration-300"
              onClick={createFolder}
            >
              Create
            </button>
          </div>
        </div>
      </Modal>

      {/* <Modal
        isOpen={modal1Open}
        onClose={() => {
          handleClose();
        }}
        title="Upload Document"
      >
        <div className="">
          <label className="text-black mb-2">Document Access : </label>
          <Select
            className="w-[90%] rounded-sm border border-blue-400 text-black bg-white"
            isMulti
            options={options}
            value={selectedOptions}
            onChange={setSelectedOptions}
            placeholder="Select Role"
          />
          <label className="text-black mb-2">Choose Your Document : </label>
          <input
            className="w-[90%] py-1 px-2 outline-indigo-500 rounded-sm border border-blue-400 text-black bg-white"
            type="file"
            onChange={handleFileChange}
          />
          <div className="flex flex-wrap justify-end">
            <button
              className="bg-indigo-500 border mt-2 border-blue-500 px-2 py-1 rounded-md hover:shadow-lg hover:shadow-indigo-500/50 transition duration-500 shadow-none"
              onClick={uploadDocument}
            >
              Upload
            </button>
          </div>
        </div>
      </Modal> */}

      <Modal
        isOpen={modal1Open}
        onClose={() => {
          handleClose();
        }}
        title="Upload Document"
      >
        <div className="space-y-4 px-2 py-1">
          {/* Document Access */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Document Access :
            </label>
            <Select
              className="w-[90%] border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-black text-sm"
              isMulti
              options={options}
              value={selectedOptions}
              onChange={setSelectedOptions}
              placeholder="Select Role"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Choose Your Document :
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-[90%] file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 text-sm border border-gray-300 rounded-md shadow-sm bg-white text-black"
            />
          </div>

          {/* Upload Button */}
          <div className="flex justify-end pt-2">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-md shadow-md transition duration-300"
              onClick={uploadDocument}
            >
              Upload
            </button>
          </div>
        </div>
      </Modal>

      <div className="w-[12%] md:w-[15%] bg-gray-50 pt-8 m-1 rounded-sm">
        <Sidebar />
      </div>
      <div className="bg-white text-black my-1 rounded-sm p-4 grow">
        <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
          <h1 className="text-2xl font-semibold text-indigo-600 tracking-wide">
            📂 Browse Your Folder
          </h1>
        </div>
        <div className="bg-gray-200 p-2 rounded-md mt-1">
          <div className=" bg-white rounded-md flex flex-wrap justify-between ">
            <div className="flex flex-wrap justify-start gap-2 p-2 rounded-lg shadow-inner">
              <div
                onClick={() => setDocfol("F")}
                className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <p
                  className={`${
                    docFol === "F"
                      ? "bg-indigo-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                  } text-sm px-5 py-1 rounded-full font-medium transition-colors duration-300`}
                >
                  📁 Folder
                </p>
              </div>
              <div
                onClick={() => setDocfol("D")}
                className="flex items-center cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <p
                  className={`${
                    docFol === "D"
                      ? "bg-indigo-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                  } text-sm px-5 py-1 rounded-full font-medium transition-colors duration-300`}
                >
                  📄 Document
                </p>
              </div>
            </div>

            {/* <div className="flex flex-wrap">
              <div className="p-2 flex items-center">
                <select className="text-xs border border-black rounded-sm">
                  <option default value="5">
                    5
                  </option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>
              <div className="w-fit flex flex-wrap justify-around p-2">
                {parentId !== 0 ? (
                  <FontAwesomeIcon
                    className="cursor-pointer shadow-xl text-md text-green-400 mr-2 p-1"
                    onClick={() => setModalOpen(true)}
                    icon={faFolderPlus}
                  />
                ) : (
                  ""
                )}
                {parentId !== 0 ? (
                  <FontAwesomeIcon
                    className="shadow-xl text-sm text-red-400 p-1 cursor-pointer"
                    onClick={() => setModal1Open(true)}
                    icon={faUpload}
                  />
                ) : (
                  ""
                )}
              </div>
            </div> */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-gray-50 rounded-md shadow-sm">
              {/* Dropdown Selector */}
              <div className="flex items-center">
                <label className="mr-2 text-sm text-gray-700 font-medium">
                  Items per page:
                </label>
                <select className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                  <option default value="5">
                    5
                  </option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>

              {/* Action Icons */}
              {parentId !== 0 && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="rounded-full  transition"
                    title="Create Folder"
                  >
                    <FontAwesomeIcon
                      icon={faFolderPlus}
                      className="text-green-600 text-lg"
                    />
                  </button>
                  <button
                    onClick={() => setModal1Open(true)}
                    className="rounded-full transition"
                    title="Upload Document"
                  >
                    <FontAwesomeIcon
                      icon={faUpload}
                      className="text-red-500 text-lg"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-fit px-2 bg-white rounded-t-md mt-1">
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
          </div>
          <div className="bg-white p-1 rounded-b-md rounded-tr-md">
            {docFol == "F" ? (
              <Folder
                folderData={folderData}
                parentId={parentId}
                setParentId={setParentId}
                setPath={setPath}
                path={path}
                getFolder={getFolder}
              />
            ) : (
              <Document
                docData={docData}
                parentId={parentId}
                setDocData={setDocData}
                getDocument={getDocument}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
