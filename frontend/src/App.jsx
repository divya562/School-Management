import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import ShowStudents from "./components/ShowStudents";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <div className="ml-80 bg-slate-200 pt-40 min-h-screen pb-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/show-students" element={<ShowStudents />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
