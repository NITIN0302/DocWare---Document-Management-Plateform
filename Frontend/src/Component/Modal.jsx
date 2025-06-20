// import React from "react";

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-12">
//       <div className="bg-gray-300 rounded-sm border border-black w-full max-w-md shadow-lg relative">
//         <div className="flex flex-wrap bg-blue-400 rounded-t-sm items-center mb-2">
//           <h2 className="pl-2 w-[92.83%] py-2 h-10 text-xl bg-blue-400 text-black font-semibold rounded-t-sm">
//             {title}
//           </h2>
//           <button
//             onClick={onClose}
//             className="bg-red-500 bold w-6 h-6 rounded-md text-white hover:text-black"
//           >
//             &times;
//           </button>
//         </div>
//         <div className="m-2">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-12">
      <div className="bg-gray-100 rounded-lg border border-black w-full max-w-md shadow-2xl relative">
        <div className="flex flex-wrap bg-blue-400 rounded-t-lg items-center mb-2">
          <h2 className="pl-2 w-[92.83%] py-2 h-10 text-xl bg-blue-400 text-black font-semibold rounded-t-lg">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="bg-red-500 font-bold w-6 h-6 rounded-md text-white hover:text-black"
          >
            &times;
          </button>
        </div>
        <div className="m-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
