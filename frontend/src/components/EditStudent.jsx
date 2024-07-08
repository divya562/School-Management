import React, { useState } from 'react';
import axios from 'axios';
import { FaTimesCircle } from 'react-icons/fa';

const EditStudentModal = ({ isOpen, onClose, student, onUpdate }) => {
  const [editedStudent, setEditedStudent] = useState({ ...student });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({ ...editedStudent, [name]: value });
  };

  const handlephotoChange = (e) => {
    const file = e.target.files[0];
    setEditedStudent({ ...editedStudent, photo: file });
  };
console.log(editedStudent);
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('firstName', editedStudent.firstName || '');
    formData.append('lastName', editedStudent.lastName || '');
    formData.append('grade', editedStudent.grade || '');
    formData.append('dateOfBirth', new Date(editedStudent.dateOfBirth).toISOString()); 
    formData.append('gender', editedStudent.gender || '');
    formData.append('email', editedStudent.email || '');
    formData.append('phone', editedStudent.phone || '');
    formData.append('address', editedStudent.address || '');
    
    if (editedStudent.photo) {
      formData.append('photo', editedStudent.photo); 
    }

    const response = await axios.put(
      `http://localhost:5000/api/student/${editedStudent._id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    onUpdate(response.data); 
    onClose(); 
  } catch (error) {
    setError(error.response?.data?.message || 'An error occurred.');
    console.error('Error updating student:', error);
  }
};


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full md:max-w-2xl">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Edit Student</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <FaTimesCircle className="text-2xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={editedStudent.firstName || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={editedStudent.lastName || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                  Grade
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={editedStudent.grade || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="D+">D+</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="flex items-center">
                  <label htmlFor="male" className="mr-2">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="Male"
                      checked={editedStudent.gender === 'Male'}
                      onChange={handleChange}
                      className="mr-1"
                      required
                    />
                    Male
                  </label>
                  <label htmlFor="female" className="mr-2">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                      checked={editedStudent.gender === 'Female'}
                      onChange={handleChange}
                      className="mr-1"
                      required
                    />
                    Female
                  </label>
                  <label htmlFor="other">
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="Other"
                      checked={editedStudent.gender === 'Other'}
                      onChange={handleChange}
                      className="mr-1"
                      required
                    />
                    Other
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  value={editedStudent.dateOfBirth || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={editedStudent.email || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={editedStudent.phone || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={editedStudent.address || ''}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter address"
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept=".jpg, .jpeg, .png"
                  onChange={handlephotoChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-end col-span-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded-md mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default EditStudentModal;
