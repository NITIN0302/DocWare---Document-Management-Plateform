import React from "react";

const CustomAlert = ({ status, message, code, onClose }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded shadow-lg z-50 w-[90%] max-w-xl">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-bold">Status: {status}</p>
          <p>{message}</p>
          <p className="text-sm text-gray-600">Code: {code}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-xl font-bold text-red-700 hover:text-red-900">
          &times;
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;