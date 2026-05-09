import React, { useState, useEffect } from "react";

const AddAccessRights = ({ id }) => {
    useEffect(() => {
        getAllUser();
        
    }, [id]);
    const [alluserList, setAllUserList] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [formData, setFormData] = useState({
        userName: "",
        uploadRights: "",
        downloadRights: "",
        readRights: "",
        deleteRights: "",
        metadataId: id
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

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
        setFormData({
            ...formData,
            metadataId: id
        });
        try {
            const response = await fetch(
                `http://localhost:8085/AccessService/accessRights`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("Token")}`,
                    },
                    body: JSON.stringify(formData)
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
            <div id="add-rights" className="flex justify-center text-white p-2 border-gray-300 items-center">
                {/* <div><button className="rounded-md border-red-500" onClick={() => setAccessRights('hidden')}>x</button></div> */}
                <div className="w-[18%] px-3 py-2 truncate border-r border-gray-100 font-medium text-gray-800">
                    <select id="userName" className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm 
                          bg-gray-100 text-gray-500  focus:outline-none"
                          value={formData.userName}
                          onChange={handleChange}
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
                        value={formData.uploadRights}
                        onChange={handleChange}
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
                        value={formData.downloadRights}
                        onChange={handleChange}         
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
                        value={formData.readRights}
                        onChange={handleChange}
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
                        value={formData.deleteRights}
                        onChange={handleChange}
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