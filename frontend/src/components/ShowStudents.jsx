import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrashAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import EditStudentModal from './EditStudent';
import ViewStudentModal from './ViewStudent';
import DeleteConfirmationModal from './DeleteConfirmationModal'; t

const ShowStudents = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [studentToDelete, setStudentToDelete] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/allStudents');
        setAllStudents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred.');
        setLoading(false);
      }
    };
    fetchData();
  }, []); 

  const handleView = (studentId) => {
    const student = allStudents.find(student => student._id === studentId);
    setSelectedStudent(student);
    setIsViewing(true);
  };

  const handleEdit = (studentId) => {
    const student = allStudents.find(student => student._id === studentId);
    setSelectedStudent(student);
    setIsEditing(true);
  };

  const handleCloseEditModal = () => {
    setIsEditing(false);
    setSelectedStudent(null);
  };

  const handleCloseViewModal = () => {
    setIsViewing(false);
    setSelectedStudent(null);
  };

  const handleToggleStatus = async (studentId) => {
    try {
      const student = allStudents.find(student => student._id === studentId);
      const updatedStudent = { ...student, isActive: !student.isActive };
      
      setAllStudents(allStudents.map(stu => stu._id === studentId ? updatedStudent : stu));
  
      await axios.put(`http://localhost:5000/api/student/setStatus/${studentId}`, { id: studentId });
    } catch (error) {
      console.error('Failed to toggle status', error);
    }
  };

  const handleDelete = (studentId) => {
    setStudentToDelete(studentId);
    setShowDeleteModal(true); 
  };

  const handleConfirmDelete = async () => {
    try {
      console.log(studentToDelete);
      await axios.delete(`http://localhost:5000/api/student/delete/${studentToDelete}`);
      setAllStudents(allStudents.filter(student => student._id !== studentToDelete));
      setShowDeleteModal(false); 
    } catch (error) {
      console.error('Failed to delete student', error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); 
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">All Students Information</h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-500">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">Address</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">Gender</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">Date Of Birth</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">Phone no</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">Grade</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">Photo</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allStudents.map((student, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap text-center">{student.firstName} {student.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{student.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{student.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{formatDate(student.dateOfBirth)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{student.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{student.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <img src={student.photo} alt="image" className="w-16 h-16 " />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button onClick={() => handleToggleStatus(student._id)}>
                    {student.isActive ? (
                      <FaCheckCircle className="text-green-500 cursor-pointer" />
                    ) : (
                      <FaTimesCircle className="text-red-500 cursor-pointer" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button onClick={() => handleView(student._id)} className="bg-blue-500 text-white hover:bg-blue-700 mx-2 p-2 rounded"><FaEye /></button>
                  <button onClick={() => handleEdit(student._id)} className="bg-green-500 text-white hover:bg-green-700 mx-2 p-2 rounded"><FaEdit /></button>
                  <button onClick={() => handleDelete(student._id)} className="bg-red-500 text-white hover:bg-red-700 mx-2 p-2 rounded"><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditing && selectedStudent && (
        <EditStudentModal
          isOpen={isEditing}
          onClose={handleCloseEditModal}
          student={selectedStudent}
          onUpdate={(updatedStudent) => {
            const updatedStudents = allStudents.map(student =>
              student._id === updatedStudent._id ? updatedStudent : student
            );
            setAllStudents(updatedStudents);
            handleCloseEditModal();
          }}
        />
      )}
      {isViewing && selectedStudent && (
        <ViewStudentModal
          isOpen={isViewing}
          onClose={handleCloseViewModal}
          student={selectedStudent}
        />
      )}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ShowStudents;
