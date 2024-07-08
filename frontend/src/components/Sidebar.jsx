import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { LiaSignOutAltSolid } from "react-icons/lia";
// import { Link} from "react-router-dom";
import { MdLibraryAdd } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
 

  const toggleSidebar = () => {
    setOpen(!open);
  };


  return (
    <div
      className={`sidebar bg-cover bg-slate-900 fixed left-0 top-0 ${
        open ? "w-80" : "w-24"
      } duration-0 h-full p-1`}
    >
      <div
        className={`rounded-full flex bg-opacity-60 justify-center items-center  mx-8 my-8 bg-white text-blue-800 font-bold text-2xl sm:flex-col sm:w-10 sm:mx-auto md:w-1/2 lg:flex-row lg:justify-start lg:w-60 ${
          !open ? "lg:w-20 md:p-3" : "p-4"
        }`}
      >
        <button onClick={toggleSidebar}>
          <TiThMenu className="inline-block w-8 h-8 mr-6 " />
        </button>
        <span className={`sm:text-xl lg:text-2xl ${!open && "hidden"}`}>
          Student App
        </span>
      </div>

      <div className="mt-20">
        <hr />
        <ul className="mt-4  text-white font-2xl">
          <li className="mb-2 ml-8 rounded p-2   ">
            <LuLayoutDashboard className="inline-block w-8 h-8 mr-6 text-orange-400" />
                <Link to="/dashboard" className={!open && "hidden"}>
                Dashboard
                </Link>
          </li>
          <hr />
          <div className="rounded mx-6 hover:shadow hover:bg-white  hover:text-black">
            <li className="my-4   py-1 px-6">
              <MdLibraryAdd className="inline-block w-8 h-8 mr-6  " />
              <Link
                to="/add-student"
                className={!open && "hidden"}
              >
                Add Student
              </Link>
            </li>
          </div>
          <hr />
          <div className="rounded mx-6 hover:shadow hover:bg-white  hover:text-black">
            <li className="my-4  rounded hover:shadow hover:bg-white  hover:text-black py-1 px-6">
              <FaThList className="inline-block w-8 h-8 mr-6 " />
              
              <Link
                to="/show-students"
                className={!open && "hidden"}
              >
                Show Students
              </Link>
            </li>
          </div>
          <hr />
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
