import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
