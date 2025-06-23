import React from "react";

const CustomAlert = ({ status, message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start pt-6 backdrop-blur-sm bg-black/30">
      <div className="bg-blue-50 border border-black px-4 pt-8 pb-4 rounded shadow-lg w-[80%] max-w-xs">
        <div className="flex flex-wrap justify-center items-start">
          <p className={`${status === 0 ? "text-red-400" : "text-black"}`}>
            {message}
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="text-sm px-4 py-1 bg-blue-400 rounded-md"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
