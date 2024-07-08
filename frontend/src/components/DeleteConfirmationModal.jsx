import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel(); 
    }
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this student?</p>
        <div className="flex justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white hover:bg-red-700 mx-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Confirm Delete"
          >
            <FaTrashAlt className="mr-2" /> Confirm Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white hover:bg-gray-700 mx-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
