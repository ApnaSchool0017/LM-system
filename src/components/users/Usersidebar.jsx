import React from "react";
import { BiChat, BiHome } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

function Usersidebar() {
  const location = useLocation();

  return (
    <div className="bg-yellow-400  h-screen">
      {/* main heading */}
      <div className="pt-8 pb-4 flex items-center justify-center border-b-[1px] border-black mb-4">
        <h1 className="text-black font-bold text-[28px]">
          U<span className="text-white text-5xl">s</span>er
        </h1>
      </div>
      <div>
        <Link
          to="/userdashboard"
          className={`flex py-4 px-6 items-center ${
            location.pathname === "/userdashboard" ? "bg-black" : ""
          }`}
        >
          <BiHome
            size={20}
            className={`mr-4 ${
              location.pathname === "/userdashboard" ? "text-yellow-400" : ""
            }`}
          />
          <p
            className={`font-semibold text-lg ${
              location.pathname === "/userdashboard" ? "text-yellow-400" : ""
            }`}
          >
            Dashboard
          </p>
        </Link>

        <Link
          to="userchat"
          className={`flex py-4 px-6 items-center ${
            location.pathname === "/userdashboard/userchat" ? "bg-black" : ""
          }`}
        >
          <BiChat
            size={20}
            className={`mr-4 ${
              location.pathname === "/userdashboard/userchat"
                ? "text-yellow-400"
                : ""
            }`}
          />
          <p
            className={`font-semibold text-lg ${
              location.pathname === "/userdashboard/userchat"
                ? "text-yellow-400"
                : ""
            }`}
          >
            Chat
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Usersidebar;
