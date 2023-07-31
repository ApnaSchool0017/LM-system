import React from "react";
import { ImHome, ImStatsDots } from "react-icons/im";
import { FaRegUser,FaTasks } from "react-icons/fa";
import { BiLogOut ,BiChat,BiHome} from "react-icons/bi";
import { Link, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar() {
  const location = useLocation();



  return (
      <div className="bg-yellow-400  h-screen">
        {/* main heading */}
        <div className="pt-8 pb-4 flex items-center justify-center border-b-[1px] border-black mb-4">
          <h1 className="text-black font-bold text-[28px]">
            A<span className="text-white text-4xl">d</span>min
          </h1>
        </div>
        <div>
          <Link
            to="/Dashboard"
            className={`flex py-4 px-6 items-center ${
              location.pathname === "/Dashboard" ? "bg-black" : ""
            }`}
          >
            <BiHome
              size={20}
              className={`mr-4 ${
                location.pathname === "/Dashboard" ? "text-yellow-400" : ""
              }`}
            />
            <p
              className={`font-semibold text-lg ${
                location.pathname === "/Dashboard" ? "text-yellow-400" : ""
              }`}
            >
              Dashboard
            </p>
          </Link>

          <Link
            to="users"
            className={`flex py-4 px-6 items-center ${
              location.pathname === "/Dashboard/users" ? "bg-black" : ""
            }`}
          >
            <FaRegUser
              size={20}
              className={`mr-4 ${
                location.pathname === "/Dashboard/users" ? "text-yellow-400" : ""
              }`}
            />
            <p
              className={`font-semibold text-lg ${
                location.pathname === "/Dashboard/users" ? "text-yellow-400" : ""
              }`}
            >
              Manage User
            </p>
          </Link>

          <Link
            to="task"
            className={`flex py-4 px-6 items-center ${
              location.pathname === "/Dashboard/task" ? "bg-black" : ""
            }`}
          >
            <FaTasks
              size={20}
              className={`mr-4 ${
                location.pathname === "/Dashboard/task" ? "text-yellow-400" : ""
              }`}
            />
            <p
              className={`font-semibold text-lg ${
                location.pathname === "/Dashboard/task" ? "text-yellow-400" : ""
              }`}
            >
              Manage Task
            </p>
          </Link>


          <Link
            to="chat"
            className={`flex py-4 px-6 items-center ${
              location.pathname === "/Dashboard/chat" ? "bg-black" : ""
            }`}
          >
            <BiChat
              size={20}
              className={`mr-4 ${
                location.pathname === "/Dashboard/chat" ? "text-yellow-400" : ""
              }`}
            />
            <p
              className={`font-semibold text-lg ${
                location.pathname === "/Dashboard/chat" ? "text-yellow-400" : ""
              }`}
            >
              Chat
            </p>
          </Link>
         
        </div>
      </div>
     
  );
}

export default Sidebar;
