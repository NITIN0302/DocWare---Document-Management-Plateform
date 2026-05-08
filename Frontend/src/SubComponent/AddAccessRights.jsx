import React, { useState, useEffect } from "react";

const AddAccessRights = ({ id }) => {
    useEffect(() => {
        getAllUser();
    }, []);
    const [alluserList, setAllUserList] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [reqBody, setReqBody] = useState();
    const getAllUser = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/UserService/getUser`,
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
            setAllUserList(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const addAccessRights = async () => {
        console.log(reqBody);
        try {
            const response = await fetch(
                `http://localhost:8085/AccessService/accessRights`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                    body: JSON.stringify({
                        "userName": document.querySelector('#user').value,
                        "uploadRights": document.querySelector('#uploadRights').value,
                        "downloadRights": document.querySelector('#downloadRights').value,
                        "readRights": document.querySelector('#readRights').value,
                        "deleteRights": document.querySelector('#deleteRights').value,
                        "metaData": {
                            "id": id
                        }
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

    return (
        <>
            <div id="add-rights" className="flex justify-center text-white p-2 items-center">
                <div className="w-[18%] px-3 py-2 truncate border-r border-gray-100 font-medium text-gray-800">
                    <select id="user" className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm 
                          bg-gray-100 text-gray-500  focus:outline-none"
                    >
                        {alluserList.map((ele, index) => (
                            <option key={index} value={ele}>
                                {ele}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-[18%] px-3 py-2 border-r border-gray-100">
                    <select id="uploadRights" className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm 
                bg-gray-100 text-gray-500 focus:outline-none"
                    >
                        <option>Upload Rights</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div className="w-[18%] px-3 py-2 border-r border-gray-100">
                    <select
                        id="downloadRights"
                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm 
                          bg-gray-100 text-gray-500  focus:outline-none"
                    >
                        <option>Download Rights</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div className="w-[18%] px-3 py-2 border-r border-gray-100">
                    <select
                        id="readRights"
                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm 
                          bg-gray-100 text-gray-500  focus:outline-none"
                    ><option>Read Rights</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div className="w-[18%] px-3 py-2 border-r border-gray-100">
                    <select
                        id="deleteRights"
                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm 
                          bg-gray-100 text-gray-500 focus:outline-none"
                    >
                        <option>Delete Rights</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div className="w-[10%] flex justify-end text-white px-3 py-2 text-sm" >
                    <button className="bg-blue-500 px-3 py-1 rounded-md"
                        onClick={addAccessRights}>Add</button>
                </div>
            </div>
        </>
    );

};

export default AddAccessRights