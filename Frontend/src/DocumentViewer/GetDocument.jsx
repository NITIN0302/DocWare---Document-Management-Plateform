import React, { useState, useEffect } from "react";

function GetDocument() {
  const [docId, setDocId] = useState(localStorage.getItem("DocId"));
  const [fileString, setFileString] = useState("");
  const [ext, setExt] = useState("");
  const [status,setStatus] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [message,setMessage] = useState();

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
      const result = await response.json();
      if (!response.ok) {
        if (result.status == 0) {
          setShowAlert(true);
          setMessage(result.message);
          setStatus(0);
        }
      }
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
    <>
      {showAlert && (
        <CustomAlert
          status={status}
          message={message}
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="w-[99%] m-1 h-[90%] border border-black bg-white rounded-md text-black">
        {ext == "pdf" ? (
          <iframe
            title="PDF Viewer"
            src={fileString}
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        ) : ext == "png" || ext == "jpeg" || ext == "jpg" ? (
          <iframe
            title="PDF Viewer"
            src={fileString}
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        ) : ext == "txt" ? (
          <iframe
            title="PDF Viewer"
            src={fileString}
            width="100%"
            height="600px"
            style={{ border: "none" }}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default GetDocument;
