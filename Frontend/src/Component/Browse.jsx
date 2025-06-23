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
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [folderName, setFoldername] = useState("");
  const [docFol, setDocfol] = useState("F");
  const { username } = useCounterContext();
  const options = [
    { value: "ROLE_ADMIN", label: "ROLE_ADMIN" },
    { value: "ROLE_USER", label: "ROLE_USER" },
    { value: "ROLE_MANAGEMENT", label: "ROLE_MANAGEMENT" },
  ];

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
            createdBy: username,
            freeze: 0,
            roles: selectedOptions,
          }),
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
    setModalOpen(false);
    setSelected([]);
  };

  const uploadDocument = async () => {};

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

  return (
    <div className="h-[91%] w-full flex flex-wrap">
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          handleClose()
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
      </Modal>

      <Modal
        isOpen={modal1Open}
        onClose={() => {
          handleClose()
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
          />
          <div className="flex flex-wrap justify-end">
            <button
              className="bg-indigo-500 border mt-2 border-blue-500 px-2 py-1 rounded-md hover:shadow-lg hover:shadow-indigo-500/50 transition duration-500 shadow-none"
              onClick={createFolder}
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
        <div className="flex flex-wrap justify-between border-b-1 border-gray-400">
          <h1 className="w-fit text-xl">Browse Your Folder</h1>
          <div className="w-fit flex flex-wrap justify-around">
            {parentId !== 0 ? (
              <FontAwesomeIcon
                className="cursor-pointer shadow-xl text-sm text-white mr-2 p-1 rounded-full border border-blue-500  bg-blue-400"
                onClick={() => setModalOpen(true)}
                icon={faFolderPlus}
              />
            ) : (
              ""
            )}
            {parentId !== 0 ? (
              <FontAwesomeIcon
                className="shadow-xl text-sm text-white p-1 rounded-full border border-blue-500 cursor-pointer bg-blue-400"
                onClick={() => setModal1Open(true)}
                icon={faUpload}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap justify-end">
          <select
            className="border-2 mr-2 w-40 border-black rounded-md"
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option default value="F">
              Folder
            </option>
            <option value="D">Document</option>
          </select>
          <button
            onClick={() => {
              setDocfol(selectedValue);
            }}
            className="border border-blue-500 bg-blue-500 px-4 rounded-md text-white "
          >
            Go
          </button>
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
  );
};

export default Browse;
