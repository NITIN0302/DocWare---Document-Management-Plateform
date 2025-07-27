import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const CustomAlert = ({ status, message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 backdrop-blur-sm bg-black/30">
      <div className="bg-white/80 backdrop-blur-xl border border-gray-300 rounded-xl shadow-2xl px-6 py-6 w-[90%] max-w-sm animate-[slide-from-top_0.4s_ease-out]">
        <div className="flex items-center gap-3 mb-4">
          <FontAwesomeIcon
            icon={status === 0 ? faCircleExclamation : faCircleCheck}
            className={`text-xl ${
              status === 0 ? "text-red-500" : "text-green-500"
            }`}
          />
          <p className="text-gray-800 text-sm font-medium">{message}</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
