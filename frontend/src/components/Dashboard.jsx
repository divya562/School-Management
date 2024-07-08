import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ open }) => {
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const studentRes = await axios.get(
          "http://localhost:5000/api/student/allStudents"
        );
        setStudentCount(studentRes.data.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div
      className={`flex flex-row justify-center mt-20 py-8 px-8 gap-40 w-[calc(100%-320px)] ${
        !open ? "w-[calc(100%-80px)] ml-20" : "ml-80"
      } bg-no-repeat bg-cover`}
    >
      <div className="bg-gradient-to-r from-purple-500 p-10 to-purple-300 text-white shadow-md rounded-lg border border-white md:w-[23%] w-80">
        <div className="text-center text-3xl px-4 py-2">{studentCount}</div>
        <div className="text-center text-2xl px-4 py-2">Total Students</div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-300 p-10 text-white shadow-md rounded-lg border border-white md:w-[23%] w-80">
        <div className="text-center text-3xl px-4 py-2">0</div>
        <div className="text-center text-2xl px-4 py-2">Total Activities</div>
      </div>
    </div>
  );
};

export default Dashboard;
