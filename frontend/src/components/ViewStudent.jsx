import React from 'react';

const ViewStudentModal = ({ isOpen, onClose, student }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="bg-slate-900 text-white py-3 px-6 rounded-t-lg">
          <h2 className="text-3xl font-bold text-center">Student Details</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <img
              src={student.photo}
              alt={`${student.firstName} ${student.lastName}`}
              className="w-24 h-24 object-cover rounded-full shadow-md"
            />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-center">{student.firstName} {student.lastName}</h3>
            </div>
          </div>
          <hr className="my-6" />
          <div className="flex justify-evenly gap-6">
            <div >
            <p className="mb-4"><strong className="font-semibold">Email:</strong><br />{student.email}</p>
              <p className="mb-4"><strong className="font-semibold">Address:</strong><br />{student.address}</p>
              <p className="mb-4"><strong className="font-semibold">Gender:</strong><br />{student.gender}</p>
            </div>
            <div>          
              <p className="mb-4"><strong className="font-semibold">Date of Birth:</strong><br />{new Date(student.dateOfBirth).toLocaleDateString()}</p>
              <p className="mb-4"><strong className="font-semibold">Phone:</strong><br />{student.phone}</p>
              <p className="mb-4"><strong className="font-semibold">Grade:</strong><br />{student.grade}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentModal;
