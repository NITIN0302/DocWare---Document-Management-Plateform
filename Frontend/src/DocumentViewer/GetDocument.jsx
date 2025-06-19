import React, { useState, useEffect } from "react";

function GetDocument() {
  const [docId, setDocId] = useState(localStorage.getItem("DocId"));
  const [fileString, setFileString] = useState("");
  const [ext, setExt] = useState("");

  const getDocument = async () => {
    try {
      const response = await fetch(
        `http://localhost:8082/DocumentService/getDocumentContent/${docId}`,
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
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
    }
  };

  const getDocumentContent = async () => {
    const result = await getDocument();
    setExt(result.ext);
    setFileString(result.fileString);
  };

  useEffect(() => {
    getDocumentContent();
  }, []);

  return (
    <div className="w-[99%] m-1 h-[90%] border border-black bg-white rounded-md text-black">
      
    </div>
  );
}

export default GetDocument;
